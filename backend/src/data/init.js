const { getDb } = require('../config/database');

const initDatabase = async () => {
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS appliances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      health TEXT NOT NULL
    )
  `);

  const count = await db.get('SELECT COUNT(*) as count FROM appliances');
  
  if (count.count === 0 && process.env.NODE_ENV !== 'test') {
    await db.run(`INSERT INTO appliances (name, type, status, health) VALUES 
      ('Washing Machine', 'washer', 'online', 'good'),
      ('Refrigerator', 'fridge', 'online', 'warning'),
      ('Dishwasher', 'dishwasher', 'offline', 'unknown')
    `);
    console.log("Database initialized with mock data.");
  }
};

module.exports = { initDatabase };
