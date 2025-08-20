import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

export function VideoLibraryIndex() {
  return (
    <div
      className="text-white"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section className="d-flex flex-column justify-content-center align-items-center text-center py-5 px-3">
        <h1 className="display-2 fw-bold mb-3">🎬 Video Library</h1>
        <p className="lead mb-4">
          Discover, watch, and save your favorite videos—all in one place.
        </p>
        <div className="d-flex flex-column flex-md-row gap-4 justify-content-center">
          <Link to="/user-login" className="btn btn-outline-light btn-lg px-4 py-2">
            <i className="bi bi-person-fill me-2"></i> User Login
          </Link>
          <Link to="/admin-login" className="btn btn-warning btn-lg px-4 py-2">
            <i className="bi bi-shield-lock-fill me-2"></i> Admin Login
          </Link>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="ratio ratio-16x9 shadow-lg rounded">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Featured Video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2 className="fw-bold mb-3">🔥 Featured Video</h2>
            <p className="mb-4">
              Dive into our top pick of the week—an inspiring, entertaining, and
              must-watch video that sets the tone for your journey.
            </p>
            <Link to="/user-login" className="btn btn-light btn-lg">
              <i className="bi bi-play-circle me-2"></i> Watch Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 border-top border-light">
        <small className="text-muted">
          © {new Date().getFullYear()} Video Library. All rights reserved.
        </small>
      </footer>
    </div>
  );
}