const express = require("express");
const healthRoutes = require("./routes/health.routes");
const applianceRoutes = require("./routes/appliance.routes");

const app = express();

app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api", applianceRoutes);

module.exports = app;
