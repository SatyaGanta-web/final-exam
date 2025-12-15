import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const API = "https://jsonplaceholder.typicode.com/users";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function isValidPhone(phone) {
  return /^[0-9+\-()\s]{7,}$/.test(phone.trim());
}

export default function CrudApi() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      isValidEmail(form.email) &&
      isValidPhone(form.phone)
    );
  }, [form]);

  const fetchUsers = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await axios.get(API);
      setUsers(res.data.slice(0, 8));
    } catch {
      setErr("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "" });
    setErrors({});
    setEditId(null);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    else if (form.name.trim().length < 2) next.name = "Min 2 characters.";

    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email)) next.email = "Enter a valid email.";

    if (!form.phone.trim()) next.phone = "Phone is required.";
    else if (!isValidPhone(form.phone)) next.phone = "Enter a valid phone number.";

    return next;
  };

  const onChange = (e) => {
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const startEdit = (u) => {
    setEditId(u.id);
    setForm({ name: u.name || "", email: u.email || "", phone: u.phone || "" });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const createUser = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    setErr("");
    try {
      const res = await axios.post(API, form);
      setUsers((prev) => [{ ...res.data, id: Date.now() }, ...prev]);
      resetForm();
    } catch {
      setErr("Create failed.");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    setErr("");
    try {
      const res = await axios.put(`${API}/${editId}`, { id: editId, ...form });
      setUsers((prev) => prev.map((u) => (u.id === editId ? { ...u, ...res.data } : u)));
      resetForm();
    } catch {
      setErr("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setErr("");
    try {
      await axios.delete(`${API}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (editId === id) resetForm();
    } catch {
      setErr("Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="p-4 bg-white border rounded-4 shadow-sm">
          <div className="d-flex flex-wrap justify-content-between gap-2 align-items-start">
            <div>
              <h2 className="h4 fw-bold mb-1">CRUD Users</h2>
              <p className="text-muted mb-0">Create, edit, and delete users (Name, Email, Phone).</p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge text-bg-dark align-self-center">Total: {users.length}</span>
              <button className="btn btn-outline-dark" onClick={fetchUsers} disabled={loading}>
                Refresh
              </button>
            </div>
          </div>

          {err && <div className="alert alert-danger mt-3 mb-0">{err}</div>}
          {loading && <div className="alert alert-info mt-3 mb-0 py-2">Loading...</div>}
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-bold mb-0">{editId ? `Edit User #${editId}` : "Create User"}</h3>
              {editId ? <span className="badge text-bg-warning">Editing</span> : <span className="badge text-bg-primary">New</span>}
            </div>

            <form onSubmit={editId ? updateUser : createUser} className="row g-3">
              <div className="col-12">
                <label className="form-label">Name *</label>
                <input
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={form.name}
                  onChange={onChange}
                  placeholder="e.g., Swaroop Charan"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="col-12">
                <label className="form-label">Email *</label>
                <input
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={form.email}
                  onChange={onChange}
                  placeholder="e.g., swaroop@email.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="col-12">
                <label className="form-label">Phone *</label>
                <input
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={form.phone}
                  onChange={onChange}
                  placeholder="e.g., +1 (405) 555-1234"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                <div className="form-text">Allowed: digits, spaces, +, -, parentheses.</div>
              </div>

              <div className="col-12 d-flex gap-2">
                <button className={`btn ${editId ? "btn-warning" : "btn-dark"}`} disabled={!canSubmit || loading}>
                  {editId ? "Update" : "Create"}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm} disabled={loading}>
                  Reset
                </button>
              </div>

              {!canSubmit && (
                <div className="col-12">
                  <div className="alert alert-light border py-2 mb-0">
                    Enter a valid <strong>Name</strong>, <strong>Email</strong>, and <strong>Phone</strong>.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-0">
            <div className="p-4 border-bottom">
              <h3 className="h6 fw-bold mb-0">User List</h3>
              <small className="text-muted">Click Edit to load into the form.</small>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 90 }}>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th style={{ width: 170 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-semibold">{u.id}</td>
                      <td>{u.name}</td>
                      <td className="text-muted">{u.email}</td>
                      <td className="text-muted">{u.phone}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-outline-dark btn-sm" onClick={() => startEdit(u)}>
                            Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(u.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-muted">
                        No users loaded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-top bg-white">
              <div className="alert alert-warning mb-0 py-2">
                <strong>Note:</strong> JSONPlaceholder simulates POST/PUT/DELETE. UI still works correctly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
