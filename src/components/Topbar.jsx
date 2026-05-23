import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import SearchContext from '../contexts/SearchContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Topbar({ onToggleSidebar }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const auth = useAuth()

  useEffect(() => {
    const handleThemeChange = (event) => {
      setDarkMode(event.detail?.theme === 'dark')
    }

    window.addEventListener('travel-nest-theme-change', handleThemeChange)
    return () => window.removeEventListener('travel-nest-theme-change', handleThemeChange)
  }, [])

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  const handleSearchChange = (event) => {
    const nextQuery = event.target.value
    setSearchError(nextQuery.length > 60 ? 'Search must be 60 characters or less' : '')
    setSearchQuery(nextQuery)
    if (location.pathname !== '/explore-destinations') {
      navigate('/explore-destinations')
    }
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (searchQuery.length > 60) {
      setSearchError('Search must be 60 characters or less')
      return
    }
    if (location.pathname !== '/explore-destinations') {
      navigate('/explore-destinations')
    }
  }

  const handleThemeToggle = () => {
    const nextDarkMode = !darkMode
    const nextTheme = nextDarkMode ? 'dark' : 'light'
    setDarkMode(nextDarkMode)
    document.body.classList.toggle('dark-mode', nextDarkMode)
    localStorage.setItem('theme', nextTheme)
    window.dispatchEvent(new CustomEvent('travel-nest-theme-change', { detail: { theme: nextTheme } }))
  }

  return (
    <header className="topbar d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
      <div className="topbar-title d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary d-lg-none"
          aria-label="Toggle menu"
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list me-1"></i>
          Menu
        </button>
        <div>
          <p className="mb-1 text-muted small">Welcome back,</p>
          <h5 className="mb-0">Explore your next adventure</h5>
        </div>
      </div>
      <div className="topbar-actions d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary topbar-theme-toggle"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Light mode' : 'Dark mode'}
          onClick={handleThemeToggle}
        >
          <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon-stars'}`}></i>
        </button>
        <form onSubmit={handleSearchSubmit} className="topbar-search d-none d-md-flex flex-column align-items-stretch border rounded-pill px-3 py-2 bg-light" noValidate>
          <input
            type="search"
            className={`form-control border-0 bg-transparent p-0 ${searchError ? 'is-invalid' : ''}`}
            placeholder="Search destinations"
            aria-label="Search destinations"
            maxLength="61"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchError && <div className="invalid-feedback d-block">{searchError}</div>}
        </form>
        <div className="d-none d-sm-block text-end position-relative">
          <div className="small text-muted">Account</div>
          <button
            type="button"
            className="btn btn-link p-0 fw-semibold text-dark d-flex align-items-center gap-1"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
          >
            Rashmi D
            <span className="dropdown-icon">▾</span>
          </button>
          <div
            className={`dropdown-menu${menuOpen ? ' show' : ''} mt-2 shadow-sm`}
            style={{ right: 0, left: 'auto', minWidth: '10rem' }}
          >
            <Link to="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <button type="button" className="dropdown-item text-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
