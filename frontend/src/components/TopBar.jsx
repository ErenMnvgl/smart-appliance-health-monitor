import "./TopBar.css";

function TopBar({ onRefresh, loading }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-brand">
          <svg className="topbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <circle cx="7" cy="10" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
          </svg>
          <h1 className="topbar-title">Appliance Monitor</h1>
        </div>
        <button
          className="topbar-refresh"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh appliance data"
        >
          <svg className={`topbar-refresh-icon${loading ? " spinning" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-2.636-6.364" />
            <path d="M21 3v6h-6" />
          </svg>
          <span className="topbar-refresh-label">Refresh</span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
