import { useState, useEffect, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { placeholderImage } from '../../utils/placeholderImage'
import { fetchDestinationWikiData } from '../../utils/wikipediaApi'
import SearchContext from '../../contexts/SearchContext.jsx'
import FavoritesContext from '../../contexts/FavoritesContext.jsx'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ExploreDestinations() {
  const [destinations, setDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    async function loadDestinations() {
      try {
        const response = await fetch('/api/destinations.json')
        if (!response.ok) throw new Error('Failed to load destinations')
        const data = await response.json()
        const enriched = await Promise.all(
          data.map(async (dest) => {
            try {
              const wiki = await fetchDestinationWikiData(dest)
              return {
                ...dest,
                image: wiki.image || dest.image,
                description: wiki.description || dest.description,
              }
            } catch {
              return dest
            }
          })
        )
        setDestinations(enriched)
      } catch (error) {
        setLoadError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadDestinations()
  }, [])

  const [filter, setFilter] = useState('all')
  const { searchQuery } = useContext(SearchContext)
  const { addFavorite, isFavorite } = useContext(FavoritesContext)
  const navigate = useNavigate()

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const filteredByCategory = destinations.filter((dest) => {
      if (filter === 'all') return true
      if (filter === 'popular') return dest.rating >= 4.8
      if (filter === 'trending') return dest.reviews >= 5000 || dest.rating >= 4.8
      if (filter === 'budget') return ['Goa', 'Kerala', 'Varanasi'].some((term) => dest.name.includes(term))
      return true
    })

    if (!normalizedQuery) return filteredByCategory

    return filteredByCategory.filter((dest) => {
      const text = `${dest.name} ${dest.description}`.toLowerCase()
      return text.includes(normalizedQuery)
    })
  }, [destinations, filter, searchQuery])

  if (isLoading) {
    return (
      <div className="container-fluid p-4">
        <h1 className="mb-4 fw-bold">🌍 Explore Destinations</h1>
        <div className="alert alert-info">Loading destinations…</div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="container-fluid p-4">
        <h1 className="mb-4 fw-bold">🌍 Explore Destinations</h1>
        <div className="alert alert-danger">{loadError}</div>
      </div>
    )
  }

  return (
    <div className="container-fluid p-4">
      <div style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(255, 138, 101, 0.08))', padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem'}}>
        <h1 className="mb-2 fw-bold" style={{color: '#1f2430'}}>🌍 Explore Destinations</h1>
        <p className="mb-0" style={{color: '#6c757d'}}>Discover amazing travel destinations around the world</p>
      </div>
      
      <div className="mb-4">
        <div className="btn-group gap-2" role="group" style={{flexWrap: 'wrap'}}>
          <button 
            type="button" 
            className={`btn fw-semibold ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            type="button" 
            className={`btn fw-semibold ${filter === 'popular' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('popular')}
          >
            Popular
          </button>
          <button 
            type="button" 
            className={`btn fw-semibold ${filter === 'trending' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('trending')}
          >
            Trending
          </button>
          <button 
            type="button" 
            className={`btn fw-semibold ${filter === 'budget' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('budget')}
          >
            Budget
          </button>
        </div>
      </div>

      <div className="row">
        {filteredDestinations.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No destinations match your search.</div>
          </div>
        ) : filteredDestinations.map(dest => (
          <div key={dest.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow h-100 overflow-hidden" style={{transition: 'all 0.3s ease', position: 'relative'}}>
              <div style={{position: 'relative', overflow: 'hidden', height: '220px', background: '#f0f0f0'}}>
                <img
                  src={dest.image}
                  className="w-100 h-100"
                  alt={dest.name}
                  style={{objectFit: 'cover', transition: 'transform 0.3s ease'}}
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = placeholderImage(dest.name, 600, 400)
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{position: 'absolute', top: '12px', right: '12px', background: 'linear-gradient(135deg, #3366ff, #0d47a1)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontWeight: '600', fontSize: '0.9rem'}}>
                  ⭐ {dest.rating}
                </div>
              </div>
              <div className="card-body d-flex flex-column" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
                <h5 className="card-title fw-bold" style={{color: '#1f2430', marginBottom: '0.5rem'}}>{dest.name}</h5>
                <p className="text-muted small flex-grow-1" style={{marginBottom: '1rem'}}>{dest.description}</p>
                
                <div className="d-flex justify-content-between align-items-center mb-3 py-2 border-top border-bottom" style={{borderColor: 'rgba(18, 45, 78, 0.08)'}}>
                  <small className="text-muted fw-semibold">{dest.reviews} reviews</small>
                </div>

                <Link to={`/destination-details/${dest.id}`} className="btn btn-outline-primary w-100 mb-2 fw-semibold">
                  View Details
                </Link>
                <button
                  className={`btn w-100 fw-semibold ${isFavorite(dest.id) ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => {
                    addFavorite(dest)
                    navigate('/favorite-places')
                  }}
                  disabled={isFavorite(dest.id)}
                >
                  {isFavorite(dest.id) ? '❤️ Added to Favorites' : '🤍 Add to Favorites'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
