import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import Footer from '../components/Footer.jsx'
import SearchContext from '../contexts/SearchContext.jsx'
import FavoritesContext from '../contexts/FavoritesContext.jsx'

const defaultFavorites = []

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(defaultFavorites)
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setShowSidebar(true)
      else setShowSidebar(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setShowSidebar((s) => !s)
  const closeSidebar = () => {
    if (window.innerWidth < 992) setShowSidebar(false)
  }

  const addFavorite = (place) => {
    setFavorites((current) => {
      if (current.some((item) => item.id === place.id)) return current
      const next = [...current, { ...place, visited: false }]
      // show toast notification
      setToast({ show: true, message: `${place.name} added to favorites` })
      // auto-hide after 3s
      setTimeout(() => setToast({ show: false, message: '' }), 3000)
      return next
    })
  }

  const removeFavorite = (id) => {
    setFavorites((current) => current.filter((item) => item.id !== id))
  }

  const toggleVisited = (id) => {
    setFavorites((current) =>
      current.map((item) =>
        item.id === id ? { ...item, visited: !item.visited } : item
      )
    )
  }

  const isFavorite = (id) => favorites.some((item) => item.id === id)

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleVisited, isFavorite }}>
        <div className="app-layout d-flex flex-column flex-lg-row min-vh-100">
          <Sidebar show={showSidebar} onNavigate={closeSidebar} />
          {showSidebar && (
            <button
              type="button"
              className="sidebar-overlay d-lg-none"
              aria-label="Close menu"
              onClick={closeSidebar}
            />
          )}
          <div className="app-main d-flex flex-column flex-grow-1 bg-light">
            <Topbar onToggleSidebar={toggleSidebar} />
            {/* Toast container */}
            <div aria-live="polite" aria-atomic="true" className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
              <div className={`toast ${toast.show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">Favorites</strong>
                  <small className="text-muted">now</small>
                  <button type="button" className="btn-close ms-2 mb-1" aria-label="Close" onClick={() => setToast({ show: false, message: '' })}></button>
                </div>
                <div className="toast-body">{toast.message}</div>
              </div>
            </div>
            <main className="app-content flex-grow-1 p-4">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </FavoritesContext.Provider>
    </SearchContext.Provider>
  )
}
