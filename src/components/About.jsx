export default function About() {
  return (
    <div className="row g-4">
      <div className="col-12 col-lg-7">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <h2 className="h4 fw-bold mb-2">About This Project</h2>
            <p className="text-muted">
              This portfolio demonstrates the core skills from CSCI 6333:
              React Router, Redux global state, API calls (Axios), validation,
              and performance-friendly UI patterns like pagination + lazy loading.
            </p>

            <div className="alert alert-light border mb-0">
              <strong>Styling:</strong> Bootstrap components only (no custom CSS).
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <h3 className="h6 fw-bold mb-3">Included Features</h3>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                React Router <span className="badge text-bg-dark">Pages</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Redux Toolkit <span className="badge text-bg-primary">Store</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Axios CRUD <span className="badge text-bg-warning">Users</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Form Validation <span className="badge text-bg-success">Contact</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Pagination + Lazy Loading <span className="badge text-bg-secondary">Gallery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
