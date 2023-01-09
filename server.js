const http = require("http");

const app = require("./app");
const server = http.createServer(app);

require('dotenv').config

let port = process.env.PORT || 7015

server.listen(port, () => {
  console.log('http://127.0.0.1:' + port + '/api/v1')
})