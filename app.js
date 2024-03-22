const express = require('express');
const app = express();
const {getSnacks, getSnackBySnackId, postSnack} = require('./controllers/snacks.controllers');

app.use(express.json())

app.get('/api', (request, response) => { 
  response.status(200).send({ message: 'Hello world!' })
})

app.get('/api/snacks', getSnacks)

app.get('/api/snacks/:snack_id', getSnackBySnackId)

app.post('/api/snacks', postSnack)

app.listen(8080, (err) => { 
  if (err) {
    console.log(err);
  } else { 
    console.log('listening on 8080!')
  }
});