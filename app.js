const express = require('express');
const app = express();
const fs = require('fs/promises')

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

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((request, response) => {
//   const { url, method } = request;
//   console.log(`Received a ${method} request on ${url}`);

//   if (url === '/api/snacks') {
//     if (method === 'GET') {
//       fs.readFile('./data/snack-data.json', 'utf-8', (err, fileContents) => {
//         if (err) console.log(err);
//         else {
//           const snacks = JSON.parse(fileContents);
//           response.setHeader('Content-Type', 'application/json');
//           response.statusCode = 200;
//           response.write(JSON.stringify({ snacks }));
//           response.end();
//         }
//       });
//     }
//       if (method === 'POST') {
//           let body = ""
//           request.on('data', (data) => { 
//               body += data
//           })
//           request.on('end', () => { 
//             let newSnack = JSON.parse(body)
//             fs.readFile('./data/snack-data.json', 'utf-8',(err, fileContents) => {
//               if (err) {
//                 console.log(err);
//               } else { 
//                 const snacks = JSON.parse(fileContents)
//                 const newSnacks = [...snacks, newSnack]
//                 fs.writeFile('./data/snack-data.json', JSON.stringify(newSnacks, null, 4), (err) => {
//                   if (err) {
//                     console.log(err);
//                   } else { 
//                       response.setHeader('Content-Type', 'application/json');
//                       response.statusCode = 201;
//                       response.write(JSON.stringify({ snack: newSnack }));
//                       response.end();
//                   }
//                  })
//               }
//              })
//           })
//     } //Do not take the example any further, but encourage people to think about what would need to happen to the request body now.
//   }
// });

// server.listen(9080, (err) => {
//   if (err) console.log(err);
//   else console.log('Server listening on port: 9080');
// });

