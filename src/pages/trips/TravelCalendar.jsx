import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function TravelCalendar() {
  const [currentMonth, setCurrentMonth] = useState(5) // June
  const [currentYear, setCurrentYear] = useState(2026)

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December']

  const events = {
    15: 'Jaipur Tour Start',
    20: 'Jaipur Tour End',
    25: 'Goa Prep'
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
      return
    }
    setCurrentMonth(currentMonth - 1)
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
      return
    }
    setCurrentMonth(currentMonth + 1)
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">🗓️ Travel Calendar</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm travel-calendar-card">
            <div className="card-header bg-white border-0 py-3">
              <div className="travel-calendar-header">
                <button className="btn btn-sm btn-outline-secondary calendar-nav-button" onClick={goToPreviousMonth}>
                  <span className="calendar-nav-full">← Previous</span>
                  <span className="calendar-nav-short">←</span>
                </button>
                <h5 className="mb-0 fw-bold calendar-month-title">{monthName[currentMonth]} {currentYear}</h5>
                <button className="btn btn-sm btn-outline-secondary calendar-nav-button" onClick={goToNextMonth}>
                  <span className="calendar-nav-full">Next →</span>
                  <span className="calendar-nav-short">→</span>
                </button>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="table-responsive travel-calendar-table-wrap">
                <table className="table table-borderless travel-calendar-table">
                  <thead>
                    <tr className="text-center">
                      <th className="text-muted">Sun</th>
                      <th className="text-muted">Mon</th>
                      <th className="text-muted">Tue</th>
                      <th className="text-muted">Wed</th>
                      <th className="text-muted">Thu</th>
                      <th className="text-muted">Fri</th>
                      <th className="text-muted">Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
                      <tr key={weekIndex} className="text-center">
                        {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                          <td key={dayIndex} className="travel-calendar-day-cell">
                            {day ? (
                              <div className={`travel-calendar-day-box rounded ${events[day] ? 'bg-primary text-white has-event' : 'bg-light'}`}>
                                <strong>{day}</strong>
                                {events[day] && <div className="small mt-1 travel-calendar-event-label">{events[day]}</div>}
                              </div>
                            ) : (
                              <div className="travel-calendar-day-box bg-light rounded"></div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 travel-calendar-events">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">📌 Upcoming Events</h5>
            </div>
            <div className="card-body">
              {Object.entries(events).map(([day, event]) => (
                <div key={day} className="border-bottom pb-3 mb-3 last-child-no-border">
                  <p className="mb-1"><strong>{monthName[currentMonth]} {day}, {currentYear}</strong></p>
                  <p className="text-muted small mb-0">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
