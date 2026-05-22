import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoritesContext from '../../contexts/FavoritesContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const darkModeStyles = `
  body.dark-mode {
    background-color: #111827;
    color: #e5e7eb;
  }

  body.dark-mode .app-main,
  body.dark-mode .bg-light {
    background-color: #111827 !important;
  }

  body.dark-mode .topbar,
  body.dark-mode .sidebar,
  body.dark-mode .app-footer,
  body.dark-mode .bg-white {
    background-color: #182235 !important;
    border-color: #2f3b52 !important;
    color: #e5e7eb;
  }

  body.dark-mode .sidebar-brand,
  body.dark-mode .card-header {
    background: linear-gradient(135deg, rgba(96, 165, 250, 0.12), rgba(45, 212, 191, 0.08)) !important;
    border-color: #2f3b52 !important;
    color: #e5e7eb;
  }

  body.dark-mode .card,
  body.dark-mode .modal-content,
  body.dark-mode .dropdown-menu {
    background: #182235 !important;
    border-color: #2f3b52 !important;
    color: #e5e7eb;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28) !important;
  }

  body.dark-mode h1,
  body.dark-mode h2,
  body.dark-mode h3,
  body.dark-mode h4,
  body.dark-mode h5,
  body.dark-mode h6,
  body.dark-mode p,
  body.dark-mode label,
  body.dark-mode strong,
  body.dark-mode .fw-bold,
  body.dark-mode .fw-semibold,
  body.dark-mode .text-dark {
    color: #f8fafc !important;
  }

  body.dark-mode .list-group-item,
  body.dark-mode .dropdown-item {
    background-color: transparent;
    color: #e5e7eb !important;
  }

  body.dark-mode .list-group-item:hover,
  body.dark-mode .dropdown-item:hover {
    background-color: rgba(96, 165, 250, 0.12);
  }

  body.dark-mode .form-control,
  body.dark-mode .form-select {
    background-color: #111827;
    color: #f8fafc;
    border-color: #3b4860;
  }

  body.dark-mode .form-control:focus,
  body.dark-mode .form-select:focus {
    background-color: #111827;
    color: #f8fafc;
    border-color: #60a5fa;
    box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.16);
  }

  body.dark-mode .form-control::placeholder {
    color: #94a3b8;
  }

  body.dark-mode .form-check-label {
    color: #e5e7eb;
  }

  body.dark-mode .form-check-input {
    background-color: #111827;
    border-color: #64748b;
  }

  body.dark-mode .form-check-input:checked {
    background-color: #60a5fa;
    border-color: #60a5fa;
  }

  body.dark-mode .btn-outline-primary {
    color: #93c5fd;
    border-color: #60a5fa;
  }

  body.dark-mode .btn-outline-primary:hover {
    background-color: #2563eb;
    color: #fff !important;
  }

  body.dark-mode .btn-outline-danger {
    color: #fca5a5;
    border-color: #ef4444;
  }

  body.dark-mode .btn-outline-danger:hover {
    background-color: #dc2626;
    color: #fff !important;
  }

  body.dark-mode .btn-outline-secondary {
    color: #cbd5e1;
    border-color: #64748b;
  }

  body.dark-mode .btn-outline-secondary:hover {
    background-color: #475569;
    color: #fff !important;
  }

  body.dark-mode .text-muted {
    color: #a8b3c5 !important;
  }

  body.dark-mode .border-bottom,
  body.dark-mode .border-top {
    border-color: #2f3b52 !important;
  }

  body.dark-mode .progress {
    background-color: #263247;
  }

  body.dark-mode .toast {
    background-color: #182235;
    color: #e5e7eb;
    border-color: #2f3b52;
  }

  body.dark-mode .toast-header {
    background-color: #111827;
    color: #f8fafc;
    border-color: #2f3b52;
  }

  body.dark-mode .modal-header,
  body.dark-mode .modal-footer {
    border-color: #2f3b52;
  }

  body.dark-mode .btn-close {
    filter: invert(1) grayscale(100%) brightness(200%);
  }
`

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: localStorage.getItem('theme') === 'dark',
    currency: 'INR - Indian Rupee',
    language: 'English',
    privacyPublic: false
  })

  const navigate = useNavigate()
  const { favorites } = useContext(FavoritesContext)

  const [currentEmail, setCurrentEmail] = useState('rash@example.com')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [emailForm, setEmailForm] = useState({ email: '' })
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [emailErrors, setEmailErrors] = useState({})
  const [passwordErrors, setPasswordErrors] = useState({})

  const validateEmailForm = () => {
    const nextErrors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailForm.email.trim()) nextErrors.email = 'Email is required'
    else if (!emailRe.test(emailForm.email)) nextErrors.email = 'Enter a valid email'
    else if (emailForm.email.trim().toLowerCase() === currentEmail.toLowerCase()) {
      nextErrors.email = 'Enter a different email address'
    }

    return nextErrors
  }

  const validatePasswordForm = () => {
    const nextErrors = {}

    if (!passwordForm.oldPassword) nextErrors.oldPassword = 'Current password is required'
    else if (passwordForm.oldPassword.length < 6) nextErrors.oldPassword = 'Current password must be at least 6 characters'
    if (!passwordForm.newPassword) nextErrors.newPassword = 'New password is required'
    else if (passwordForm.newPassword.length < 6) nextErrors.newPassword = 'New password must be at least 6 characters'
    else if (passwordForm.newPassword === passwordForm.oldPassword) nextErrors.newPassword = 'New password must be different'
    if (!passwordForm.confirmPassword) nextErrors.confirmPassword = 'Confirm your new password'
    else if (passwordForm.newPassword !== passwordForm.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match'

    return nextErrors
  }

  useEffect(() => {
    if (!document.getElementById('dark-mode-styles')) {
      const styleElement = document.createElement('style')
      styleElement.id = 'dark-mode-styles'
      styleElement.innerHTML = darkModeStyles
      document.head.appendChild(styleElement)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', settings.darkMode)
    localStorage.setItem('theme', settings.darkMode ? 'dark' : 'light')
    window.dispatchEvent(new CustomEvent('travel-nest-theme-change', { detail: { theme: settings.darkMode ? 'dark' : 'light' } }))
  }, [settings.darkMode])

  useEffect(() => {
    const handleThemeChange = (event) => {
      setSettings((currentSettings) => ({
        ...currentSettings,
        darkMode: event.detail?.theme === 'dark',
      }))
    }

    window.addEventListener('travel-nest-theme-change', handleThemeChange)
    return () => window.removeEventListener('travel-nest-theme-change', handleThemeChange)
  }, [])

  const handleToggle = (setting) => {
    setSettings({...settings, [setting]: !settings[setting]})
  }

  const handleChange = (setting, value) => {
    setSettings({...settings, [setting]: value})
  }

  const handleOpenEmail = () => {
    setEmailForm({ email: currentEmail })
    setEmailErrors({})
    setShowEmailModal(true)
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    const nextErrors = validateEmailForm()
    setEmailErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setCurrentEmail(emailForm.email.trim())
    setShowEmailModal(false)
    alert('Email updated')
  }

  const handleOpenPassword = () => {
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    setPasswordErrors({})
    setShowPasswordModal(true)
  }

  const handleSubmitPassword = (e) => {
    e.preventDefault()
    const nextErrors = validatePasswordForm()
    setPasswordErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setShowPasswordModal(false)
    alert('Password changed successfully')
  }

  const handleLogout = () => {
    // simulate logout
    navigate('/login')
  }

  const handleDownloadData = () => {
    const data = {
      settings,
      favorites
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'travel-nest-data.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleConfirmDelete = () => {
    // simulate account deletion: clear localStorage and navigate to signup/login
    localStorage.removeItem('theme')
    localStorage.removeItem('favorites')
    setShowDeleteModal(false)
    alert('Account deleted (simulated)')
    navigate('/signup')
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">⚙️ Settings</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">🔔 Notifications</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <div>
                  <h6 className="fw-bold mb-1">Email Notifications</h6>
                  <small className="text-muted">Receive booking confirmations and trip reminders</small>
                </div>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                    style={{width: '50px', height: '25px'}}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center pb-3">
                <div>
                  <h6 className="fw-bold mb-1">Push Notifications</h6>
                  <small className="text-muted">Get instant alerts on your device</small>
                </div>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={settings.pushNotifications}
                    onChange={() => handleToggle('pushNotifications')}
                    style={{width: '50px', height: '25px'}}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">🎨 Appearance</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label fw-semibold">Theme</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="theme" 
                      value="light"
                      checked={!settings.darkMode}
                      onChange={() => handleChange('darkMode', false)}
                    />
                    <label className="form-check-label">Light Mode</label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="theme" 
                      value="dark"
                      checked={settings.darkMode}
                      onChange={() => handleChange('darkMode', true)}
                    />
                    <label className="form-check-label">Dark Mode</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">🌐 Preferences</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label fw-semibold">Currency</label>
                <select 
                  className="form-select"
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                >
                  <option>INR - Indian Rupee</option>
                  <option>SGD - Singapore Dollar</option>
                  <option>AED - UAE Dirham</option>
                  <option>CNY - Chinese Yuan</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Language</label>
                <select 
                  className="form-select"
                  value={settings.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">🔒 Privacy</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <div>
                  <h6 className="fw-bold mb-1">Public Profile</h6>
                  <small className="text-muted">Allow others to see your trips and reviews</small>
                </div>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={settings.privacyPublic}
                    onChange={() => handleToggle('privacyPublic')}
                    style={{width: '50px', height: '25px'}}
                  />
                </div>
              </div>

              <button className="btn btn-outline-secondary me-2" onClick={handleDownloadData}>Download My Data</button>
              <button className="btn btn-outline-danger" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">💾 Storage</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <small className="fw-semibold">Used Space</small>
                  <small className="fw-semibold">2.5 GB / 15 GB</small>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{width: '16.7%'}}></div>
                </div>
              </div>
              <button className="btn btn-outline-primary">Clear Cache</button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Account</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <small className="text-muted">Current Email</small>
                <p className="fw-bold">{currentEmail}</p>
              </div>
              <button className="btn btn-outline-primary w-100 mb-2" onClick={handleOpenEmail}>Change Email</button>
              <button className="btn btn-outline-primary w-100 mb-2" onClick={handleOpenPassword}>Change Password</button>
              <button className="btn btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Email Modal */}
      {showEmailModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmitEmail} noValidate>
              <div className="modal-header">
                <h5 className="modal-title">Change Email</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEmailModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">New Email</label>
                <input
                  type="email"
                  className={`form-control ${emailErrors.email ? 'is-invalid' : ''}`}
                  value={emailForm.email}
                  onChange={(e) => {
                    setEmailForm({ email: e.target.value })
                    if (emailErrors.email) setEmailErrors({})
                  }}
                  required
                />
                {emailErrors.email && <div className="invalid-feedback">{emailErrors.email}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEmailModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmitPassword} noValidate>
              <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowPasswordModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Old Password</label>
                <input
                  type="password"
                  className={`form-control ${passwordErrors.oldPassword ? 'is-invalid' : ''}`}
                  value={passwordForm.oldPassword}
                  onChange={(e) => {
                    setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
                    if (passwordErrors.oldPassword) setPasswordErrors((current) => ({ ...current, oldPassword: '' }))
                  }}
                  required
                />
                {passwordErrors.oldPassword && <div className="invalid-feedback mb-2">{passwordErrors.oldPassword}</div>}
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className={`form-control ${passwordErrors.newPassword ? 'is-invalid' : ''}`}
                  value={passwordForm.newPassword}
                  onChange={(e) => {
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    if (passwordErrors.newPassword) setPasswordErrors((current) => ({ ...current, newPassword: '' }))
                  }}
                  required
                />
                {passwordErrors.newPassword && <div className="invalid-feedback mb-2">{passwordErrors.newPassword}</div>}
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className={`form-control ${passwordErrors.confirmPassword ? 'is-invalid' : ''}`}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => {
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    if (passwordErrors.confirmPassword) setPasswordErrors((current) => ({ ...current, confirmPassword: '' }))
                  }}
                  required
                />
                {passwordErrors.confirmPassword && <div className="invalid-feedback">{passwordErrors.confirmPassword}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Change Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirm Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Account</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
