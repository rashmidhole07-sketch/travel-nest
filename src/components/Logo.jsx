import { useNavigate } from 'react-router-dom'

export default function Logo({ tagline = true }) {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/dashboard')
  }

  return (
    <div 
      className="brand-logo align-items-center d-inline-flex gap-3" 
      onClick={handleLogoClick}
      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
      <div className="brand-mark d-flex align-items-center justify-content-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12L20 4L16 12L20 20L2 12Z" fill="white" />
        </svg>
      </div>
      <div className="brand-text">
        <div className="brand-title">TravelNest</div>
        {tagline && <div className="brand-tagline">Smart trip planner</div>}
      </div>
    </div>
  )
}
