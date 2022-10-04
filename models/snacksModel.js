const pool = require('../db/index');

exports.fetchSnacks = () => {
  return pool.query('SELECT * FROM snacks').then(({ rows: snacks }) => {
    return snacks;
  });
};

exports.addSnack = (newSnack) => {
  const { snack_name, snack_description } = newSnack;
  return pool
    .query(
      `INSERT INTO snacks (snack_name, snack_description) VALUES ($1, $2) RETURNING *;`,
      [snack_name, snack_description]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
