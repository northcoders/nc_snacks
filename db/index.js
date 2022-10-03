const { Pool } = require('pg');
const pool = new Pool();

if (!process.env.PGDATABASE) {
  throw new Error('No PGDATABASE configured');
}

module.exports = pool;

// function getSnacks() {
//   pool.query('SELECT * FROM snacks').then(({ rows: snacks }) => {
//     console.log(snacks);
//     pool.end();
//   });
// }
// getSnacks();
