import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function TravelChecklist() {
  const [items, setItems] = useState([
    { id: 1, category: 'Documents', items: ['Passport', 'Visa', 'Travel Insurance'], completed: [false, true, false] },
    { id: 2, category: 'Packing', items: ['Luggage', 'Clothes', 'Toiletries', 'Electronics'], completed: [true, false, true, false] },
    { id: 3, category: 'Bookings', items: ['Flight', 'Hotel', 'Transport', 'Activities'], completed: [true, true, false, false] },
    { id: 4, category: 'Preparation', items: ['Check weather', 'Book tours', 'Inform bank'], completed: [true, false, false] }
  ])

  const toggleItem = (categoryId, itemIdx) => {
    setItems(items.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          completed: cat.completed.map((val, idx) => idx === itemIdx ? !val : val)
        }
      }
      return cat
    }))
  }

  const getProgressPercentage = (cat) => {
    const total = cat.items.length
    const completed = cat.completed.filter(c => c).length
    return Math.round((completed / total) * 100)
  }

  const totalItems = items.reduce((sum, cat) => sum + cat.items.length, 0)
  const totalCompleted = items.reduce((sum, cat) => sum + cat.completed.filter(c => c).length, 0)

  return (
    <div className="container-fluid p-4">
      <div style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(255, 138, 101, 0.08))', padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem'}}>
        <h1 className="mb-2 fw-bold" style={{color: '#1f2430'}}>✅ Travel Checklist</h1>
        <p className="mb-0" style={{color: '#6c757d'}}>Stay organized with a complete pre-trip checklist</p>
      </div>
      
      <div className="card border-0 shadow mb-4" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <h6 className="text-muted fw-semibold small">📊 Overall Progress</h6>
              <div className="progress mb-2" style={{height: '32px', borderRadius: '0.5rem'}}>
                <div 
                  className="progress-bar fw-bold d-flex align-items-center justify-content-center" 
                  style={{width: `${(totalCompleted/totalItems)*100}%`, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white'}}
                >
                  {(totalCompleted/totalItems)*100 > 10 && (
                    <span style={{fontSize: '0.9rem'}}>
                      {totalCompleted}/{totalItems} ✓
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h6 className="text-muted fw-semibold small">🎯 Completion Rate</h6>
              <h2 className="fw-bold mb-0" style={{background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#10b981'}}>
                {Math.round((totalCompleted/totalItems)*100)}%
              </h2>
            </div>
          </div>
        </div>
      </div>

      {items.map(category => (
        <div key={category.id} className="card border-0 shadow mb-4" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
          <div className="card-header bg-transparent border-0 py-3" style={{borderBottom: '1px solid rgba(18, 45, 78, 0.06)'}}>
            <div className="row align-items-center">
              <div className="col-md-8">
                <h5 className="mb-0 fw-bold" style={{color: '#1f2430'}}>
                  {category.category === 'Documents' && '📄'} 
                  {category.category === 'Packing' && '🧳'} 
                  {category.category === 'Bookings' && '🎟️'} 
                  {category.category === 'Preparation' && '⚡'} 
                  {' '}{category.category}
                </h5>
              </div>
              <div className="col-md-4">
                <div className="progress" style={{height: '24px', borderRadius: '0.5rem'}}>
                  <div 
                    className="progress-bar fw-bold d-flex align-items-center justify-content-center"
                    style={{width: `${getProgressPercentage(category)}%`, background: 'linear-gradient(135deg, #3366ff, #0d47a1)', color: 'white', fontSize: '0.8rem'}}
                  >
                    {getProgressPercentage(category)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            {category.items.map((item, idx) => (
              <div key={idx} className="d-flex align-items-center p-2 mb-2 last-child-no-margin" style={{background: category.completed[idx] ? 'rgba(16, 185, 129, 0.06)' : 'rgba(51, 102, 255, 0.03)', borderRadius: '0.5rem', border: '1px solid rgba(18, 45, 78, 0.06)', transition: 'all 0.2s ease'}}>
                <input 
                  type="checkbox" 
                  className="form-check-input me-3" 
                  style={{width: '20px', height: '20px', cursor: 'pointer'}}
                  checked={category.completed[idx]}
                  onChange={() => toggleItem(category.id, idx)}
                />
                <label className={`mb-0 flex-grow-1 fw-500 cursor-pointer ${category.completed[idx] ? 'text-muted text-decoration-line-through' : ''}`} style={{color: category.completed[idx] ? '#6c757d' : '#1f2430', cursor: 'pointer'}}>
                  {item}
                </label>
                {category.completed[idx] && (
                  <span className="badge bg-success fw-semibold" style={{fontSize: '0.8rem'}}>✓ Done</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
