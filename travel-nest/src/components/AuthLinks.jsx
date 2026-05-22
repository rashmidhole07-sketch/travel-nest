import { Link } from 'react-router-dom'

export default function AuthLinks() {
  return (
    <aside className="auth-links mt-4 mt-md-0">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-3 text-center">
          <h6 className="mb-3">New here?</h6>
          <Link to="/signup" className="btn btn-outline-primary w-100 mb-2">
            Create an account
          </Link>
          <Link to="/forgot-password" className="btn btn-link w-100">
            Forgot password?
          </Link>
        </div>
      </div>
    </aside>
  )
}
