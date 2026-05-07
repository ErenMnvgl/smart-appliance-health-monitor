const express = require("express");

const app = express();
const PORT = 3000;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Smart Appliance Connection & Health Monitor Backend"
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
