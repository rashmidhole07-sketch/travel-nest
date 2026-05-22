import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

const sections = [
  {
    title: 'Dashboard',
    items: [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/profile', label: 'Profile' },
    ],
  },
  {
    title: 'Trip Planning',
    items: [
      { to: '/create-trip', label: 'Create Trip' },
      { to: '/my-trips', label: 'My Trips' },
      { to: '/trip-details/1', label: 'Trip Details', matchPrefix: '/trip-details' },
      { to: '/travel-calendar', label: 'Travel Calendar' },
    ],
  },
  {
    title: 'Booking',
    items: [
      { to: '/hotel-booking', label: 'Hotel Booking' },
      { to: '/transport-booking', label: 'Transport Booking' },
      { to: '/booking-history', label: 'Booking History' },
    ],
  },
  {
    title: 'Expenses',
    items: [
      { to: '/expense-tracker', label: 'Expense Tracker' },
      { to: '/budget-planner', label: 'Budget Planner' },
      { to: '/expense-analytics', label: 'Expense Analytics' },
    ],
  },
  {
    title: 'Destinations',
    items: [
      { to: '/explore-destinations', label: 'Explore Destinations' },
      { to: '/destination-details/1', label: 'Destination Details', matchPrefix: '/destination-details' },
      { to: '/favorite-places', label: 'Favorite Places' },
    ],
  },
  {
    title: 'Utilities',
    items: [
      { to: '/travel-checklist', label: 'Travel Checklist' },
      { to: '/notes-journal', label: 'Notes & Journal' },
      { to: '/notifications', label: 'Notifications' },
      { to: '/settings', label: 'Settings' },
    ],
  },
]

export default function Sidebar({ show = true, onNavigate }) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <aside className={`sidebar bg-white shadow-sm ${show ? 'show' : ''}`}>
      <div className="sidebar-brand px-4 border-bottom">
        <Logo />
      </div>
      <nav className="sidebar-nav p-3">
        {sections.map((section) => (
          <div key={section.title} className="sidebar-section mb-4">
            <h6 className="sidebar-section-title text-uppercase text-secondary mb-3">
              {section.title}
            </h6>
            <div className="list-group list-group-flush">
              {section.items.map((item) => {
                const active = item.matchPrefix
                  ? currentPath.startsWith(item.matchPrefix)
                  : currentPath === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    className={`list-group-item list-group-item-action py-2 px-3 ${
                      active ? 'active' : 'text-dark'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
