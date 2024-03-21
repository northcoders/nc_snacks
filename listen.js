const app = require("./app");

app.listen(9080, (err) => { 
  if (err) {
    console.log(err);
  } else { 
    console.log('listening on 8080!')
  }
});