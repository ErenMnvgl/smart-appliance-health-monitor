const express = require("express");

const {
  getAppliances,
  getApplianceById,
  createAppliance,
  updateApplianceStatus,
  updateApplianceHealth,
  updateAppliance,
  deleteAppliance
} = require("../controllers/appliance.controller");

const {
  validateApplianceCreate,
  validateApplianceStatusUpdate,
  validateApplianceHealthUpdate
} = require("../validators/appliance.validator");

const router = express.Router();

router.get("/appliances", getAppliances);
router.get("/appliances/:id", getApplianceById);
router.post("/appliances", validateApplianceCreate, createAppliance);
router.patch("/appliances/:id/status", validateApplianceStatusUpdate, updateApplianceStatus);
router.patch("/appliances/:id/health", validateApplianceHealthUpdate, updateApplianceHealth);
router.patch("/appliances/:id", updateAppliance);
router.delete("/appliances/:id", deleteAppliance);

module.exports = router;
