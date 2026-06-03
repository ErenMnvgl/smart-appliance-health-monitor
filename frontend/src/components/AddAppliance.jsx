import { useState } from "react";
import "./AddAppliance.css";

const STATUS_OPTIONS = ["online", "offline"];
const HEALTH_OPTIONS = ["good", "warning", "critical", "unknown"];

const INITIAL_FORM = {
  name: "",
  type: "",
  status: "online",
  health: "good",
};

function AddAppliance({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.type.trim()) {
      setError("Name and type are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onAdd(form);
      setForm(INITIAL_FORM);
      setOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button className="add-toggle-btn" onClick={() => setOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add Appliance
      </button>
    );
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form-header">
        <h2 className="add-form-title">Add New Appliance</h2>
        <button
          type="button"
          className="add-form-close"
          onClick={() => { setOpen(false); setError(null); }}
          aria-label="Close form"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="add-form-grid">
        <label className="form-field">
          <span className="form-label">Name</span>
          <input
            className="form-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Smart Oven"
            autoFocus
          />
        </label>
        <label className="form-field">
          <span className="form-label">Type</span>
          <input
            className="form-input"
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="e.g. oven"
          />
        </label>
        <label className="form-field">
          <span className="form-label">Status</span>
          <select
            className="form-input form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span className="form-label">Health</span>
          <select
            className="form-input form-select"
            name="health"
            value={form.health}
            onChange={handleChange}
          >
            {HEALTH_OPTIONS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="add-form-error">{error}</p>}

      <div className="add-form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Appliance"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => { setOpen(false); setError(null); }}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddAppliance;
