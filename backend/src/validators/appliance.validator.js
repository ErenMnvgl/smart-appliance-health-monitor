const validStatuses = ["online", "offline"];
const validHealthStates = ["good", "warning", "critical", "unknown"];

const validateApplianceCreate = (req, res, next) => {
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

  next();
};

const validateApplianceStatusUpdate = (req, res, next) => {
  const { status } = req.body;

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

  next();
};

const validateApplianceHealthUpdate = (req, res, next) => {
  const { health } = req.body;

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

  next();
};

module.exports = {
  validateApplianceCreate,
  validateApplianceStatusUpdate,
  validateApplianceHealthUpdate
};
