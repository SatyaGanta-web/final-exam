import { useMemo, useState } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function ContactForm() {
  const todayISO = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });
  const [errors, setErrors] = useState({});
  const [ok, setOk] = useState(false);

  const dateIsPast = useMemo(() => {
    if (!form.date) return false;
    return new Date(form.date + "T00:00:00") < new Date(todayISO + "T00:00:00");
  }, [form.date, todayISO]);

  const onChange = (e) => {
    setOk(false);
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email)) next.email = "Enter a valid email.";

    if (!form.date) next.date = "Date is required.";
    else if (dateIsPast) next.date = "Date cannot be in the past.";

    return next;
  };

  const submit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    console.log("Contact Form:", form);
    setOk(true);
    setForm({ name: "", email: "", date: "", message: "" });
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="p-4 bg-white border rounded-4 shadow-sm">
          <h2 className="h4 fw-bold mb-1">Contact Form</h2>
          <p className="text-muted mb-0">
            Validates required fields, email format, and date (no past dates).
          </p>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            {ok && <div className="alert alert-success">Submitted successfully! (Check console.)</div>}

            <form onSubmit={submit} className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Name *</label>
                <input
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Email *</label>
                <input
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={form.email}
                  onChange={onChange}
                  placeholder="your@email.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  value={form.date}
                  onChange={onChange}
                  min={todayISO}
                />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                <div className="form-text">Minimum date: {todayISO}</div>
              </div>

              <div className="col-12">
                <label className="form-label">Message (optional)</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Write your message..."
                />
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-dark">Submit</button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setOk(false);
                    setErrors({});
                    setForm({ name: "", email: "", date: "", message: "" });
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <h3 className="h6 fw-bold mb-2">Validation Rules</h3>
            <ul className="mb-0 text-muted">
              <li>Name required</li>
              <li>Email required + valid format</li>
              <li>Date required + cannot be past</li>
              <li>Message optional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
