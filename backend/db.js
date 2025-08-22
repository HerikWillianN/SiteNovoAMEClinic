const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection
(async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('Database connection established successfully.');
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    // Exit the process with an error code if we can't connect to the DB
    process.exit(1);
  } finally {
    if (client) {
      client.release();
    }
  }
})();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};