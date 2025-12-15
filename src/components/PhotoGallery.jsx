import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const API = "https://picsum.photos/v2/list";

export default function PhotoGallery() {
  const [all, setAll] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const totalPages = useMemo(() => Math.max(1, Math.ceil(all.length / pageSize)), [all.length]);
  const current = useMemo(() => all.slice((page - 1) * pageSize, page * pageSize), [all, page]);

  const fetchImages = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await axios.get(`${API}?page=1&limit=36`);
      setAll(res.data);
      setPage(1);
    } catch {
      setErr("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="p-4 bg-white border rounded-4 shadow-sm">
          <div className="d-flex flex-wrap justify-content-between gap-2 align-items-start">
            <div>
              <h2 className="h4 fw-bold mb-1">Photo Gallery</h2>
              <p className="text-muted mb-0">6 per page • Pagination • Lazy Loading • Loading/Error states</p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge text-bg-dark align-self-center">
                Page {page} / {totalPages}
              </span>
              <button className="btn btn-outline-dark" onClick={fetchImages} disabled={loading}>
                Refresh
              </button>
            </div>
          </div>

          {err && <div className="alert alert-danger mt-3 mb-0">{err}</div>}
          {loading && <div className="alert alert-info mt-3 mb-0 py-2">Loading images...</div>}
        </div>
      </div>

      <div className="col-12">
        {current.length === 0 && !loading ? (
          <div className="alert alert-secondary">No images to display.</div>
        ) : (
          <div className="row g-3">
            {current.map((img) => (
              <div className="col-12 col-md-6 col-lg-4" key={img.id}>
                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                  <img
                    src={img.download_url}
                    alt={`By ${img.author}`}
                    loading="lazy"
                    style={{ height: 230, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <div className="fw-semibold">{img.author}</div>
                    <a className="btn btn-sm btn-outline-dark mt-3" href={img.url} target="_blank" rel="noreferrer">
                      Open Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <button className="btn btn-dark" onClick={prev} disabled={page === 1 || loading}>
            Previous
          </button>

          <div className="alert alert-light border mb-0 py-2">
            Showing <strong>{current.length}</strong> of <strong>{all.length}</strong> images
          </div>

          <button className="btn btn-dark" onClick={next} disabled={page === totalPages || loading}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
