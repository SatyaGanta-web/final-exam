import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, completeTask, deleteTask, clearCompleted } from "../redux/todoSlice";

export default function ReduxTodo() {
  const dispatch = useDispatch();
  const { tasks, completed } = useSelector((s) => s.todo);

  const [text, setText] = useState("");
  const [checked, setChecked] = useState({});
  const [err, setErr] = useState("");

  const canAdd = useMemo(() => text.trim().length >= 2, [text]);

  const add = (e) => {
    e.preventDefault();
    setErr("");
    if (!canAdd) return setErr("Task must be at least 2 characters.");
    dispatch(addTask(text));
    setText("");
  };

  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));

  const complete = (id) => {
    if (!checked[id]) return;
    dispatch(completeTask(id));
    setChecked((p) => {
      const c = { ...p };
      delete c[id];
      return c;
    });
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-2">
          <div>
            <h2 className="h4 fw-bold mb-1">Redux Example • To-Do</h2>
            <p className="text-muted mb-0">Global state using Redux Toolkit + React Redux hooks.</p>
          </div>
          <div className="d-flex gap-2">
            <span className="badge text-bg-primary">Active: {tasks.length}</span>
            <span className="badge text-bg-success">Completed: {completed.length}</span>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">
            <h3 className="h6 fw-bold mb-3">Add & Manage Tasks</h3>

            <form onSubmit={add} className="d-flex gap-2 mb-3">
              <input
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a task..."
              />
              <button className="btn btn-dark" type="submit">
                Add
              </button>
            </form>

            {err && <div className="alert alert-danger py-2">{err}</div>}

            {tasks.length === 0 ? (
              <div className="alert alert-secondary mb-0">No active tasks.</div>
            ) : (
              <ul className="list-group">
                {tasks.map((t) => (
                  <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!!checked[t.id]}
                        onChange={() => toggle(t.id)}
                      />
                      <span className="fw-semibold">{t.text}</span>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-success btn-sm"
                        type="button"
                        onClick={() => complete(t.id)}
                        disabled={!checked[t.id]}
                      >
                        Complete
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={() => dispatch(deleteTask(t.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="alert alert-light border mt-3 mb-0">
              <strong>Rule:</strong> Check the box, then click <em>Complete</em>.
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-bold mb-0">Completed Tasks</h3>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => dispatch(clearCompleted())}
                disabled={completed.length === 0}
              >
                Clear
              </button>
            </div>

            {completed.length === 0 ? (
              <div className="alert alert-secondary mb-0">No completed tasks.</div>
            ) : (
              <ul className="list-group">
                {completed.map((t) => (
                  <li key={t.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="fw-semibold text-success">✔ {t.text}</div>
                        <small className="text-muted">
                          Completed: {new Date(t.completedAt).toLocaleString()}
                        </small>
                      </div>
                      <span className="badge text-bg-success">Done</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
