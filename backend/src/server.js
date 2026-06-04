const app = require("./app");
const { initDatabase } = require("./data/init");

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
};

startServer();
