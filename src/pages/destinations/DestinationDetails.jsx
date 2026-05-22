import { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import FavoritesContext from '../../contexts/FavoritesContext.jsx'
import { placeholderImage } from '../../utils/placeholderImage'
import { fetchDestinationWikiData } from '../../utils/wikipediaApi'
import 'bootstrap/dist/css/bootstrap.min.css'

function PlanTripButton({ destinationName }) {
  const navigate = useNavigate()
  return (
    <button
      className="btn btn-primary w-100 mb-2"
      onClick={() => navigate('/create-trip', { state: { destination: destinationName } })}
    >
      ✈️ Plan Trip Here
    </button>
  )
}

export default function DestinationDetails() {
  const { id } = useParams()
  const destinationId = id ? Number(id) : null
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { addFavorite, isFavorite } = useContext(FavoritesContext)

  useEffect(() => {
    async function loadDestinationDetails() {
      try {
        const response = await fetch('/api/destinations.json')
        if (!response.ok) {
          setIsLoading(false)
          return
        }
        const data = await response.json()
        const found = data.find((item) => item.id === destinationId)
        if (found) {
          try {
            const wiki = await fetchDestinationWikiData(found)
            setDestination({
              ...found,
              image: wiki.image || found.image,
              description: wiki.description || found.description,
            })
          } catch {
            setDestination(found)
          }
        }
        setIsLoading(false)
      } catch {
        setIsLoading(false)
      }
    }

    if (destinationId) {
      loadDestinationDetails()
    }
  }, [destinationId])

  if (isLoading) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-info">Loading destination details…</div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="container-fluid p-4">
        <Link to="/explore-destinations" className="btn btn-outline-secondary btn-sm mb-3">
          ← Back to Explore
        </Link>
        <div className="alert alert-warning">
          <h3>Destination not found</h3>
          <p>The destination you requested does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid p-4">
      <div className="mb-3">
        <Link to="/explore-destinations" className="btn btn-outline-secondary btn-sm">
          ← Back to Explore
        </Link>
      </div>

      <h1 className="mb-4 fw-bold">📍 {destination.name}</h1>
      
      <div className="row mb-4">
        <div className="col-lg-8">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="img-fluid rounded shadow-sm mb-4"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = placeholderImage(destination.name, 800, 400)
            }}
          />
          
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">About</h5>
            </div>
            <div className="card-body">
              <p>{destination.description}</p>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">🎯 Top Attractions</h5>
            </div>
            <div className="card-body">
              {destination.attractions && destination.attractions.length > 0 ? (
                <div className="list-group">
                  {destination.attractions.map((attr) => (
                    <div key={attr.id} className="list-group-item list-group-item-action border-0 py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-semibold">{attr.name}</span>
                        <span className="badge bg-warning">⭐ {attr.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No attractions available</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-muted small">Rating</h6>
                <h3 className="text-warning fw-bold">⭐ {destination.rating}</h3>
                <small className="text-muted">{destination.reviews} reviews</small>
              </div>
              <hr />
              <PlanTripButton destinationName={destination.name} />
              <button
                className={`btn w-100 ${isFavorite(destination.id) ? 'btn-success' : 'btn-primary'}`}
                onClick={() => {
                  addFavorite(destination)
                  navigate('/favorite-places')
                }}
                disabled={isFavorite(destination.id)}
              >
                {isFavorite(destination.id) ? '❤️ Added to Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">📋 Quick Info</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <small className="text-muted fw-semibold">📅 Best Time to Visit</small>
                <p className="fw-bold mb-0">{destination.bestTime}</p>
              </div>
              <hr />
              <div className="mb-3">
                <small className="text-muted fw-semibold">💰 Average Budget</small>
                <p className="fw-bold mb-0">{destination.avgBudget}</p>
              </div>
              <hr />
              <div className="mb-3">
                <small className="text-muted fw-semibold">🗣️ Language</small>
                <p className="fw-bold mb-0">{destination.language}</p>
              </div>
              <hr />
              <div>
                <small className="text-muted fw-semibold">🚀 Getting There</small>
                <p className="fw-bold mb-0">Flight recommended</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
