const express = require('express');
const app = express();

app.use(express.json())

app.get('/api', (request, response) => { 
  response.status(200).send({message: 'Hello world!'})
})

app.get('/api/snacks', (request, response) => { 
  const { snack_name } = request.query;
  console.log(snack_name)
  // console log this and then ask them to think about what comes next
})

app.get('/api/snacks/:snack_id', (request, response) => { 
  const { snack_id } = request.params;
  console.log(snack_id)
  // console log this and then ask them to think about what comes next
})

app.post('/api/snacks', (request, response) => {
  console.log(request.body)
  // add/remove app.use(express.json()) to demonstrate what's happening here.
})

app.listen(8080, (err) => { 
  if (err) {
    console.log(err);
  } else { 
    console.log('listening on 8080!')
  }
});