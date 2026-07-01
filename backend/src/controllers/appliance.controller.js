const { getDb } = require("../config/database");

const getAppliances = async (req, res) => {
  try {
    const db = await getDb();
    const appliances = await db.all("SELECT * FROM appliances");
    res.json(appliances);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const getApplianceById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const db = await getDb();
    const appliance = await db.get("SELECT * FROM appliances WHERE id = ?", [id]);

    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }

    res.json(appliance);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const createAppliance = async (req, res) => {
  try {
    const { name, type, status, health } = req.body;
    const db = await getDb();
    
    const result = await db.run(
      "INSERT INTO appliances (name, type, status, health) VALUES (?, ?, ?, ?)",
      [name, type, status, health]
    );

    const newAppliance = {
      id: result.lastID,
      name,
      type,
      status,
      health
    };

    res.status(201).json(newAppliance);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const updateApplianceStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    const db = await getDb();

    const appliance = await db.get("SELECT * FROM appliances WHERE id = ?", [id]);

    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }

    await db.run("UPDATE appliances SET status = ? WHERE id = ?", [status, id]);
    
    appliance.status = status;
    res.json(appliance);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const updateApplianceHealth = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { health } = req.body;
    const db = await getDb();

    const appliance = await db.get("SELECT * FROM appliances WHERE id = ?", [id]);

    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }

    await db.run("UPDATE appliances SET health = ? WHERE id = ?", [health, id]);
    
    appliance.health = health;
    res.json(appliance);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const updateAppliance = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, type, status, health, category, usage, temp, healthScore } = req.body;
    const db = await getDb();

    const appliance = await db.get("SELECT * FROM appliances WHERE id = ?", [id]);

    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }

    const updates = [];
    const params = [];
    
    if (name !== undefined) { updates.push("name = ?"); params.push(name); }
    if (type !== undefined) { updates.push("type = ?"); params.push(type); }
    if (status !== undefined) { updates.push("status = ?"); params.push(status); }
    if (health !== undefined) { updates.push("health = ?"); params.push(health); }
    if (category !== undefined) { updates.push("category = ?"); params.push(category); }
    if (usage !== undefined) { updates.push("usage = ?"); params.push(usage); }
    if (temp !== undefined) { updates.push("temp = ?"); params.push(temp); }
    if (healthScore !== undefined) { updates.push("healthScore = ?"); params.push(healthScore); }

    if (updates.length > 0) {
      params.push(id);
      await db.run(`UPDATE appliances SET ${updates.join(", ")} WHERE id = ?`, params);
    }
    
    const updatedAppliance = await db.get("SELECT * FROM appliances WHERE id = ?", [id]);
    res.json(updatedAppliance);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const deleteAppliance = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const db = await getDb();

    const appliance = await db.get("SELECT * FROM appliances WHERE id = ?", [id]);

    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }

    await db.run("DELETE FROM appliances WHERE id = ?", [id]);

    res.json({
      message: "Appliance deleted successfully",
      appliance
    });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

module.exports = {
  getAppliances,
  getApplianceById,
  createAppliance,
  updateApplianceStatus,
  updateApplianceHealth,
  updateAppliance,
  deleteAppliance
};
