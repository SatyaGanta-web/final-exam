import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
          <div className="d-flex flex-column flex-md-row gap-4 align-items-md-center justify-content-between">
            <div>
              <span className="badge text-bg-dark mb-3">CSCI 6333 • Final</span>
              <h1 className="display-6 fw-bold mb-2">React Portfolio Application</h1>
              <p className="text-muted mb-0">
                Explore routing, global state with Redux, CRUD with Axios, form validation,
                and a paginated photo gallery with lazy loading — all styled using Bootstrap.
              </p>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <Link to="/redux" className="btn btn-dark">
                View Redux Demo
              </Link>
              <Link to="/crud" className="btn btn-outline-dark">
                Create Users
              </Link>
              <Link to="/gallery" className="btn btn-outline-secondary">
                Photo Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body">
            <h2 className="h6 fw-bold">React Router</h2>
            <p className="text-muted mb-0">
              Clean navigation across pages using React Router v6.
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body">
            <h2 className="h6 fw-bold">Redux Toolkit</h2>
            <p className="text-muted mb-0">
              Global To-Do app with Add/Delete/Complete actions.
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body">
            <h2 className="h6 fw-bold">APIs + Optimization</h2>
            <p className="text-muted mb-0">
              Axios CRUD UI + Picsum pagination + lazy loaded images.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
