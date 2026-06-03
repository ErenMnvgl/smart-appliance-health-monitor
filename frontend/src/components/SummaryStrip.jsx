import "./SummaryStrip.css";

function SummaryStrip({ appliances }) {
  const total = appliances.length;
  const online = appliances.filter((a) => a.status === "online").length;
  const warnings = appliances.filter((a) => a.health === "warning").length;
  const critical = appliances.filter((a) => a.health === "critical").length;

  const stats = [
    { label: "Total", value: total, colorVar: "--accent" },
    { label: "Online", value: online, colorVar: "--status-online" },
    { label: "Warning", value: warnings, colorVar: "--health-warning" },
    { label: "Critical", value: critical, colorVar: "--health-critical" },
  ];

  return (
    <section className="summary-strip" aria-label="Appliance statistics">
      {stats.map((stat) => (
        <div className="summary-card" key={stat.label}>
          <span
            className="summary-value"
            style={{ color: `var(${stat.colorVar})` }}
          >
            {stat.value}
          </span>
          <span className="summary-label">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

export default SummaryStrip;
