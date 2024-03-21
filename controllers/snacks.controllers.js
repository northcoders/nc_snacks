const { fetchSnacks, fetchSnackBySnackId, addSnack } = require("../models/snacks.models");

const getSnacks = (request, response, next) => { 
    const { category_id, sort_by } = request.query
    fetchSnacks(category_id, sort_by).then((snacks) => { 
     response.status(200).send({ snacks })
    }).catch((err) => { 
        next(err)
    })
}
const getSnackBySnackId = (request, response, next) => { 
    const { snack_id } = request.params
    fetchSnackBySnackId(snack_id).then((snack) => { 
        response.status(200).send({ snack })
    }).catch((err) => { 
        next(err)
    })
};

const postSnack = (request, response) => {
    const newSnack = request.body;
    addSnack(newSnack).then(() => {
        response.status(201).send({ newSnack });
    })
}


module.exports = {getSnacks, getSnackBySnackId, postSnack}