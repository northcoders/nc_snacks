const express = require('express');
const app = express();
const fs = require('fs/promises')

app.use(express.json())

app.get('/api', (request, response) => { 
  response.status(200).send({message: 'Hello world!'})
})

app.get('/api/snacks', (request, response) => { 
  fs.readFile('./data/snack-data.json', 'utf-8')
    .then((fileContents) => { 
      const snacks = JSON.parse(fileContents)
      response.status(200).send({snacks})
    })
})

<<<<<<< HEAD
app.get('/api/snacks/:snack_id', (request, response) => {
  const { snack_id } = request.params;
  fs.readFile('./data/snack-data.json', 'utf-8')
    .then((fileContents) => {
      const snacks = JSON.parse(fileContents);
      const singleSnack = snacks.filter((snack) => {
        return snack.snack_id === +snack_id;
      })[0];
      response.status(200).send({ snack: singleSnack });
    });
})
=======
app.get('/api/snacks/:snack_id', getSnackBySnackId)
>>>>>>> 2ad29186cce9e41540dc4fdd256d1f27aa7612dc

app.post('/api/snacks', (request, response) => {
  const newSnack = request.body;
  fs.readFile('data/snack-data.json', 'utf-8').then((fileContents) => {
    const snacks = JSON.parse(fileContents);
    const allSnacks = [...snacks, newSnack];
    return fs.writeFile('data/snack-data.json', JSON.stringify(allSnacks, null, 4));
  }).then(() => { 
    response.status(201).send({"snack added": newSnack})
  })
})

app.listen(8080, (err) => { 
  if (err) {
    console.log(err);
  } else { 
    console.log('listening on 8080!')
  }
});