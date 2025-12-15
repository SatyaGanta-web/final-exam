import { NavLink } from "react-router-dom";

const linkBase = "nav-link px-3 py-2 rounded";
const active = "active bg-white text-dark fw-semibold";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold">
          Portfolio<span className="text-warning">.</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto gap-2 mt-3 mt-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/redux" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
                Redux Example
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/crud" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
                CRUD Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/gallery" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
                Photo Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
