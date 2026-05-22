import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Journal() {
  const [entries, setEntries] = useState([
    { id: 1, date: '2024-06-16', title: 'First Day in Jaipur', content: 'Arrived in Jaipur today! The palaces and colors are stunning. Enjoyed local sweets in the evening.', trip: 'Jaipur Heritage Tour' },
    { id: 2, date: '2024-06-17', title: 'Amber Fort', content: 'Spent the morning exploring Amber Fort and the royal gardens. The views from the ramparts were incredible!', trip: 'Jaipur Heritage Tour' }
  ])

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    trip: 'Jaipur Heritage Tour'
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!formData.trip) nextErrors.trip = 'Choose a trip'
    if (!formData.title.trim()) nextErrors.title = 'Title is required'
    else if (formData.title.length > 80) nextErrors.title = 'Title must be 80 characters or less'
    if (!formData.content.trim()) nextErrors.content = 'Content is required'
    else if (formData.content.length < 10) nextErrors.content = 'Write at least 10 characters'

    return nextErrors
  }

  const handleAddEntry = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setTouched({ trip: true, title: true, content: true })
    if (Object.keys(nextErrors).length > 0) return

    const today = new Date().toISOString().split('T')[0]
    setEntries([...entries, {
      id: entries.length + 1,
      date: today,
      ...formData,
      title: formData.title.trim(),
      content: formData.content.trim(),
    }])
    setFormData({ title: '', content: '', trip: 'Jaipur Heritage Tour' })
    setErrors({})
    setTouched({})
  }

  const handleBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validate())
  }

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">📝 Travel Journal</h1>
      
      <div className="row">
        <div className="col-lg-8 order-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">My Entries</h5>
            </div>
            <div className="card-body">
              {entries.length === 0 ? (
                <div className="alert alert-info">No entries yet. Start writing!</div>
              ) : (
                entries.map(entry => (
                  <div key={entry.id} className="border-bottom pb-4 mb-4 last-child-no-border">
                    <div className="d-flex justify-content-between align-items-start mb-2 journal-entry-header">
                      <div className="journal-entry-meta">
                        <h5 className="fw-bold mb-1">{entry.title}</h5>
                        <small className="text-muted">{entry.date} • {entry.trip}</small>
                      </div>
                      <button className="btn btn-sm btn-outline-danger journal-delete-button" onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
                    </div>
                    <p className="mb-0">{entry.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4 order-lg-1 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">New Entry</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddEntry} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Trip</label>
                  <select 
                    className={`form-select ${touched.trip && errors.trip ? 'is-invalid' : ''}`}
                    value={formData.trip}
                    onChange={(e) => setFormData({...formData, trip: e.target.value})}
                    onBlur={handleBlur('trip')}
                  >
                    <option>Jaipur Heritage Tour</option>
                    <option>Goa Beach Break</option>
                    <option>Kerala Retreat</option>
                  </select>
                  {touched.trip && errors.trip && <div className="invalid-feedback">{errors.trip}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Title</label>
                  <input 
                    type="text" 
                    className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`} 
                    placeholder="Entry title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    onBlur={handleBlur('title')}
                  />
                  {touched.title && errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Content</label>
                  <textarea 
                    className={`form-control ${touched.content && errors.content ? 'is-invalid' : ''}`} 
                    rows="5"
                    placeholder="Write your thoughts and experiences..."
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    onBlur={handleBlur('content')}
                  ></textarea>
                  {touched.content && errors.content && <div className="invalid-feedback">{errors.content}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Save Entry</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
