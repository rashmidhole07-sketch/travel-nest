import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../components/Logo.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const navigate = useNavigate()

  const demoCredentials = {
    email: 'demo@travelnest.com',
    password: 'Demo1234'
  }

  const getStoredPassword = (loginEmail) => {
    const savedPasswords = JSON.parse(localStorage.getItem('travelNestDemoPasswords') || '{}')
    return savedPasswords[loginEmail.trim().toLowerCase()]
  }

  const validate = () => {
    const errs = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) errs.email = 'Email is required'
    else if (!emailRe.test(email)) errs.email = 'Enter a valid email'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    setTouched({ email: true, password: true })
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    setFormError('')

    const normalizedEmail = email.trim().toLowerCase()
    const storedPassword = getStoredPassword(normalizedEmail)
    const canUseDemoLogin = normalizedEmail === demoCredentials.email && password === demoCredentials.password
    const canUseChangedPassword = storedPassword && password === storedPassword

    if (canUseDemoLogin || canUseChangedPassword) {
      navigate('/dashboard')
      setLoading(false)
      return
    }

    const API_BASE = import.meta.env.VITE_API_BASE || ''
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.message || 'Login failed')
        // TODO: persist token/session as needed
        navigate('/dashboard')
      })
      .catch((err) => {
        setFormError(err.message || 'Login failed')
      })
      .finally(() => setLoading(false))
  }

  const isValid = Object.keys(validate()).length === 0

  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }))

  const togglePassword = () => setShowPassword((s) => !s)

  const useDemoCredentials = () => {
    setEmail(demoCredentials.email)
    setPassword(demoCredentials.password)
    setErrors({})
    setTouched({})
    setFormError('')
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5 login-card-wrapper">
          <div className="card login-card shadow-lg border-0 overflow-hidden">
            <div className="login-card-main p-4 p-sm-5">
              <div className="text-center mb-4">
                <Logo />
                <h4 className="fw-bold mt-4 mb-1">Welcome back</h4>
                <p className="text-muted small mb-0">Sign in to continue planning your trips.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <div className="auth-input-wrap">
                    <i className="bi bi-envelope"></i>
                    <input 
                      type="email" 
                      className={`form-control form-control-lg ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleBlur('email')}
                      required
                    />
                  </div>
                  {touched.email && errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="auth-input-wrap">
                    <i className="bi bi-lock"></i>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      className={`form-control form-control-lg ${touched.password && errors.password ? 'is-invalid' : ''}`} 
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handleBlur('password')}
                      required
                    />
                    <button type="button" className="auth-password-toggle" onClick={togglePassword} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                  {touched.password && errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>
                  <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold auth-submit" disabled={!isValid || loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      Signing in
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </>
                  )}
                </button>
                {formError && <div className="alert alert-danger mt-3" role="alert">{formError}</div>}
              </form>

              <button type="button" className="btn btn-light w-100 mt-3 auth-demo-btn" onClick={useDemoCredentials}>
                <i className="bi bi-magic me-2"></i>Use demo login
              </button>

              <div className="text-center mt-3">
                <span className="text-muted small">New here? </span>
                <Link to="/signup" className="fw-semibold text-decoration-none">Create account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
