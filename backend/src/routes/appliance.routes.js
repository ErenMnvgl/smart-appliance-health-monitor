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

module.exports = router;
