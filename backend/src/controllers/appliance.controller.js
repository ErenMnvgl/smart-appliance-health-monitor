const appliances = require("../data/appliances");

const validStatuses = ["online", "offline"];
const validHealthStates = ["good", "warning", "critical", "unknown"];

const getAppliances = (req, res) => {
  res.json(appliances);
};

const getApplianceById = (req, res) => {
  const id = Number(req.params.id);

  const appliance = appliances.find((item) => item.id === id);

  if (!appliance) {
    return res.status(404).json({
      message: "Appliance not found"
    });
  }

  res.json(appliance);
};

const createAppliance = (req, res) => {
  const { name, type, status, health } = req.body;

  if (!name || !type || !status || !health) {
    return res.status(400).json({
      message: "name, type, status and health are required"
    });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "status must be online or offline"
    });
  }

  if (!validHealthStates.includes(health)) {
    return res.status(400).json({
      message: "health must be good, warning, critical or unknown"
    });
  }

  const newAppliance = {
    id: appliances.length + 1,
    name,
    type,
    status,
    health
  };

  appliances.push(newAppliance);

  res.status(201).json(newAppliance);
};

const updateApplianceStatus = (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const appliance = appliances.find((item) => item.id === id);

  if (!appliance) {
    return res.status(404).json({
      message: "Appliance not found"
    });
  }

  if (!status) {
    return res.status(400).json({
      message: "status is required"
    });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "status must be online or offline"
    });
  }

  appliance.status = status;

  res.json(appliance);
};

const updateApplianceHealth = (req, res) => {
  const id = Number(req.params.id);
  const { health } = req.body;

  const appliance = appliances.find((item) => item.id === id);

  if (!appliance) {
    return res.status(404).json({
      message: "Appliance not found"
    });
  }

  if (!health) {
    return res.status(400).json({
      message: "health is required"
    });
  }

  if (!validHealthStates.includes(health)) {
    return res.status(400).json({
      message: "health must be good, warning, critical or unknown"
    });
  }

  appliance.health = health;

  res.json(appliance);
};

const deleteAppliance = (req, res) => {
  const id = Number(req.params.id);

  const applianceIndex = appliances.findIndex((item) => item.id === id);

  if (applianceIndex === -1) {
    return res.status(404).json({
      message: "Appliance not found"
    });
  }

  const deletedAppliance = appliances.splice(applianceIndex, 1);

  res.json({
    message: "Appliance deleted successfully",
    appliance: deletedAppliance[0]
  });
};

module.exports = {
  getAppliances,
  getApplianceById,
  createAppliance,
  updateApplianceStatus,
  updateApplianceHealth,
  deleteAppliance
};
