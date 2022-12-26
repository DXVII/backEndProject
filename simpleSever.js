// building a simple http server
const http = require('http');
// -- Files

// -- Server
// create callback function server for every single request call
const server = http.createServer((req, res) => {
    console.log(req);
    res.end('Hello from the server')
});

server.listen(3000,'127.0.0.1',() => {
    console.log('listening to port 3000');
});