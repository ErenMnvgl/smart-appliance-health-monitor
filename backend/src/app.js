const express = require("express");
const healthRoutes = require("./routes/health.routes");
const applianceRoutes = require("./routes/appliance.routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api", applianceRoutes);

module.exports = app;
