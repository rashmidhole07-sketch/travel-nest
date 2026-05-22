import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../components/Logo.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validate = () => {
    const nextErrors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) nextErrors.email = 'Email is required'
    else if (!emailRe.test(email)) nextErrors.email = 'Enter a valid email'
    if (!newPassword) nextErrors.newPassword = 'New password is required'
    else if (newPassword.length < 6) nextErrors.newPassword = 'Password must be at least 6 characters'
    if (newPassword !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match'

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const normalizedEmail = email.trim().toLowerCase()
    const savedPasswords = JSON.parse(localStorage.getItem('travelNestDemoPasswords') || '{}')
    localStorage.setItem(
      'travelNestDemoPasswords',
      JSON.stringify({
        ...savedPasswords,
        [normalizedEmail]: newPassword,
      })
    )
    setSubmitted(true)
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5 login-card-wrapper">
          <div className="card login-card shadow-lg border-0 overflow-hidden">
            <div className="login-card-main p-4 p-sm-5">
              <div className="text-center mb-4">
                <Logo />
                <h4 className="fw-bold mt-4 mb-1">Change password</h4>
                <p className="text-muted small mb-0">Set a new demo password and use it to login.</p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <div className="auth-input-wrap">
                      <i className="bi bi-envelope"></i>
                      <input
                        type="email"
                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="your@email.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">New Password</label>
                    <div className="auth-input-wrap">
                      <i className="bi bi-lock"></i>
                      <input
                        type="password"
                        className={`form-control form-control-lg ${errors.newPassword ? 'is-invalid' : ''}`}
                        placeholder="Create new password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        required
                      />
                    </div>
                    {errors.newPassword && <div className="invalid-feedback d-block">{errors.newPassword}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <div className="auth-input-wrap">
                      <i className="bi bi-shield-lock"></i>
                      <input
                        type="password"
                        className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                      />
                    </div>
                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold auth-submit">
                    <i className="bi bi-check2-circle me-2"></i>
                    Change Password
                  </button>
                </form>
              ) : (
                <div className="auth-success-box text-center">
                  <div className="auth-success-icon mx-auto mb-3">
                    <i className="bi bi-check2"></i>
                  </div>
                  <h5 className="fw-bold mb-2">Password changed</h5>
                  <p className="text-muted small mb-3">
                    You can now login as <strong>{email}</strong> with your new password.
                  </p>
                  <button type="button" className="btn btn-primary w-100 auth-submit" onClick={() => navigate('/login')}>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Go to Login
                  </button>
                </div>
              )}

              <div className="text-center mt-3">
                <Link to="/login" className="fw-semibold text-decoration-none">
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
