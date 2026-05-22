import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function TransportBooking() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    tripType: 'oneway'
  })
  const [searchErrors, setSearchErrors] = useState({})
  const [searchTouched, setSearchTouched] = useState({})

  const [transports] = useState([
    { id: 1, type: 'Flight', operator: 'Air India', fromCity: 'Mumbai', toCity: 'Delhi', date: '2024-12-01', departure: '09:00', arrival: '11:30', price: 8500, duration: '2h 30m' },
    { id: 2, type: 'Train', operator: 'Shatabdi Express', fromCity: 'Delhi', toCity: 'Agra', date: '2024-12-01', departure: '10:00', arrival: '13:00', price: 1200, duration: '3h' },
    { id: 3, type: 'Bus', operator: 'Volvo Bus', fromCity: 'Pune', toCity: 'Goa', date: '2024-12-01', departure: '08:00', arrival: '14:00', price: 650, duration: '6h' },
    { id: 4, type: 'Flight', operator: 'Vistara', fromCity: 'Bengaluru', toCity: 'Hyderabad', date: '2024-12-01', departure: '14:00', arrival: '16:30', price: 9200, duration: '2h 30m' }
  ])

  const filteredTransports = useMemo(() => {
    return transports.filter((transport) => {
      const fromMatch = searchParams.from.trim().toLowerCase()
      const toMatch = searchParams.to.trim().toLowerCase()
      const dateMatch = searchParams.date.trim()
      const fromCity = transport.fromCity.toLowerCase()
      const toCity = transport.toCity.toLowerCase()

      const matchesFrom = !fromMatch || fromCity.includes(fromMatch)
      const matchesTo = !toMatch || toCity.includes(toMatch)
      const matchesDate = !dateMatch || transport.date === dateMatch

      return matchesFrom && matchesTo && matchesDate
    })
  }, [searchParams, transports])

  const validateSearch = () => {
    const nextErrors = {}

    if (searchParams.from.trim().length > 40) nextErrors.from = 'Departure city must be 40 characters or less'
    if (searchParams.to.trim().length > 40) nextErrors.to = 'Destination city must be 40 characters or less'
    if (
      searchParams.from.trim() &&
      searchParams.to.trim() &&
      searchParams.from.trim().toLowerCase() === searchParams.to.trim().toLowerCase()
    ) {
      nextErrors.to = 'Destination must be different from departure city'
    }

    return nextErrors
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const nextErrors = validateSearch()
    setSearchErrors(nextErrors)
    setSearchTouched({ from: true, to: true, date: true })
  }

  const handleSearchBlur = (field) => () => {
    setSearchTouched((current) => ({ ...current, [field]: true }))
    setSearchErrors(validateSearch())
  }

  const handleBookNow = (transport) => {
    const storedBookings = JSON.parse(localStorage.getItem('travel-nest-bookings')) || []
    const bookingDate = transport.date || 'TBD'
    const bookingRef = `BH${transport.id}${transport.fromCity.slice(0, 2).toUpperCase()}${transport.toCity.slice(0, 2).toUpperCase()}${bookingDate.replace(/-/g, '')}`
    const nextBooking = {
      id: storedBookings.length + transport.id + 1000,
      type: transport.type,
      name: `${transport.operator} ${transport.fromCity} → ${transport.toCity}`,
      date: bookingDate,
      bookingRef,
      status: 'Confirmed',
      amount: transport.price
    }

    localStorage.setItem('travel-nest-bookings', JSON.stringify([...storedBookings, nextBooking]))
    navigate('/booking-history', { state: { bookingMessage: `Transport booked successfully: ${transport.operator} ${transport.fromCity} → ${transport.toCity}` } })
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">🚌 Transport Booking</h1>
      
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <form onSubmit={handleSearch} noValidate>
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="tripType" value="oneway" 
                    checked={searchParams.tripType === 'oneway'} 
                    onChange={(e) => setSearchParams({...searchParams, tripType: e.target.value})} />
                  <label className="form-check-label">One Way</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="tripType" value="roundtrip"
                    checked={searchParams.tripType === 'roundtrip'}
                    onChange={(e) => setSearchParams({...searchParams, tripType: e.target.value})} />
                  <label className="form-check-label">Round Trip</label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="form-label fw-semibold">From</label>
                <input 
                  type="text" 
                  className={`form-control ${searchTouched.from && searchErrors.from ? 'is-invalid' : ''}`} 
                  placeholder="Departure city"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                  onBlur={handleSearchBlur('from')}
                />
                {searchTouched.from && searchErrors.from && <div className="invalid-feedback">{searchErrors.from}</div>}
              </div>
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="form-label fw-semibold">To</label>
                <input 
                  type="text" 
                  className={`form-control ${searchTouched.to && searchErrors.to ? 'is-invalid' : ''}`} 
                  placeholder="Destination city"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                  onBlur={handleSearchBlur('to')}
                />
                {searchTouched.to && searchErrors.to && <div className="invalid-feedback">{searchErrors.to}</div>}
              </div>
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="form-label fw-semibold">Departure Date</label>
                <input 
                  type="date" 
                  className="form-control"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                  onBlur={handleSearchBlur('date')}
                />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        {filteredTransports.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-warning">No transport options match your search. Try another route or date.</div>
          </div>
        ) : filteredTransports.map((transport) => (
          <div key={transport.id} className="col-12 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row align-items-center transport-option-row">
                  <div className="col-md-2">
                    <h6 className="fw-bold">{transport.type}</h6>
                    <small className="text-muted">{transport.operator}</small>
                  </div>
                  <div className="col-md-2">
                    <h6 className="fw-bold mb-1">{transport.fromCity}</h6>
                    <small className="text-muted">From</small>
                  </div>
                  <div className="col-md-2">
                    <h6 className="fw-bold mb-1">{transport.toCity}</h6>
                    <small className="text-muted">To</small>
                  </div>
                  <div className="col-md-2">
                    <h5 className="fw-bold">{transport.departure}</h5>
                    <small className="text-muted">Departure</small>
                  </div>
                  <div className="col-md-2 text-center">
                    <p className="text-muted small mb-0">{transport.duration}</p>
                    <div style={{borderTop: '2px solid #dee2e6', margin: '5px 0'}}></div>
                  </div>
                  <div className="col-md-2">
                    <h5 className="fw-bold">{transport.arrival}</h5>
                    <small className="text-muted">Arrival</small>
                  </div>
                  <div className="col-md-3 d-flex justify-content-between align-items-center transport-booking-action">
                    <div className="transport-booking-price">
                      <h4 className="fw-bold text-primary mb-0">₹{transport.price}</h4>
                      <small className="text-muted d-block">{transport.date}</small>
                    </div>
                    <button className="btn btn-primary btn-sm transport-book-button" onClick={() => handleBookNow(transport)}>Book</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
