import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const defaultBookings = [
  { id: 1, type: 'Hotel', name: 'Heritage Hotel Jaipur', date: '2024-06-15', bookingRef: 'BH001234', status: 'Confirmed', amount: 15000 },
  { id: 2, type: 'Flight', name: 'IndiGo Mumbai to Jaipur', date: '2024-06-15', bookingRef: 'FL001235', status: 'Confirmed', amount: 4500 },
  { id: 3, type: 'Transport', name: 'Private Car Jaipur Tour', date: '2024-05-10', bookingRef: 'TR001236', status: 'Completed', amount: 12000 },
  { id: 4, type: 'Hotel', name: 'Goa Beach Resort', date: '2024-05-01', bookingRef: 'BH001237', status: 'Completed', amount: 8000 }
]

export default function BookingHistory() {
  const location = useLocation()
  const [bookings, setBookings] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('travel-nest-bookings'))
      return Array.isArray(stored) && stored.length > 0 ? [...defaultBookings, ...stored] : defaultBookings
    } catch {
      return defaultBookings
    }
  })

  const [toast, setToast] = useState({
    show: Boolean(location.state?.bookingMessage),
    message: location.state?.bookingMessage || ''
  })
  const [selectedBooking, setSelectedBooking] = useState(null)
  const defaultBookingRefs = defaultBookings.map((b) => b.bookingRef)

  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(() => setToast({ show: false, message: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [toast.show])

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-success'
      case 'Completed': return 'bg-info'
      case 'Cancelled': return 'bg-danger'
      default: return 'bg-secondary'
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Hotel': return '🏨'
      case 'Flight': return '✈️'
      case 'Transport': return '🚌'
      default: return '🎫'
    }
  }

  const totalBookings = bookings.length
  const confirmedBookings = bookings.filter((item) => item.status === 'Confirmed').length
  const completedBookings = bookings.filter((item) => item.status === 'Completed').length
  const totalSpent = bookings.reduce((sum, booking) => sum + (Number(booking.amount) || 0), 0)

  function syncStoredBookings(next) {
    // persist only non-default bookings
    const toStore = next.filter((b) => !defaultBookingRefs.includes(b.bookingRef))
    try {
      localStorage.setItem('travel-nest-bookings', JSON.stringify(toStore))
    } catch (e) {
      // ignore persistence errors in environments without storage
      console.warn('Could not persist bookings', e)
    }
  }

  const openDetails = (booking) => setSelectedBooking(booking)

  const closeDetails = () => setSelectedBooking(null)

  const cancelBooking = (bookingId) => {
    const next = bookings.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    setBookings(next)
    syncStoredBookings(next)
    setToast({ show: true, message: 'Booking cancelled' })
    closeDetails()
  }

  const downloadInvoice = (booking) => {
    const lines = [
      `Invoice for ${booking.name}`,
      `Booking ID: ${booking.bookingRef}`,
      `Date: ${booking.date}`,
      `Amount: ₹${booking.amount}`,
      '',
      'Thank you for booking with Travel Nest.'
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice_${booking.bookingRef}.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const downloadAllInvoices = () => {
    const csvLines = ['Type,Name,Date,BookingRef,Status,Amount']
    bookings.forEach((b) => csvLines.push(`${b.type},"${b.name}",${b.date},${b.bookingRef},${b.status},${b.amount}`))
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `all_bookings.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const clearUserBookings = () => {
    if (!confirm('Clear all saved bookings? This cannot be undone.')) return
    localStorage.removeItem('travel-nest-bookings')
    setBookings(defaultBookings)
    setToast({ show: true, message: 'Saved bookings cleared' })
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">📋 Booking History</h1>

      <div aria-live="polite" aria-atomic="true" className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
        <div className={`toast ${toast.show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Booking</strong>
            <small className="text-muted">now</small>
            <button type="button" className="btn-close ms-2 mb-1" aria-label="Close" onClick={() => setToast({ show: false, message: '' })}></button>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">All Bookings</h5>
            </div>
            <div className="card-body">
              {bookings.map(booking => (
                <div key={booking.id} className="border-bottom pb-3 mb-3 last-child-no-border">
                  <div className="row align-items-center booking-history-row">
                    <div className="col-md-7">
                      <div className="d-flex align-items-start">
                        <div className="me-3" style={{fontSize: '24px'}}>
                          {getTypeIcon(booking.type)}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">{booking.name}</h6>
                          <small className="text-muted">
                            Booking ID: <strong>{booking.bookingRef}</strong> • {booking.date}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 d-flex justify-content-between align-items-center booking-history-action">
                      <div className="booking-history-meta">
                        <h6 className="fw-bold mb-1">₹{booking.amount}</h6>
                        <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <button className="btn btn-sm btn-outline-primary booking-details-button" onClick={() => openDetails(booking)}>Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Summary</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-muted">Total Bookings</small>
                  <strong>{totalBookings}</strong>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-muted">Confirmed</small>
                  <strong>{confirmedBookings}</strong>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-muted">Completed</small>
                  <strong>{completedBookings}</strong>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <small className="text-muted fw-bold">Total Spent</small>
                <h6 className="fw-bold text-primary">₹{totalSpent.toLocaleString()}</h6>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Options</h5>
            </div>
            <div className="card-body">
              <button className="btn btn-outline-primary w-100 mb-2" onClick={downloadAllInvoices}>Download Invoices</button>
              <button className="btn btn-outline-secondary w-100" onClick={clearUserBookings}>Cancel Booking</button>
            </div>
          </div>
        </div>
      </div>
      {selectedBooking && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeDetails}></button>
              </div>
              <div className="modal-body">
                <p><strong>{selectedBooking.name}</strong></p>
                <p>Booking ID: {selectedBooking.bookingRef}</p>
                <p>Date: {selectedBooking.date}</p>
                <p>Amount: ₹{selectedBooking.amount}</p>
                <p>Status: <span className={`badge ${getStatusBadgeClass(selectedBooking.status)}`}>{selectedBooking.status}</span></p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-primary" onClick={() => downloadInvoice(selectedBooking)}>Download Invoice</button>
                <button className="btn btn-danger" onClick={() => cancelBooking(selectedBooking.id)}>Cancel Booking</button>
                <button className="btn btn-secondary" onClick={closeDetails}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
