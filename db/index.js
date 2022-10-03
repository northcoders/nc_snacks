const { Pool } = require('pg');
const pool = new Pool();

if (!process.env.PGDATABASE) {
  throw new Error('No PGDATABASE configured');
}

module.exports = pool;
