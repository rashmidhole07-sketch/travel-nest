import 'bootstrap/dist/css/bootstrap.min.css'

export default function NotFound() {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="fw-bold mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">Sorry, the page you're looking for doesn't exist.</p>
        <a href="/dashboard" className="btn btn-primary">Go to Dashboard</a>
      </div>
    </div>
  )
}
