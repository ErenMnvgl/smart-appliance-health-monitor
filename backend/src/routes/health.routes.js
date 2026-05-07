const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Smart Appliance Connection & Health Monitor Backend"
  });
});

module.exports = router;
