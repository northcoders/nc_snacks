const pool = require('../db/index');

function fetchSnacks() {
  return pool.query('SELECT * FROM snacks').then(({ rows: snacks }) => {
    return snacks;
  });
}

function addSnack(snack) {
  const { snack_name, snack_description } = snack;

  return pool
    .query(
      `INSERT INTO snacks (
    snack_name,
    snack_description) VALUES ($1, $2) RETURNING *`,
      [snack_name, snack_description]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { fetchSnacks, addSnack };
