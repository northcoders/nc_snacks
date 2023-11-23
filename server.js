const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response) => {
  const { url, method } = request;
  console.log(`Received a ${method} request on ${url}`);

  if (url === '/api') {
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
              console.log(body)
          })
    } //Do not take the example any further, but encourage people to think about what would need to happen to the request body now.
  }
});

server.listen(8080, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on port: 8080');
});
