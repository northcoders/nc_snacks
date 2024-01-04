const express = require('express');
const app = express();
const {getSnacks, getSnackBySnackId, postSnack} = require('./controllers/snacks.controllers');
const {getVendingMachines, getVendingMachineById} = require('./controllers/vending-machines.controllers');

app.use(express.json())

app.get('/api', (request, response) => { 
  response.status(200).send({message: 'Hello world!'})
})

app.get('/api/snacks', getSnacks)

app.get('/api/snacks/:snack_id', getSnackBySnackId)

app.post('/api/snacks', postSnack)

app.get('/api/venders', getVendingMachines)

app.get('/api/venders/:venderId', getVendingMachineById)

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Route not found' });
})

app.use((err, request, response, next) => { 
  if (err.code === '22P02') {
    response.status(400).send({ message: "Invalid id type" });
  } else { 
    next(err)
  }
})

app.use((err, request, response, next) => {
  if (err.status && err.message) {
    response.status(err.status).send({ message: err.message });
  } else { 
    next(err)
  }
})

app.use((err) => { 
  res.status(500).send({message: "Internal server error"})
})

app.listen(8080, (err) => { 
  if (err) {
    console.log(err);
  } else { 
    console.log('listening on 8080!')
  }
});

module.exports = app