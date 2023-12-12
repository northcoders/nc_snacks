const createRef = (categories) => { 
    const refObj = {}
    categories.forEach((category) => { 
        refObj[category.category_name] = category.category_id
    })
    return refObj   
};

const formatSnacksData = (snacks, ref) => {
    return snacks.map((snack) => { 
        console.log(snack)
        return [
            snack.snack_name,
            snack.snack_description,
            snack['price-in-pence'],
            ref[snack.category]
        ]
    })
}

module.exports = {createRef, formatSnacksData}