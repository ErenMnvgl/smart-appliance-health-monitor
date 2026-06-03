import ApplianceCard from "./ApplianceCard";
import "./ApplianceGrid.css";

function ApplianceGrid({ appliances, onChangeStatus, onChangeHealth, onDelete }) {
  if (appliances.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M9 10l6 0" />
        </svg>
        <p className="empty-title">No appliances found</p>
        <p className="empty-sub">Add your first appliance using the form above.</p>
      </div>
    );
  }

  return (
    <section className="appliance-grid" aria-label="Appliance list">
      {appliances.map((appliance, index) => (
        <ApplianceCard
          key={appliance.id}
          appliance={appliance}
          onChangeStatus={onChangeStatus}
          onChangeHealth={onChangeHealth}
          onDelete={onDelete}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </section>
  );
}

export default ApplianceGrid;
