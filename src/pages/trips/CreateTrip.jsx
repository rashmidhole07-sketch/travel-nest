import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllTrips, getTripDays, saveTrip } from '../../utils/tripsStorage'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CreateTrip() {
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    tripName: '',
    destination: location.state?.destination || '',
    startDate: '',
    endDate: '',
    budget: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = () => {
    const nextErrors = {}
    const budget = Number(formData.budget)

    if (!formData.tripName.trim()) nextErrors.tripName = 'Trip name is required'
    if (!formData.destination.trim()) nextErrors.destination = 'Destination is required'
    if (!formData.startDate) nextErrors.startDate = 'Start date is required'
    if (!formData.endDate) nextErrors.endDate = 'End date is required'
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      nextErrors.endDate = 'End date must be after the start date'
    }
    if (!formData.budget) nextErrors.budget = 'Budget is required'
    else if (!Number.isFinite(budget) || budget <= 0) nextErrors.budget = 'Enter a budget greater than 0'
    if (formData.description.length > 240) nextErrors.description = 'Description must be 240 characters or less'

    return nextErrors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (touched[e.target.name]) {
      setErrors(validate())
    }
  }

  const handleBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validate())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setTouched({
      tripName: true,
      destination: true,
      startDate: true,
      endDate: true,
      budget: true,
      description: true,
    })
    if (Object.keys(nextErrors).length > 0) return

    const allTrips = getAllTrips()
    const nextId = Math.max(...allTrips.map((trip) => trip.id), 0) + 1
    const newTrip = {
      id: nextId,
      name: formData.tripName,
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: getTripDays(formData.startDate, formData.endDate),
      budget: Number(formData.budget),
      spent: 0,
      status: 'Planning',
      description: formData.description || `A planned trip to ${formData.destination}.`,
      activities: [
        { date: formData.startDate, activity: `Arrive in ${formData.destination}` },
        { date: formData.endDate, activity: `Depart from ${formData.destination}` },
      ],
    }

    saveTrip(newTrip)
    navigate('/my-trips')
  }

  return (
    <div className="container-fluid p-4">
      <div style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(255, 138, 101, 0.08))', padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem'}}>
        <h1 className="mb-2 fw-bold" style={{color: '#1f2430'}}>✈️ Create New Trip</h1>
        <p className="mb-0" style={{color: '#6c757d'}}>Plan your perfect trip with all the details</p>
      </div>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
            <div className="card-body p-5">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{color: '#1f2430'}}>✨ Trip Name</label>
                  <input 
                    type="text" 
                    name="tripName"
                    className={`form-control form-control-lg ${touched.tripName && errors.tripName ? 'is-invalid' : ''}`} 
                    placeholder="e.g., Kerala Backwater Escape"
                    value={formData.tripName}
                    onChange={handleChange}
                    onBlur={handleBlur('tripName')}
                    required
                    style={{borderRadius: '0.75rem', fontWeight: '500'}}
                  />
                  {touched.tripName && errors.tripName && <div className="invalid-feedback">{errors.tripName}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{color: '#1f2430'}}>📍 Destination</label>
                  <input 
                    type="text" 
                    name="destination"
                    className={`form-control form-control-lg ${touched.destination && errors.destination ? 'is-invalid' : ''}`} 
                    placeholder="e.g., Goa, India"
                    value={formData.destination}
                    onChange={handleChange}
                    onBlur={handleBlur('destination')}
                    required
                    style={{borderRadius: '0.75rem', fontWeight: '500'}}
                  />
                  {touched.destination && errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold" style={{color: '#1f2430'}}>📅 Start Date</label>
                    <input 
                      type="date" 
                      name="startDate"
                      className={`form-control form-control-lg ${touched.startDate && errors.startDate ? 'is-invalid' : ''}`}
                      value={formData.startDate}
                      onChange={handleChange}
                      onBlur={handleBlur('startDate')}
                      required
                      style={{borderRadius: '0.75rem', fontWeight: '500'}}
                    />
                    {touched.startDate && errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold" style={{color: '#1f2430'}}>📅 End Date</label>
                    <input 
                      type="date" 
                      name="endDate"
                      className={`form-control form-control-lg ${touched.endDate && errors.endDate ? 'is-invalid' : ''}`}
                      value={formData.endDate}
                      onChange={handleChange}
                      onBlur={handleBlur('endDate')}
                      required
                      style={{borderRadius: '0.75rem', fontWeight: '500'}}
                    />
                    {touched.endDate && errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{color: '#1f2430'}}>💰 Budget (₹)</label>
                  <input 
                    type="number" 
                    name="budget"
                    className={`form-control form-control-lg ${touched.budget && errors.budget ? 'is-invalid' : ''}`} 
                    placeholder="50000"
                    min="1"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur('budget')}
                    required
                    style={{borderRadius: '0.75rem', fontWeight: '500'}}
                  />
                  {touched.budget && errors.budget && <div className="invalid-feedback">{errors.budget}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{color: '#1f2430'}}>📝 Description</label>
                  <textarea 
                    name="description"
                    className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`} 
                    rows="4"
                    placeholder="Add details about your trip..."
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur('description')}
                    style={{borderRadius: '0.75rem', fontWeight: '500'}}
                  ></textarea>
                  {touched.description && errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <button type="submit" className="btn btn-primary btn-lg fw-semibold w-100" style={{borderRadius: '0.75rem', padding: '0.75rem 1.5rem'}}>
                  🚀 Create Trip
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow" style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.05), rgba(255, 138, 101, 0.03))'}}>
            <div className="card-header bg-transparent border-0 py-3">
              <h5 className="mb-0 fw-bold" style={{color: '#1f2430'}}>💡 Planning Tips</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-3 p-2" style={{background: 'rgba(51, 102, 255, 0.08)', borderRadius: '0.5rem', borderLeft: '3px solid #3366ff'}}>
                  <strong style={{color: '#1f2430'}}>Plan Ahead:</strong> <span style={{color: '#6c757d', fontSize: '0.9rem'}}>Create trips at least 2 weeks before departure</span>
                </li>
                <li className="mb-3 p-2" style={{background: 'rgba(16, 185, 129, 0.08)', borderRadius: '0.5rem', borderLeft: '3px solid #10b981'}}>
                  <strong style={{color: '#1f2430'}}>Set Budget:</strong> <span style={{color: '#6c757d', fontSize: '0.9rem'}}>Allocate a realistic budget for better planning</span>
                </li>
                <li className="p-2" style={{background: 'rgba(255, 138, 101, 0.08)', borderRadius: '0.5rem', borderLeft: '3px solid #ff8a65'}}>
                  <strong style={{color: '#1f2430'}}>Details Matter:</strong> <span style={{color: '#6c757d', fontSize: '0.9rem'}}>Add a description to keep track of your goals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
