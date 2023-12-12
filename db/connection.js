const { Pool } = require('pg');
const pool = new Pool();

function getSnacks() {
    pool.query('SELECT * FROM snacks;').then(({rows: snacks}) => {
        console.log(snacks);
        pool.end()
    });
}

getSnacks()

function getSnackById(id) { 
    pool.query(`SELECT * FROM snacks WHERE snack_id=${id}`).then(({ rows: [snack] }) => {
        console.log(snack)
        pool.end()
    })

}

// getSnackById(3)