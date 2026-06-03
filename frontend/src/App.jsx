import { useEffect } from "react";
import TopBar from "./components/TopBar";
import SummaryStrip from "./components/SummaryStrip";
import AddAppliance from "./components/AddAppliance";
import ApplianceGrid from "./components/ApplianceGrid";
import { useAppliances } from "./hooks/useAppliances";
import "./App.css";

function App() {
  const {
    appliances,
    loading,
    error,
    load,
    add,
    changeStatus,
    changeHealth,
    remove,
  } = useAppliances();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="app">
      <TopBar onRefresh={load} loading={loading} />
      <main className="main-content">
        {error && (
          <div className="error-banner">
            <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <div className="error-text">
              <p className="error-message">Could not connect to the backend server.</p>
              <p className="error-detail">{error}</p>
            </div>
            <button className="error-retry" onClick={load}>Retry</button>
          </div>
        )}

        {loading && appliances.length === 0 ? (
          <div className="skeleton-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-line skeleton-wide" />
                <div className="skeleton-line skeleton-medium" />
                <div className="skeleton-chips-row">
                  <div className="skeleton-chip" />
                  <div className="skeleton-chip" />
                </div>
                <div className="skeleton-line skeleton-narrow" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {!error && <SummaryStrip appliances={appliances} />}
            {!error && <AddAppliance onAdd={add} />}
            {!error && (
              <ApplianceGrid
                appliances={appliances}
                onChangeStatus={changeStatus}
                onChangeHealth={changeHealth}
                onDelete={remove}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
