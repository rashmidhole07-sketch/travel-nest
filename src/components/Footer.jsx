export default function Footer() {
  return (
    <footer className="app-footer border-top bg-white py-3 mt-auto">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <span className="text-muted small mb-1 mb-sm-0">© {new Date().getFullYear()} TravelNest</span>
        <span className="text-muted small">
          Designed & Developed by{' '}
          <a
            href="https://kavyainfoweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-semibold"
          >
            Kavya Infoweb Pvt Ltd
          </a>
        </span>
      </div>
    </footer>
  )
}
