import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100 p-3">
      <Outlet />
    </div>
  )
}
