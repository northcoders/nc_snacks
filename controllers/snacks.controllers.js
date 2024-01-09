const fetchSnackBySnackId = require("../models/snacks.models");

const getSnackBySnackId = (request, response) => { 
    const { snack_id } = request.params
    fetchSnackBySnackId(snack_id).then((snack) => { 
        response.status(200).send({snack: snack})
    })
};

module.exports = getSnackBySnackId