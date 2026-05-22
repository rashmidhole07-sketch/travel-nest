import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../components/Logo.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const errs = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.name) errs.name = 'Full name is required'
    if (!formData.email) errs.email = 'Email is required'
    else if (!emailRe.test(formData.email)) errs.email = 'Enter a valid email'
    if (!formData.password) errs.password = 'Password is required'
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    if (Object.keys(errs).length > 0) return
    // TODO: Add signup logic (call API)
    navigate('/dashboard')
  }

  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }))
  const isValid = Object.keys(validate()).length === 0
  const togglePassword = () => setShowPassword((s) => !s)

  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <Logo tagline={false} />
                </div>
                <h5 className="text-center text-muted mb-4">Create Your Account</h5>
                
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className={`form-control form-control-lg ${touched.name && errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur('name')}
                      required
                    />
                    {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      className={`form-control form-control-lg ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur('email')}
                      required
                    />
                    {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        name="password"
                        className={`form-control form-control-lg ${touched.password && errors.password ? 'is-invalid' : ''}`} 
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur('password')}
                        required
                      />
                      <button type="button" className="btn btn-outline-secondary" onClick={togglePassword} tabIndex={-1}>
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {touched.password && errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      className={`form-control form-control-lg ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur('confirmPassword')}
                      required
                    />
                    {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold" disabled={!isValid}>
                    Sign Up
                  </button>
                </form>

                <hr className="my-4" />
                
                <p className="text-center text-muted">
                  Already have an account? <Link to="/login" className="text-primary fw-semibold">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
