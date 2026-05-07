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

module.exports = router;
