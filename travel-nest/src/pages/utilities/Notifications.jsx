import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'booking', title: 'Booking Confirmation', message: 'Your hotel booking for Goa is confirmed!', time: '2 hours ago', read: false, icon: '🏨' },
    { id: 2, type: 'reminder', title: 'Trip Reminder', message: 'Your Jaipur trip starts in 3 days!', time: '5 hours ago', read: false, icon: '📅' },
    { id: 3, type: 'expense', title: 'Budget Alert', message: 'You have spent 75% of your trip budget', time: '1 day ago', read: true, icon: '💰' },
    { id: 4, type: 'weather', title: 'Weather Update', message: 'Sunny weather in Udaipur tomorrow', time: '2 days ago', read: true, icon: '☀️' },
    { id: 5, type: 'promotion', title: 'Special Offer', message: 'Get 20% off on hotels in Rajasthan', time: '3 days ago', read: true, icon: '🎉' }
  ])

  const [currentNotification, setCurrentNotification] = useState(null)

  const viewNotification = (id) => {
    const found = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    if (found) setCurrentNotification(found)
  }

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const [filter, setFilter] = useState('all')

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter)

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">🔔 Notifications</h1>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'unread' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'booking' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('booking')}
            >
              Bookings
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'reminder' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('reminder')}
            >
              Reminders
            </button>
          </div>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-sm btn-outline-secondary" onClick={markAllAsRead}>Mark all as read</button>
        </div>
      </div>

      {filteredNotifications.map(notif => (
        <div 
          key={notif.id} 
          className={`card border-0 shadow-sm mb-3 ${!notif.read ? 'bg-light' : ''}`}
        >
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-1">
                <div style={{fontSize: '24px'}}>{notif.icon}</div>
              </div>
              <div className="col-md-7">
                <h6 className="fw-bold mb-1">{notif.title}</h6>
                <p className="mb-1">{notif.message}</p>
                <small className="text-muted">{notif.time}</small>
              </div>
              <div className="col-md-4 text-end">
                {!notif.read && <span className="badge bg-primary me-2">New</span>}
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => viewNotification(notif.id)}>View</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => dismissNotification(notif.id)}>Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {currentNotification && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentNotification.title}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setCurrentNotification(null)}></button>
              </div>
              <div className="modal-body">
                <p>{currentNotification.message}</p>
                <small className="text-muted">{currentNotification.time}</small>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setCurrentNotification(null)}>Close</button>
                <button type="button" className="btn btn-danger" onClick={() => { dismissNotification(currentNotification.id); setCurrentNotification(null); }}>Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
