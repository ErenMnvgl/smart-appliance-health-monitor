const app = require("./app");
const { initDatabase } = require("./data/init");

const PORT = 3000;

const startServer = async () => {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
};

startServer();
