import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function AuthLayout() {
  const { initialized, isAuthenticated } = useAuth()
  if (!initialized) return null
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100 p-3">
      <Outlet />
    </div>
  )
}
