const db = require('./connection.js');
const format = require("pg-format")
const {categoriesData, snacksData} = require('./data')

const seed = () => { 
    return db.query('DROP TABLE IF EXISTS snacks;').then(() => { 
        return db.query('DROP TABLE IF EXISTS categories')
    }).then(() => { 
        return db.query(`CREATE TABLE categories(
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(40) NOT NULL)`)
    }).then(() => { 
        return db.query(`CREATE TABLE snacks(
            snack_id SERIAL PRIMARY KEY,
            snack_name VARCHAR(40) NOT NULL,
            snack_description VARCHAR(100),
            price_in_pence INT,
            category_id INT REFERENCES categories(category_id))`
        )
    }).then(() => {
        const formattedCategories = categoriesData.map((category) => { 
            return [category.category_name]
        })
        const insertCategoriesQueryString = format(`
            INSERT INTO categories (category_name) VALUES %L RETURNING *;`,
            formattedCategories)
        return db.query(insertCategoriesQueryString)
    }).then(({ rows }) => { 
        console.log(rows)
        // how are we going to give each snack a category id?
    })
};

module.exports = seed;