import { createContext, useState, useEffect, useContext } from 'react'

const STORAGE_KEY = 'travelNestAuth'

const AuthContext = createContext()

const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { isAuthenticated: false, user: null, token: null }
  } catch (e) {
    return { isAuthenticated: false, user: null, token: null }
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth)
  const [initialized, setInitialized] = useState(true)

  useEffect(() => {
    if (!initialized) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
    } catch (e) {
      // ignore
    }
  }, [auth, initialized])

  const login = ({ user = null, token = null } = {}) => setAuth({ isAuthenticated: true, user, token })
  const logout = () => setAuth({ isAuthenticated: false, user: null, token: null })

  return (
    <AuthContext.Provider value={{ ...auth, initialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
