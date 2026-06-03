const API_BASE_URL = 'http://localhost:3000/api';
const POLL_INTERVAL_MS = 5000;

const possibleStatuses = ["online", "offline"];
const possibleHealthStates = ["good", "warning", "critical", "unknown"];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fetchAppliances = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/appliances`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch appliances:', error.message);
    return [];
  }
};

const updateApplianceStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appliances/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to update status for appliance ${id}:`, error.message);
  }
};

const updateApplianceHealth = async (id, health) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appliances/${id}/health`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ health })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to update health for appliance ${id}:`, error.message);
  }
};

const simulateActivity = async () => {
  // console.log("Fetching current appliances...");
  const appliances = await fetchAppliances();

  if (appliances.length === 0) {
    console.log("No appliances found in the system. Retrying next cycle...");
    return;
  }

  // Randomly select one appliance
  const targetAppliance = getRandomElement(appliances);

  // Randomly decide whether to update status (30% chance) or health (70% chance)
  const isStatusUpdate = Math.random() < 0.3;

  if (isStatusUpdate) {
    const newStatus = getRandomElement(possibleStatuses);
    console.log(`[SIMULATOR] Updating Appliance ${targetAppliance.id} (${targetAppliance.name}) status to: '${newStatus}'`);
    await updateApplianceStatus(targetAppliance.id, newStatus);
  } else {
    const newHealth = getRandomElement(possibleHealthStates);
    console.log(`[SIMULATOR] Updating Appliance ${targetAppliance.id} (${targetAppliance.name}) health to: '${newHealth}'`);
    await updateApplianceHealth(targetAppliance.id, newHealth);
  }
};

const startSimulator = () => {
  console.log('Starting Smart Appliance Simulator...');
  console.log(`Polling every ${POLL_INTERVAL_MS / 1000} seconds.`);
  
  // Initial run
  simulateActivity();

  // Schedule periodic runs
  setInterval(simulateActivity, POLL_INTERVAL_MS);
};

startSimulator();
