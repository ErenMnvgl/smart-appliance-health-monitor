const { getDb } = require('../config/database');

const initDatabase = async () => {
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS appliances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      health TEXT NOT NULL,
      category TEXT,
      usage TEXT,
      temp TEXT,
      healthScore INTEGER DEFAULT 100
    )
  `);

  const count = await db.get('SELECT COUNT(*) as count FROM appliances');
  
  if (count.count === 0 && process.env.NODE_ENV !== 'test') {
    await db.run(`INSERT INTO appliances (name, type, status, health, category, usage, temp, healthScore) VALUES 
      ('Vestel Air Fryer', 'air-fryer', 'online', 'good', 'Cooking', 'Heating', '180°C', 98),
      ('Smart Tea Maker', 'tea-maker', 'online', 'warning', 'Beverage', 'Boiling', '95°C', 78),
      ('Robot Vacuum V1', 'vacuum', 'offline', 'unknown', 'Cleaning', 'Standby', '25°C', 100),
      ('Stand Mixer Pro', 'mixer', 'online', 'good', 'Food Prep', 'Mixing', '500 RPM', 95),
      ('Grill & Toaster', 'grill', 'online', 'good', 'Cooking', 'Standby', '25°C', 100)
    `);
    console.log("Database initialized with mock data including metrics.");
  }
};

module.exports = { initDatabase };
