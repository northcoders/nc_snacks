# Supertest

​
The aim of this **Seminar** is to implement a **POST** request using **Supertest**. In the lecture a get request will have been covered so you will be building upon that.
​
Important New Points:
​

- building of test with **Supertest**
  - making sure that we have supertests **.send()** method
  - making sure that we test what we are expecting to see(don't console.log before writing tests)
- introduction of **dotenv** and **git-ignorning**
- ***
  ​

## Writing the test

​

- First we will have to install **Supertest**
  ​
  > npm install -D supertest
  > ​
- require in **supertest** on a variable called request
- require in app
  ​

```js
const request = require("supertest")
const app = require("../app")
​
describe("POST REQUEST", () => {
  test("POST: 201 - request to this endpoint will create a new house and respond with that new house", () => {
    const newHouse = {
      house_name: "Example Name",
      founder: "Name",
      animal: "Example Animal",
    }
    return (
      request(app)
        .post("/api/houses")
        .send(newHouse)
        .expect(201)
        //you can tell them that responses will come back on a key called body
        .then(({ body }) => {
          const createdHouse = body.house
          expect(createdHouse).toEqual({
            house_id: 5,
            house_name: "Example Name",
            founder: "Name",
            animal: "Example Animal",
          })
        })
    )
  })
})
```

​

> Take this oppurtunity to to show the test script and explain what is happening
> ​

- mention that will look at the setting of the PGDATABASE a bit later on
  ​
- **Run the test file**
  ​
  > You will get a 404 which should lead you nicely onto building the endpoint!
  > ​

---

​

## Building The EndPoint/Controllers/Model

​

> First we will have to create the Endpoint
> ​

```js
const express = require("express")
const { getHouses, postHouse } = require("./controllers/houses.controllers")
const app = express()
​
app.get("/api/houses", getHouses)
​
app.post("/api/houses", postHouse)
​
module.exports = app
```

​

> It might be a good idea here to remind them that this is a **Post** request and we have sent something on the body of this request. Hopefully they should remind you to put **app.use(express.json())\***
> ​

```js
const express = require("express")
const { getHouses, postHouse } = require("./controllers/houses.controllers")
const app = express()
​
app.use(express.json())
​
app.get("/api/houses", getHouses)
​
app.post("/api/houses", postHouse)
​
module.exports = app
```

​

> run the test again and you should get an error that controller should be a function but instead its undefined
> ​

## <ins> Build Controller

​

- place a **console.log("in controller")** inside so that we know we are getting inside here
  ​
  > Once you have done this ask them what we are going to need to do next
  > ​
- They should say that we will need to create a model
  ​

```js
const { fetchHouses, createHouse } = require("../models/houses.models")
​
// After/whilst making this, you can lead them towards talking about the behavior of the model and guide them towards getting the new house off  the request body and passing it into the model
​
exports.postHouse = (req, res) => {
  const newHouse = req.body
  createHouse(newHouse)
}
```

​

> You should get a 500 error - this is because we have not created the model yet. We got a lovely error message from **Express** when we did this in the controller, but we will only get a 500 back this time

## ​

​

- create the model and **console.log()** inside of it to show that we are getting this far
  ​

```js
exports.createHouse = (newhouse) => {
  console.log('in model');
};
```

## ​

​

## <ins> Building The connection.js file

​

> It would good to bring attention back to the **package.json** and show that we are not setting the PGDATABASE in the script
> ​

- we want to keep information about our database secret
- in this example it's not the end of the world, but there could be passwords and other information that we don't want other people to see, but we still want to be able to use in our programs
- this is where we can use **.env** files
  ​
  > dotenv will allow us to load private environment variables from a **.env** file into the **process.env**
  > ​

## <ins> Start building the file

​

> Go through creating this file and answer any questions that get posed
> ​

```js
const { Pool } = require("pg")
​
// this variable represents the environment we are working in
// if we run our test file - this gets set to 'test' by default
// if we don't set the node env then - this variable will default to 'dev'
const ENV = process.env.NODE_ENV || 'dev'
​
// Before doing this point - create a .env file and set the PGDATABASE environment variable in there
require("dotenv").config(
  path: `${__dirname}/../.env.${ENV}`
)
​
if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set!")
}
​
const db = new Pool()
​
module.exports = db
```

## ​

​

## Head back to the model and start building query

​

> you can console.log the newHouse variable in to show them what it looks like
> ​

- destructure the values off
  ​

```js
exports.createHouse = (newhouse) => {
  const { house_name, founder, animal } = newhouse;
};
```

​

> At this point it would be good to open a discussion on what type of **SQL** query we are going to want to use to add our new house to the database
> ​

- They should eventually suggest the **INSERT INTO** query
  ​
- When you start building the query, this will open up the topic of **SQL Injection** - we can remind them that **node postgres** has **parameterized queries**. Here we use parameters in place of the values we want to insert. These parameters are safely subsituted in to the query by the server.
  ​

```js
exports.createHouse = (newhouse) => {
  const { house_name, founder, animal } = newhouse
​
  db.query(
    "INSERT INTO houses (house_name, founder, animal) VALUES ($1, $2, $3) RETURNING*;",
    [house_name, founder, animal]
  ).then((houses) => {
    //it's an array with one house inside
    //WE ONLY WANT THE HOUSE
    return houses.rows[0]
  })
}
```

​

> This will initially throw a **500** error which isn't that helpful - but it essentially means we have broken something and our code isn't working as expected - **we need to return our db.query()**
> ​

```js
exports.createHouse = (newhouse) => {
  const { house_name, founder, animal } = newhouse
​
  return db
    .query(
      "INSERT INTO houses (house_name, founder, animal) VALUES ($1, $2, $3) RETURNING*;",
      [house_name, founder, animal]
    )
    .then((houses) => {
      //it's an array with one house inside
      //WE ONLY WANT THE HOUSE
      return houses.rows[0]
    })
}
```

## ​

​

## <ins> Sending Back The Response

​

> It's a good point to check the test file to make sure what key we are expecting on the body that is returned as a few of them will have made that mistake previously
> ​

```js
exports.postHouse = (req, res) => {
  const newHouse = req.body;
  createHouse(newHouse)
    .then((house) => {
      res.status(201).send({ house });
    })
    .catch((err) => {
      console.log(err, '<--- error');
    });
};
```
