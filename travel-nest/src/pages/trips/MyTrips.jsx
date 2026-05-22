import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllTrips } from '../../utils/tripsStorage'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MyTrips() {
  const [trips] = useState(() => getAllTrips())

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">✈️ My Trips</h1>
          <p className="text-muted" style={{margin: 0}}>Manage and track all your planned trips</p>
        </div>
        <Link to="/create-trip" className="btn btn-primary fw-semibold" style={{borderRadius: '0.75rem', padding: '0.75rem 1.5rem'}}>+ New Trip</Link>
      </div>
      
      <div className="row">
        {trips.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info" style={{borderRadius: '0.75rem'}}>
              <h5 className="fw-bold mb-2">No trips yet! 🏖️</h5>
              <p className="mb-0">Create your first trip to start planning your adventure.</p>
            </div>
          </div>
        ) : trips.map(trip => (
          <div key={trip.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow h-100 overflow-hidden" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)', transition: 'all 0.3s ease'}}>
              <div style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(255, 138, 101, 0.08))', padding: '1rem', borderBottom: '1px solid rgba(18, 45, 78, 0.06)'}}>
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h5 className="card-title fw-bold mb-0" style={{color: '#1f2430'}}>{trip.name}</h5>
                  <span className={`badge fw-semibold ${trip.status === 'Completed' ? 'bg-success' : trip.status === 'Upcoming' ? 'bg-info' : 'bg-warning'}`} style={{fontSize: '0.8rem', padding: '0.4rem 0.6rem'}}>
                    {trip.status === 'Completed' ? '✓' : trip.status === 'Upcoming' ? '⏱️' : '🕐'} {trip.status}
                  </span>
                </div>
                <p className="text-muted small mb-0">📍 {trip.destination}</p>
              </div>
              
              <div className="card-body">
                <div className="mb-3">
                  <small className="text-muted fw-semibold">📅 {trip.days} days trip</small>
                  <p className="small text-muted mb-0">{trip.startDate} → {trip.endDate}</p>
                </div>

                <div className="mb-3 p-2" style={{background: 'rgba(51, 102, 255, 0.05)', borderRadius: '0.5rem'}}>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted fw-semibold">💰 Budget Status</small>
                    <small className="fw-bold" style={{color: (trip.spent/trip.budget)*100 > 80 ? '#ef4444' : (trip.spent/trip.budget)*100 > 50 ? '#f59e0b' : '#10b981'}}>
                      {Math.round((trip.spent/trip.budget)*100)}%
                    </small>
                  </div>
                  <small className="text-muted d-block mb-2">₹{trip.spent} / ₹{trip.budget}</small>
                  <div className="progress" style={{height: '6px', borderRadius: '3px'}}>
                    <div 
                      className="progress-bar" 
                      style={{
                        width: `${Math.min((trip.spent/trip.budget)*100, 100)}%`,
                        background: (trip.spent/trip.budget)*100 > 80 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : (trip.spent/trip.budget)*100 > 50 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #10b981, #059669)'
                      }}
                    ></div>
                  </div>
                </div>

                <Link to={`/trip-details/${trip.id}`} className="btn btn-outline-primary w-100 fw-semibold" style={{borderRadius: '0.5rem', fontSize: '0.9rem'}}>
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
