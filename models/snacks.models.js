const fs = require('fs/promises')

const fetchSnackBySnackId = (id) => { 
    return fs.readFile(`${__dirname}/../data/snack-data.json`).then((fileContents) => { 
        const parsedSnacks = JSON.parse(fileContents)
        return parsedSnacks.filter((snack) => { 
            return snack.snack_id === +id
        })[0]
    })
};

module.exports = fetchSnackBySnackId