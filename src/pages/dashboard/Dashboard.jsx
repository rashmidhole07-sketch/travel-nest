import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Dashboard() {
  const [upcomingTrips] = useState([
    { id: 1, name: 'Golden Triangle', destination: 'Delhi - Agra - Jaipur', date: '2026-06-15', days: 5, status: 'Upcoming', completion: 82 },
    { id: 2, name: 'Kerala Retreat', destination: 'Kochi - Alleppey - Munnar', date: '2026-07-20', days: 10, status: 'Planning', completion: 58 },
    { id: 3, name: 'Goa Beach Break', destination: 'North Goa - Panaji', date: '2026-08-12', days: 4, status: 'Draft', completion: 35 }
  ])

  const [budgetSummary] = useState({
    total: 350000,
    spent: 145000,
    remaining: 205000
  })

  const [budgetCategories] = useState([
    { name: 'Hotels', budget: 120000, spent: 52000, color: 'primary', icon: 'bi-building' },
    { name: 'Transport', budget: 90000, spent: 41000, color: 'info', icon: 'bi-train-front' },
    { name: 'Food', budget: 60000, spent: 28000, color: 'warning', icon: 'bi-cup-hot' },
    { name: 'Activities', budget: 80000, spent: 24000, color: 'success', icon: 'bi-compass' }
  ])

  const [todayAgenda] = useState([
    { time: '09:00 AM', task: 'Confirm Jaipur hotel check-in details', tag: 'Booking', icon: 'bi-calendar-check' },
    { time: '11:30 AM', task: 'Compare Delhi to Agra transport options', tag: 'Transport', icon: 'bi-truck-front' },
    { time: '04:00 PM', task: 'Finalize Taj Mahal sunrise slot', tag: 'Activity', icon: 'bi-ticket-perforated' }
  ])

  const [planningTasks] = useState([
    { title: 'Flights booked', done: true, icon: 'bi-airplane' },
    { title: 'Hotels shortlisted', done: true, icon: 'bi-building-check' },
    { title: 'Daily itinerary ready', done: false, icon: 'bi-map' },
    { title: 'Emergency documents uploaded', done: false, icon: 'bi-file-earmark-lock' }
  ])

  const [travelInsights] = useState([
    { label: 'Best value destination', value: 'Goa Beach Break', note: '48% budget still available', icon: 'bi-graph-up-arrow' },
    { label: 'Highest trip readiness', value: 'Golden Triangle', note: '82% planning completed', icon: 'bi-check2-circle' },
    { label: 'Top spending area', value: 'Hotels', note: 'Rs. 52,000 spent so far', icon: 'bi-wallet2' }
  ])

  return (
    <div className="container-fluid p-4 dashboard-page">
      <div className="dashboard-hero d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <span className="dashboard-kicker"><i className="bi bi-stars"></i> Travel command center</span>
          <h1 className="fw-bold mb-1">Dashboard</h1>
          <p className="mb-0">Plan trips, track budgets, and review travel activity in one place.</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/create-trip" className="btn btn-light dashboard-hero-action">
            <i className="bi bi-plus-circle"></i> Create Trip
          </Link>
          <Link to="/budget-planner" className="btn btn-outline-light dashboard-hero-action">
            <i className="bi bi-wallet2"></i> Budget Planner
          </Link>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body">
              <div className="dashboard-stat-icon stat-blue"><i className="bi bi-cash-stack"></i></div>
              <h6 className="card-title text-muted">Total Budget</h6>
              <h2 className="text-primary fw-bold">Rs. {budgetSummary.total.toLocaleString('en-IN')}</h2>
              <small className="text-muted">Total trip budget</small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body">
              <div className="dashboard-stat-icon stat-red"><i className="bi bi-credit-card"></i></div>
              <h6 className="card-title text-muted">Already Spent</h6>
              <h2 className="text-danger fw-bold">Rs. {budgetSummary.spent.toLocaleString('en-IN')}</h2>
              <small className="text-muted">{Math.round(budgetSummary.spent / budgetSummary.total * 100)}% of budget</small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body">
              <div className="dashboard-stat-icon stat-green"><i className="bi bi-piggy-bank"></i></div>
              <h6 className="card-title text-muted">Remaining</h6>
              <h2 className="text-success fw-bold">Rs. {budgetSummary.remaining.toLocaleString('en-IN')}</h2>
              <small className="text-muted">Available to spend</small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body">
              <div className="dashboard-stat-icon stat-cyan"><i className="bi bi-luggage"></i></div>
              <h6 className="card-title text-muted">Active Trips</h6>
              <h2 className="text-info fw-bold">{upcomingTrips.length}</h2>
              <small className="text-muted">Across planning stages</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-map text-primary me-2"></i>Upcoming Trips</h5>
            </div>
            <div className="card-body">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="dashboard-trip-row pb-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <div className="d-flex gap-3">
                      <div className="dashboard-trip-icon"><i className="bi bi-geo-alt"></i></div>
                      <div>
                      <h6 className="fw-bold mb-1">{trip.name}</h6>
                      <small className="text-muted d-block">{trip.destination}</small>
                      <small className="text-muted">{trip.date} - {trip.days} days</small>
                      </div>
                    </div>
                    <span className={`badge ${trip.status === 'Upcoming' ? 'bg-info' : trip.status === 'Planning' ? 'bg-warning' : 'bg-secondary'}`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted">Planning progress</small>
                    <small className="fw-semibold">{trip.completion}%</small>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar" style={{ width: `${trip.completion}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-clock-history text-primary me-2"></i>Today&apos;s Agenda</h5>
            </div>
            <div className="card-body">
              {todayAgenda.map((item) => (
                <div key={`${item.time}-${item.task}`} className="dashboard-agenda-item d-flex gap-3 mb-3">
                  <div className="dashboard-agenda-icon"><i className={`bi ${item.icon}`}></i></div>
                  <div>
                    <small className="text-primary fw-bold d-block mb-1">{item.time}</small>
                    <p className="fw-semibold mb-1">{item.task}</p>
                    <span className="badge bg-primary-subtle text-primary">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-7 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold"><i className="bi bi-bar-chart-line text-primary me-2"></i>Budget by Category</h5>
              <Link to="/expense-analytics" className="btn btn-sm btn-outline-primary">
                <i className="bi bi-activity me-1"></i>View Analytics
              </Link>
            </div>
            <div className="card-body">
              {budgetCategories.map((item) => {
                const percentage = Math.round((item.spent / item.budget) * 100)
                return (
                  <div key={item.name} className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="d-flex gap-3">
                        <div className={`dashboard-category-icon text-${item.color}`}>
                          <i className={`bi ${item.icon}`}></i>
                        </div>
                        <div>
                        <h6 className="fw-bold mb-0">{item.name}</h6>
                        <small className="text-muted">
                          Rs. {item.spent.toLocaleString('en-IN')} spent of Rs. {item.budget.toLocaleString('en-IN')}
                        </small>
                        </div>
                      </div>
                      <span className={`badge bg-${item.color}`}>{percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div className={`progress-bar bg-${item.color}`} style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-5 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-ui-checks-grid text-primary me-2"></i>Planning Checklist</h5>
            </div>
            <div className="card-body">
              {planningTasks.map((task) => (
                <div key={task.title} className="d-flex align-items-center justify-content-between border-bottom py-3">
                  <span className="fw-semibold"><i className={`bi ${task.icon} text-primary me-2`}></i>{task.title}</span>
                  <span className={`badge ${task.done ? 'bg-success' : 'bg-light text-dark'}`}>
                    {task.done ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
              <Link to="/travel-checklist" className="btn btn-primary w-100 mt-4">
                <i className="bi bi-list-check me-2"></i>Open Full Checklist
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-graph-up text-primary me-2"></i>Travel Analytics</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {travelInsights.map((insight) => (
                  <div key={insight.label} className="col-md-4 mb-3">
                    <div className="dashboard-insight-card p-3 h-100">
                      <div className="dashboard-insight-icon"><i className={`bi ${insight.icon}`}></i></div>
                      <small className="text-muted fw-semibold">{insight.label}</small>
                      <h6 className="fw-bold mt-2 mb-1">{insight.value}</h6>
                      <small className="text-muted">{insight.note}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">Overall travel readiness</span>
                  <span className="fw-bold text-success">68%</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div className="progress-bar bg-success" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100 dashboard-weather-card">
            <div className="card-header border-0 py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-cloud-sun me-2"></i>Destination Weather</h5>
            </div>
            <div className="card-body text-center">
              <div className="dashboard-weather-icon mx-auto mb-3">
                <i className="bi bi-brightness-high"></i>
              </div>
              <p className="display-4 mb-2 fw-bold">28 C</p>
              <h6>Partly Cloudy</h6>
              <p className="text-muted mb-1">Jaipur, Rajasthan</p>
              <div className="dashboard-weather-meta mt-4">
                <span><i className="bi bi-droplet"></i> Humidity 62%</span>
                <span><i className="bi bi-sunset"></i> Best after 4 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
