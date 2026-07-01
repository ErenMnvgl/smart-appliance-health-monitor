const API_BASE_URL = 'http://127.0.0.1:3002/api';
const POLL_INTERVAL_MS = 1000;

const possibleStatuses = ["online", "offline"];
const possibleHealthStates = ["good", "warning", "critical"];

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

const updateAppliance = async (id, fields) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appliances/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to update appliance ${id}:`, error.message);
  }
};

// State generator helper
const getNextTelemetry = (type, currentTemp, currentUsage) => {
  let temp = currentTemp;
  let usage = currentUsage;

  switch (type) {
    case 'air-fryer':
      if (!usage || usage === 'Standby' || usage === 'Offline') {
        if (Math.random() < 0.15) {
          usage = 'Heating';
        } else {
          usage = 'Standby';
          temp = `${Math.floor(20 + Math.random() * 5)}°C`;
        }
      } else {
        if (Math.random() < 0.05) {
          usage = 'Standby';
        } else {
          usage = 'Heating';
          const currentVal = parseInt(temp) || 180;
          const diff = getRandomElement([-3, -1, 0, 1, 3]);
          const newVal = Math.max(170, Math.min(220, currentVal + diff));
          temp = `${newVal}°C`;
        }
      }
      break;

    case 'tea-maker':
      if (!usage || usage === 'Standby' || usage === 'Offline') {
        if (Math.random() < 0.15) {
          usage = getRandomElement(['Boiling', 'Keep Warm']);
        } else {
          usage = 'Standby';
          temp = `${Math.floor(20 + Math.random() * 5)}°C`;
        }
      } else if (usage === 'Boiling') {
        if (Math.random() < 0.15) {
          usage = 'Keep Warm';
        } else {
          const currentVal = parseInt(temp) || 95;
          const diff = getRandomElement([-2, -1, 1, 2]);
          const newVal = Math.max(90, Math.min(100, currentVal + diff));
          temp = `${newVal}°C`;
        }
      } else {
        if (Math.random() < 0.05) {
          usage = 'Standby';
        } else {
          const currentVal = parseInt(temp) || 80;
          const diff = getRandomElement([-1, 0, 1]);
          const newVal = Math.max(75, Math.min(85, currentVal + diff));
          temp = `${newVal}°C`;
        }
      }
      break;

    case 'vacuum':
      if (!usage || usage === 'Standby' || usage === 'Offline') {
        if (Math.random() < 0.15) {
          usage = 'Cleaning';
          temp = 'Battery: 99%';
        } else {
          usage = 'Standby';
          temp = 'Battery: 100%';
        }
      } else if (usage === 'Cleaning') {
        let battery = parseInt((temp || '').replace('Battery: ', '').replace('%', '')) || 90;
        battery = Math.max(5, battery - 1);
        if (battery <= 15) {
          usage = 'Charging';
        }
        temp = `Battery: ${battery}%`;
      } else if (usage === 'Charging') {
        let battery = parseInt((temp || '').replace('Battery: ', '').replace('%', '').replace(' (Charging)', '')) || 15;
        battery = Math.min(100, battery + 2);
        if (battery >= 100) {
          usage = 'Standby';
          temp = 'Battery: 100%';
        } else {
          temp = `Battery: ${battery}% (Charging)`;
        }
      }
      break;

    case 'mixer':
      if (!usage || usage === 'Standby' || usage === 'Offline') {
        if (Math.random() < 0.15) {
          usage = 'Mixing';
        } else {
          usage = 'Standby';
          temp = '0 RPM';
        }
      } else {
        if (Math.random() < 0.05) {
          usage = 'Standby';
          temp = '0 RPM';
        } else {
          usage = 'Mixing';
          const currentVal = parseInt(temp) || 450;
          const diff = getRandomElement([-25, -10, 0, 10, 25]);
          const newVal = Math.max(300, Math.min(800, currentVal + diff));
          temp = `${newVal} RPM`;
        }
      }
      break;

    case 'grill':
      if (!usage || usage === 'Standby' || usage === 'Offline') {
        if (Math.random() < 0.15) {
          usage = 'Toasting';
        } else {
          usage = 'Standby';
          temp = `${Math.floor(22 + Math.random() * 4)}°C`;
        }
      } else {
        if (Math.random() < 0.05) {
          usage = 'Standby';
          temp = `${Math.floor(22 + Math.random() * 4)}°C`;
        } else {
          usage = 'Toasting';
          const currentVal = parseInt(temp) || 200;
          const diff = getRandomElement([-4, -2, 0, 2, 4]);
          const newVal = Math.max(180, Math.min(230, currentVal + diff));
          temp = `${newVal}°C`;
        }
      }
      break;
  }

  return { temp, usage };
};

const simulateActivity = async () => {
  const appliances = await fetchAppliances();

  if (appliances.length === 0) {
    return;
  }

  for (const appliance of appliances) {
    let updateFields = {};

    // 2% chance to toggle status (online/offline)
    if (Math.random() < 0.02) {
      const newStatus = appliance.status === 'online' ? 'offline' : 'online';
      updateFields.status = newStatus;
      console.log(`[SIMULATOR] Appliance ${appliance.id} (${appliance.name}) status changed to: ${newStatus}`);
    }

    // 3% chance to fluctuate health (if online)
    if (appliance.status === 'online' && Math.random() < 0.03) {
      const newHealth = getRandomElement(possibleHealthStates);
      updateFields.health = newHealth;
      
      // Adjust healthScore accordingly
      if (newHealth === 'good') updateFields.healthScore = 95 + Math.floor(Math.random() * 6);
      if (newHealth === 'warning') updateFields.healthScore = 60 + Math.floor(Math.random() * 20);
      if (newHealth === 'critical') updateFields.healthScore = 10 + Math.floor(Math.random() * 30);
      
      console.log(`[SIMULATOR] Appliance ${appliance.id} (${appliance.name}) health changed to: ${newHealth} (${updateFields.healthScore || 100}%)`);
    }

    // Telemetry updates if device is online
    const currentStatus = updateFields.status || appliance.status;
    if (currentStatus === 'online') {
      const { temp, usage } = getNextTelemetry(appliance.type, appliance.temp, appliance.usage);
      updateFields.temp = temp;
      updateFields.usage = usage;
    } else {
      updateFields.temp = '0°C';
      updateFields.usage = 'Offline';
    }

    if (Object.keys(updateFields).length > 0) {
      await updateAppliance(appliance.id, updateFields);
    }
  }
};

const startSimulator = () => {
  console.log('Starting Smart Appliance Real-Time Simulator...');
  console.log(`Updating states every ${POLL_INTERVAL_MS / 1000} second.`);
  
  // Initial run
  simulateActivity();

  // Schedule periodic runs
  setInterval(simulateActivity, POLL_INTERVAL_MS);
};

startSimulator();
