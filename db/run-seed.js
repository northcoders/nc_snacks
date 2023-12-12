const seed = require('./seed.js');
const db = require('./connection.js');

seed()
    .then(() => { 
        console.log('seeding complete')
        db.end()
    })
    .catch((err) => { 
        console.log(err)
    })