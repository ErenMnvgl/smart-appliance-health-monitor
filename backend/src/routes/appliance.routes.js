const express = require("express");

const router = express.Router();

const appliances = [
  {
    id: 1,
    name: "Washing Machine",
    type: "washer",
    status: "online",
    health: "good"
  },
  {
    id: 2,
    name: "Refrigerator",
    type: "fridge",
    status: "online",
    health: "warning"
  },
  {
    id: 3,
    name: "Dishwasher",
    type: "dishwasher",
    status: "offline",
    health: "unknown"
  }
];

router.get("/appliances", (req, res) => {
  res.json(appliances);
});

router.get("/appliances/:id", (req, res) => {
  const id = Number(req.params.id);

  const appliance = appliances.find((item) => item.id === id);

  if (!appliance) {
    return res.status(404).json({
      message: "Appliance not found"
    });
  }

  res.json(appliance);
});

router.post("/appliances", (req, res) => {
  const { name, type, status, health } = req.body;

  if (!name || !type || !status || !health) {
    return res.status(400).json({
      message: "name, type, status and health are required"
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
});

router.patch("/appliances/:id/status", (req, res) => {
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

  appliance.status = status;

  res.json(appliance);
});

router.patch("/appliances/:id/health", (req, res) => {
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

  appliance.health = health;

  res.json(appliance);
});

router.delete("/appliances/:id", (req, res) => {
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
});

module.exports = router;
