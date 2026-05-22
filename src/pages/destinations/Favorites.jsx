import { useState, useContext } from 'react'
import FavoritesContext from '../../contexts/FavoritesContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function FavoritePlaces() {
  const { favorites, removeFavorite, toggleVisited } = useContext(FavoritesContext)
  const [filter, setFilter] = useState('all')

  const filteredFavorites = filter === 'all' 
    ? favorites 
    : filter === 'visited' 
    ? favorites.filter(f => f.visited)
    : favorites.filter(f => !f.visited)

  return (
    <div className="container-fluid p-4">
      <div style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(255, 138, 101, 0.08))', padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem'}}>
        <h1 className="mb-2 fw-bold" style={{color: '#1f2430'}}>❤️ Favorite Places</h1>
        <p className="mb-0" style={{color: '#6c757d'}}>Your collection of favorite destinations</p>
      </div>
      
      <div className="mb-4">
        <div className="btn-group gap-2" role="group" style={{flexWrap: 'wrap'}}>
          <button 
            type="button" 
            className={`btn fw-semibold ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            All ({favorites.length})
          </button>
          <button 
            type="button" 
            className={`btn fw-semibold ${filter === 'visited' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('visited')}
          >
            ✓ Visited ({favorites.filter(f => f.visited).length})
          </button>
          <button 
            type="button" 
            className={`btn fw-semibold ${filter === 'wishlist' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('wishlist')}
          >
            🎯 Wishlist ({favorites.filter(f => !f.visited).length})
          </button>
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="alert alert-info" style={{borderRadius: '0.75rem', padding: '1.5rem'}}>
          <h5 className="fw-bold mb-1">No favorites yet! 🏖️</h5>
          <p className="mb-0">Start adding your favorite destinations to your collection.</p>
        </div>
      ) : (
        <div className="row">
          {filteredFavorites.map(place => (
            <div key={place.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card border-0 shadow h-100 overflow-hidden" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)', transition: 'all 0.3s ease'}}>
                <div style={{position: 'relative', overflow: 'hidden', height: '220px', background: '#f0f0f0'}}>
                  <img src={place.image} className="w-100 h-100" alt={place.name} style={{objectFit: 'cover', transition: 'transform 0.3s ease'}} 
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{position: 'absolute', top: '12px', right: '12px'}}>
                    <button 
                      className="btn btn-danger btn-sm rounded-circle fw-bold"
                      onClick={() => removeFavorite(place.id)}
                      title="Remove from favorites"
                      style={{width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                      ✕
                    </button>
                  </div>
                  {place.visited && (
                    <div style={{position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(16, 185, 129, 0.9)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: '600'}}>
                      ✓ Visited
                    </div>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <h5 className="card-title fw-bold mb-1" style={{color: '#1f2430'}}>{place.name}</h5>
                    <span className="badge fw-semibold" style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.12), rgba(255, 138, 101, 0.12))', color: '#1f2430', fontSize: '0.8rem', padding: '0.4rem 0.6rem'}}>
                      {place.category}
                    </span>
                  </div>
                  
                  <div className="mb-3 flex-grow-1">
                    <div style={{background: 'rgba(51, 102, 255, 0.05)', padding: '0.75rem', borderRadius: '0.5rem'}}>
                      <span className="badge bg-warning fw-semibold">⭐ {place.rating}</span>
                    </div>
                  </div>

                  <button 
                    className={`btn w-100 fw-semibold ${place.visited ? 'btn-outline-success' : 'btn-outline-primary'}`}
                    onClick={() => toggleVisited(place.id)}
                    style={{borderRadius: '0.5rem'}}
                  >
                    {place.visited ? '↩️ Mark as Wishlist' : '✓ Mark as Visited'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
