const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

// When testing, use an in-memory database
const dbFilename = process.env.NODE_ENV === 'test' 
  ? ':memory:' 
  : path.join(__dirname, '../../database.sqlite');

let dbInstance = null;

const getDb = async () => {
  if (dbInstance) {
    return dbInstance;
  }
  
  dbInstance = await open({
    filename: dbFilename,
    driver: sqlite3.Database
  });
  
  return dbInstance;
};

module.exports = { getDb };
