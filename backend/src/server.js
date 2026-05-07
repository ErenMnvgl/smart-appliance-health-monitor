const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
