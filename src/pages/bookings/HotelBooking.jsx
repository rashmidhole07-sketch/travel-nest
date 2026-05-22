import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWikipediaSummary, searchAndFetchSummary } from '../../utils/wikipediaApi'
import { placeholderImage } from '../../utils/placeholderImage'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function HotelBooking() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })
  const [searchErrors, setSearchErrors] = useState({})
  const [searchTouched, setSearchTouched] = useState({})

  const [hotels, setHotels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    async function loadHotels() {
      try {
        const response = await fetch('/api/hotels.json')
        if (!response.ok) throw new Error('Failed to load hotels')
        const data = await response.json()

        const enriched = await Promise.all(
          data.map(async (hotel) => {
            try {
              // Try a search-first approach for hotels (more forgiving than exact title)
              let wiki = null
              try {
                wiki = await searchAndFetchSummary(hotel.name)
              } catch {
                // fallback to exact-summary and then location search
                try {
                  wiki = await fetchWikipediaSummary(hotel.name)
                } catch {
                  if (hotel.location) {
                    try {
                      wiki = await searchAndFetchSummary(hotel.location.split(',')[0].trim())
                    } catch {
                      // ignore fallback failure
                    }
                  }
                }
              }

              return { ...hotel, image: hotel.imageLocked ? hotel.image : wiki?.image || hotel.image }
            } catch {
              return hotel
            }
          })
        )

        setHotels(enriched)
      } catch (error) {
        setLoadError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadHotels()
  }, [])

  const navigate = useNavigate()

  const filteredHotels = useMemo(() => {
    const query = searchParams.destination.trim().toLowerCase()

    if (!query) {
      return hotels
    }

    return hotels.filter((hotel) => {
      const name = hotel.name?.toLowerCase() || ''
      const location = hotel.location?.toLowerCase() || ''
      return name.includes(query) || location.includes(query)
    })
  }, [searchParams.destination, hotels])

  const handleBookNow = (hotel) => {
    const storedBookings = JSON.parse(localStorage.getItem('travel-nest-bookings')) || []
    const bookingRef = `BH${Math.floor(Math.random() * 900000 + 100000)}`
    const bookingDate = searchParams.checkIn || new Date().toISOString().slice(0, 10)
    const nextBooking = {
      id: Date.now(),
      type: 'Hotel',
      name: hotel.name,
      date: bookingDate,
      bookingRef,
      status: 'Confirmed',
      amount: hotel.price
    }

    localStorage.setItem('travel-nest-bookings', JSON.stringify([...storedBookings, nextBooking]))
    navigate('/booking-history', { state: { bookingMessage: `Hotel booked successfully: ${hotel.name}` } })
  }

  const validateSearch = () => {
    const nextErrors = {}

    if (searchParams.destination.trim().length > 60) {
      nextErrors.destination = 'Destination must be 60 characters or less'
    }
    if (searchParams.checkIn && searchParams.checkOut && searchParams.checkOut <= searchParams.checkIn) {
      nextErrors.checkOut = 'Check-out must be after check-in'
    }
    if (!Number.isInteger(Number(searchParams.guests)) || Number(searchParams.guests) < 1) {
      nextErrors.guests = 'Enter at least 1 guest'
    }

    return nextErrors
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const nextErrors = validateSearch()
    setSearchErrors(nextErrors)
    setSearchTouched({ destination: true, checkIn: true, checkOut: true, guests: true })
  }

  const handleSearchBlur = (field) => () => {
    setSearchTouched((current) => ({ ...current, [field]: true }))
    setSearchErrors(validateSearch())
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">🏨 Hotel Booking</h1>
      
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <form onSubmit={handleSearch} noValidate>
            <div className="row">
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="form-label fw-semibold">Destination</label>
                <input 
                  type="text" 
                  className={`form-control ${searchTouched.destination && searchErrors.destination ? 'is-invalid' : ''}`} 
                  placeholder="City or hotel name"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                  onBlur={handleSearchBlur('destination')}
                />
                {searchTouched.destination && searchErrors.destination && <div className="invalid-feedback">{searchErrors.destination}</div>}
              </div>
              <div className="col-md-2 mb-3 mb-md-0">
                <label className="form-label fw-semibold">Check In</label>
                <input 
                  type="date" 
                  className="form-control"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                  onBlur={handleSearchBlur('checkIn')}
                />
              </div>
              <div className="col-md-2 mb-3 mb-md-0">
                <label className="form-label fw-semibold">Check Out</label>
                <input 
                  type="date" 
                  className={`form-control ${searchTouched.checkOut && searchErrors.checkOut ? 'is-invalid' : ''}`}
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                  onBlur={handleSearchBlur('checkOut')}
                />
                {searchTouched.checkOut && searchErrors.checkOut && <div className="invalid-feedback">{searchErrors.checkOut}</div>}
              </div>
              <div className="col-md-2 mb-3 mb-md-0">
                <label className="form-label fw-semibold">Guests</label>
                <input 
                  type="number" 
                  className={`form-control ${searchTouched.guests && searchErrors.guests ? 'is-invalid' : ''}`}
                  min="1"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: Number(e.target.value) || 1})}
                  onBlur={handleSearchBlur('guests')}
                />
                {searchTouched.guests && searchErrors.guests && <div className="invalid-feedback">{searchErrors.guests}</div>}
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100">Search Hotels</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        {isLoading ? (
          <div className="col-12">
            <div className="alert alert-info">Loading hotels…</div>
          </div>
        ) : loadError ? (
          <div className="col-12">
            <div className="alert alert-danger">{loadError}</div>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-warning">No hotels found for your search. Try another city or hotel name.</div>
          </div>
        ) : filteredHotels.map(hotel => (
          <div key={hotel.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <img
                src={hotel.image}
                className="card-img-top"
                alt={hotel.name}
                style={{height: '200px', objectFit: 'cover'}}
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = placeholderImage(hotel.name, 600, 400)
                }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title fw-bold">{hotel.name}</h5>
                  <span className="badge bg-warning">⭐ {hotel.rating}</span>
                </div>
                <p className="text-muted small mb-3">📍 {hotel.location}</p>
                <h4 className="text-primary fw-bold mb-3">{hotel.price}/night</h4>
                <button className="btn btn-primary w-100" onClick={() => handleBookNow(hotel)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
