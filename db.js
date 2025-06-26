
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool();            

// Catch idle-client errors so the app never hangs silently
pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error', err);
  process.exit(1);                  
});

module.exports = pool;
