const API_BASE = "http://localhost:3000/api";

export async function fetchAppliances() {
  const res = await fetch(`${API_BASE}/appliances`);
  if (!res.ok) throw new Error(`Failed to fetch appliances (${res.status})`);
  return res.json();
}

export async function createAppliance(data) {
  const res = await fetch(`${API_BASE}/appliances`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to create appliance (${res.status})`);
  }
  return res.json();
}

export async function updateApplianceStatus(id, status) {
  const res = await fetch(`${API_BASE}/appliances/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Failed to update status (${res.status})`);
  return res.json();
}

export async function updateApplianceHealth(id, health) {
  const res = await fetch(`${API_BASE}/appliances/${id}/health`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ health }),
  });
  if (!res.ok) throw new Error(`Failed to update health (${res.status})`);
  return res.json();
}

export async function deleteAppliance(id) {
  const res = await fetch(`${API_BASE}/appliances/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete appliance (${res.status})`);
  return res.json();
}
