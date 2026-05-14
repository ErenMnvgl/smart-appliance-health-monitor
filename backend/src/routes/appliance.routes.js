const express = require("express");

const {
  getAppliances,
  getApplianceById,
  createAppliance,
  updateApplianceStatus,
  updateApplianceHealth,
  deleteAppliance
} = require("../controllers/appliance.controller");

const router = express.Router();

router.get("/appliances", getAppliances);
router.get("/appliances/:id", getApplianceById);
router.post("/appliances", createAppliance);
router.patch("/appliances/:id/status", updateApplianceStatus);
router.patch("/appliances/:id/health", updateApplianceHealth);
router.delete("/appliances/:id", deleteAppliance);

module.exports = router;
