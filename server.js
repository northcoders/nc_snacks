const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response) => {
  const { url, method } = request;
  console.log(`Received a ${method} request on ${url}`);

  if (url === '/') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.write(JSON.stringify({ msg: 'hello world' }));
    response.end();
  }

  if (url === '/api/snacks') {
    if (method === 'GET') {
      fs.readFile('./data/snack-data.json', 'utf-8', (err, fileContents) => {
        if (err) console.log(err);
        else {
          const snacks = JSON.parse(fileContents);
          response.setHeader('Content-Type', 'application/json');
          response.statusCode = 200;
          response.write(JSON.stringify({ snacks }));
          response.end();
        }
      });
    }
      if (method === 'POST') {
          let body = ""
          request.on('data', (data) => { 
              body += data
          })
          request.on('end', () => { 
            let newSnack = JSON.parse(body)
            fs.readFile('./data/snack-data.json', 'utf-8',(err, fileContents) => {
              if (err) {
                console.log(err);
              } else { 
                const snacks = JSON.parse(fileContents)
                const newSnacks = [...snacks, newSnack]
                fs.writeFile('./data/snack-data.json', JSON.stringify(newSnacks, null, 4), (err) => {
                  if (err) {
                    console.log(err);
                  } else { 
                      response.setHeader('Content-Type', 'application/json');
                      response.statusCode = 201;
                      response.write(JSON.stringify({ snack: newSnack }));
                      response.end();
                  }
                 })
              }
             })
          })
    } //Do not take the example any further, but encourage people to think about what would need to happen to the request body now.
  }
});

server.listen(8080, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on port: 8080');
});


// const server = http.createServer((req, res) => {
//   const { url, method } = req;
//   if (url === '/') {
//     // ...
//   }
//   if (url === '/api/cats') {
//     if (method === 'GET') {
//       // ...
//     }
//     if (method === 'POST') {
//       let body = '';
//       req.on('data', (packet) => {
//         body += packet.toString();
//       });
//       req.on('end', () => {
//         const newCat = JSON.parse(body);
//         fs.readFile('data/cats.json', 'utf-8', (err, fileContents) => {
//           if (err) console.log(err);
//           else {
//             const cats = JSON.parse(fileContents);
//             const newCats = [...cats, newCat];
//             fs.writeFile('data/cats.json', JSON.stringify(newCats), (err) => {
//               if (err) console.log(err);
//               else {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.statusCode = 201;
//                 res.write(JSON.stringify({ cat: addedCat }));
//                 res.end();
//               }
//             });
//           }
//         });
//       });
//     }
//   }
// });