import { useState } from "react";
import "./ApplianceCard.css";

const STATUS_OPTIONS = ["online", "offline"];
const HEALTH_OPTIONS = ["good", "warning", "critical", "unknown"];

const TYPE_ICONS = {
  washer: "M9 3h6v2H9V3ZM5 7h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Zm7 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  fridge: "M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 8h12M8 6v3M8 14v2",
  dishwasher: "M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 4h16M12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 6h0",
  tv: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm4 16h8",
  oven: "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 6h14M7 5v2M12 5v2M17 5v2M6 12h12v7H6v-7Z",
  default: "M9.75 3a6.75 6.75 0 0 0 0 13.5h4.5a6.75 6.75 0 0 0 0-13.5h-4.5ZM12 20v2M8 20v2M16 20v2",
};

function getTypeIcon(type) {
  return TYPE_ICONS[type] || TYPE_ICONS.default;
}

function ApplianceCard({ appliance, onChangeStatus, onChangeHealth, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    setUpdating(true);
    try {
      await onChangeStatus(appliance.id, e.target.value);
    } finally {
      setUpdating(false);
    }
  };

  const handleHealthChange = async (e) => {
    setUpdating(true);
    try {
      await onChangeHealth(appliance.id, e.target.value);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setUpdating(true);
    try {
      await onDelete(appliance.id);
    } finally {
      setUpdating(false);
      setConfirmDelete(false);
    }
  };

  const statusColor = appliance.status === "online" ? "var(--status-online)" : "var(--status-offline)";

  const healthColorMap = {
    good: "var(--health-good)",
    warning: "var(--health-warning)",
    critical: "var(--health-critical)",
    unknown: "var(--health-unknown)",
  };
  const healthColor = healthColorMap[appliance.health] || healthColorMap.unknown;

  return (
    <article className={`appliance-card${updating ? " card-updating" : ""}`}>
      <div className="card-header">
        <div className="card-identity">
          <svg className="card-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={getTypeIcon(appliance.type)} />
          </svg>
          <div>
            <h3 className="card-name">{appliance.name}</h3>
            <span className="card-type">{appliance.type}</span>
          </div>
        </div>
        <div className="card-status-dot-wrapper">
          {appliance.status === "online" && (
            <span className="card-status-pulse" style={{ backgroundColor: statusColor }} />
          )}
          <span className="card-status-dot" style={{ backgroundColor: statusColor }} />
        </div>
      </div>

      <div className="card-chips">
        <span
          className="chip"
          style={{
            backgroundColor: `color-mix(in srgb, ${statusColor} 12%, transparent)`,
            color: statusColor,
            borderColor: `color-mix(in srgb, ${statusColor} 20%, transparent)`,
          }}
        >
          {appliance.status}
        </span>
        <span
          className={`chip${appliance.health === "critical" ? " chip-critical" : ""}`}
          style={{
            backgroundColor: `color-mix(in srgb, ${healthColor} 12%, transparent)`,
            color: healthColor,
            borderColor: `color-mix(in srgb, ${healthColor} 20%, transparent)`,
          }}
        >
          {appliance.health}
        </span>
      </div>

      <div className="card-controls">
        <label className="control-group">
          <span className="control-label">Status</span>
          <select
            className="control-select"
            value={appliance.status}
            onChange={handleStatusChange}
            disabled={updating}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="control-group">
          <span className="control-label">Health</span>
          <select
            className="control-select"
            value={appliance.health}
            onChange={handleHealthChange}
            disabled={updating}
          >
            {HEALTH_OPTIONS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="card-actions">
        {confirmDelete ? (
          <div className="delete-confirm">
            <span className="delete-confirm-text">Delete this appliance?</span>
            <div className="delete-confirm-buttons">
              <button
                className="btn btn-danger-sm"
                onClick={handleDelete}
                disabled={updating}
              >
                Yes, delete
              </button>
              <button
                className="btn btn-ghost-sm"
                onClick={() => setConfirmDelete(false)}
                disabled={updating}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-ghost-sm btn-delete-trigger"
            onClick={() => setConfirmDelete(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export default ApplianceCard;
