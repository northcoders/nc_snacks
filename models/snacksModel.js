const pool = require('../db/index');

function fetchSnacks() {
  return pool.query('SELECT * FROM snacks').then(({ rows: snacks }) => {
    return snacks;
  });
}

module.exports = fetchSnacks;
