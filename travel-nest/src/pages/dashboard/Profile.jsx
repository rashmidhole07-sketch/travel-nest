import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Rashmi D',
    email: 'rashmi.d@example.com',
    phone: '+91 9686699672',
    country: 'India',
    bio: 'Travel enthusiast and adventure seeker'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [profileDraft, setProfileDraft] = useState(profile)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = () => {
    const nextErrors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRe = /^[+\d][\d\s-]{7,18}$/

    if (!profileDraft.name.trim()) nextErrors.name = 'Full name is required'
    if (!profileDraft.email.trim()) nextErrors.email = 'Email is required'
    else if (!emailRe.test(profileDraft.email)) nextErrors.email = 'Enter a valid email'
    if (!profileDraft.phone.trim()) nextErrors.phone = 'Phone number is required'
    else if (!phoneRe.test(profileDraft.phone.trim())) nextErrors.phone = 'Enter a valid phone number'
    if (!profileDraft.country.trim()) nextErrors.country = 'Country is required'
    if (profileDraft.bio.length > 160) nextErrors.bio = 'Bio must be 160 characters or less'

    return nextErrors
  }

  const handleEdit = () => {
    setProfileDraft(profile)
    setErrors({})
    setTouched({})
    setIsEditing(true)
  }

  const handleCancel = () => {
    setProfileDraft(profile)
    setErrors({})
    setTouched({})
    setIsEditing(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setProfileDraft((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true, country: true, bio: true })
    if (Object.keys(nextErrors).length > 0) return

    setProfile(profileDraft)
    setIsEditing(false)
  }

  const handleBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validate())
  }

  return (
    <div className="container-fluid p-4">
      <div style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(255, 138, 101, 0.08))', padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem'}}>
        <h1 className="mb-2 fw-bold" style={{color: '#1f2430'}}>👤 User Profile</h1>
        <p className="mb-0" style={{color: '#6c757d'}}>Manage your personal information and preferences</p>
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
            <div className="card-body p-5 profile-summary">
              <div style={{width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #3366ff, #ff8a65)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white', fontSize: '3rem'}}>
                👤
              </div>
              <h5 className="fw-bold mb-1" style={{color: '#1f2430'}}>{profile.name}</h5>
              <p className="text-muted small mb-2">{profile.email}</p>
              <p className="text-muted small mb-0">📍 {profile.country}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card border-0 shadow" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
            <div className="card-header bg-transparent border-0 py-3 d-flex justify-content-between align-items-center" style={{borderBottom: '1px solid rgba(18, 45, 78, 0.06)'}}>
              <h5 className="mb-0 fw-bold" style={{color: '#1f2430'}}>📋 Profile Information</h5>
              <button 
                className={`btn btn-sm fw-semibold ${isEditing ? 'btn-danger' : 'btn-primary'}`}
                onClick={isEditing ? handleCancel : handleEdit}
                style={{borderRadius: '0.5rem', padding: '0.5rem 1rem'}}
              >
                {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
              </button>
            </div>
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{color: '#1f2430'}}>👤 Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                      value={profileDraft.name}
                      onChange={handleChange}
                      onBlur={handleBlur('name')}
                      style={{borderRadius: '0.75rem', fontWeight: '500'}}
                    />
                    {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{color: '#1f2430'}}>✉️ Email</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      value={profileDraft.email}
                      onChange={handleChange}
                      onBlur={handleBlur('email')}
                      style={{borderRadius: '0.75rem', fontWeight: '500'}}
                    />
                    {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{color: '#1f2430'}}>📱 Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                      value={profileDraft.phone}
                      onChange={handleChange}
                      onBlur={handleBlur('phone')}
                      style={{borderRadius: '0.75rem', fontWeight: '500'}}
                    />
                    {touched.phone && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{color: '#1f2430'}}>🌍 Country</label>
                    <input
                      type="text"
                      name="country"
                      className={`form-control ${touched.country && errors.country ? 'is-invalid' : ''}`}
                      value={profileDraft.country}
                      onChange={handleChange}
                      onBlur={handleBlur('country')}
                      style={{borderRadius: '0.75rem', fontWeight: '500'}}
                    />
                    {touched.country && errors.country && <div className="invalid-feedback">{errors.country}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{color: '#1f2430'}}>✨ Bio</label>
                    <textarea
                      name="bio"
                      className={`form-control ${touched.bio && errors.bio ? 'is-invalid' : ''}`}
                      rows="3"
                      value={profileDraft.bio}
                      onChange={handleChange}
                      onBlur={handleBlur('bio')}
                      style={{borderRadius: '0.75rem', fontWeight: '500'}}
                    />
                    {touched.bio && errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-semibold" style={{borderRadius: '0.75rem', padding: '0.75rem'}}>💾 Save Changes</button>
                </form>
              ) : (
                <div>
                  <div className="mb-3 p-3" style={{background: 'rgba(51, 102, 255, 0.05)', borderRadius: '0.75rem', borderLeft: '3px solid #3366ff'}}>
                    <label className="form-label fw-semibold text-muted small">👤 Full Name</label>
                    <p className="fw-bold mb-0" style={{color: '#1f2430'}}>{profile.name}</p>
                  </div>
                  <div className="mb-3 p-3" style={{background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', borderLeft: '3px solid #10b981'}}>
                    <label className="form-label fw-semibold text-muted small">✉️ Email</label>
                    <p className="fw-bold mb-0" style={{color: '#1f2430'}}>{profile.email}</p>
                  </div>
                  <div className="mb-3 p-3" style={{background: 'rgba(6, 182, 212, 0.05)', borderRadius: '0.75rem', borderLeft: '3px solid #06b6d4'}}>
                    <label className="form-label fw-semibold text-muted small">📱 Phone</label>
                    <p className="fw-bold mb-0" style={{color: '#1f2430'}}>{profile.phone}</p>
                  </div>
                  <div className="mb-3 p-3" style={{background: 'rgba(255, 138, 101, 0.05)', borderRadius: '0.75rem', borderLeft: '3px solid #ff8a65'}}>
                    <label className="form-label fw-semibold text-muted small">🌍 Country</label>
                    <p className="fw-bold mb-0" style={{color: '#1f2430'}}>{profile.country}</p>
                  </div>
                  <div className="mb-3 p-3" style={{background: 'rgba(245, 158, 11, 0.05)', borderRadius: '0.75rem', borderLeft: '3px solid #f59e0b'}}>
                    <label className="form-label fw-semibold text-muted small">✨ Bio</label>
                    <p className="fw-bold mb-0" style={{color: '#1f2430'}}>{profile.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
