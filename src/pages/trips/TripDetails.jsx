import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllTrips } from '../../utils/tripsStorage'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function TripDetails() {
  const { id } = useParams()
  const tripId = Number(id)
  const trip = useMemo(() => getAllTrips().find((item) => item.id === tripId), [tripId])

  if (!trip) {
    return (
      <div className="container-fluid p-4">
        <Link to="/my-trips" className="btn btn-outline-secondary btn-sm mb-3">
          <i className="bi bi-arrow-left me-1"></i>Back to My Trips
        </Link>
        <div className="alert alert-warning">
          <h3>Trip not found</h3>
          <p className="mb-0">The trip you requested does not exist.</p>
        </div>
      </div>
    )
  }

  const spentPercentage = Math.round((trip.spent / trip.budget) * 100)
  const remainingBudget = trip.budget - trip.spent

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/my-trips" className="btn btn-outline-secondary btn-sm mb-3">
            <i className="bi bi-arrow-left me-1"></i>Back to My Trips
          </Link>
          <h1 className="fw-bold mb-1">{trip.name}</h1>
          <p className="text-muted mb-0">{trip.destination}</p>
        </div>
        <span className={`badge ${trip.status === 'Completed' ? 'bg-success' : trip.status === 'Upcoming' ? 'bg-info' : 'bg-warning'}`}>
          {trip.status}
        </span>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <p className="text-muted mb-4">{trip.description}</p>

              <div className="row text-center mb-4">
                <div className="col-md-3">
                  <h6 className="text-muted small">Destination</h6>
                  <p className="fw-bold">{trip.destination}</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-muted small">Duration</h6>
                  <p className="fw-bold">{trip.days} Days</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-muted small">Budget</h6>
                  <p className="fw-bold">Rs. {trip.budget.toLocaleString('en-IN')}</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-muted small">Spent</h6>
                  <p className="fw-bold text-danger">Rs. {trip.spent.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div>
                <h6 className="fw-bold mb-2">Budget Status</h6>
                <div className="progress mb-2" style={{ height: '25px' }}>
                  <div className="progress-bar bg-danger" style={{ width: `${Math.min(spentPercentage, 100)}%` }}>
                    {spentPercentage}%
                  </div>
                </div>
                <small className="text-muted">
                  Rs. {trip.spent.toLocaleString('en-IN')} spent of Rs. {trip.budget.toLocaleString('en-IN')} budget
                </small>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-calendar3 text-primary me-2"></i>Itinerary</h5>
            </div>
            <div className="card-body">
              {trip.activities.map((item, index) => (
                <div key={`${item.date}-${item.activity}`} className="d-flex mb-3">
                  <div className="me-3">
                    <div className="badge bg-primary rounded-circle" style={{ padding: '8px 10px' }}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0"><strong>{item.date}</strong></p>
                    <p className="text-muted small">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Trip Actions</h5>
            </div>
            <div className="card-body">
              <Link to="/create-trip" className="btn btn-outline-primary w-100 mb-2">
                <i className="bi bi-pencil-square me-2"></i>Edit Trip
              </Link>
              <Link to="/hotel-booking" className="btn btn-outline-success w-100 mb-2">
                <i className="bi bi-building me-2"></i>Book Hotel
              </Link>
              <Link to="/transport-booking" className="btn btn-outline-info w-100 mb-2">
                <i className="bi bi-train-front me-2"></i>Book Transport
              </Link>
              <Link to="/travel-checklist" className="btn btn-outline-warning w-100">
                <i className="bi bi-list-check me-2"></i>Open Checklist
              </Link>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Quick Info</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <small className="text-muted">Check-in</small>
                <p className="fw-bold">{trip.startDate}</p>
              </div>
              <div className="mb-3">
                <small className="text-muted">Check-out</small>
                <p className="fw-bold">{trip.endDate}</p>
              </div>
              <div>
                <small className="text-muted">Remaining Budget</small>
                <p className="fw-bold text-success">Rs. {remainingBudget.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
