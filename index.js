// building a simple http server
const fs = require('fs');
const http = require('http');
const url = require('url');

// -- Files

// -- Server
// create callback function server for every single request call
const server = http.createServer((req, res) => {
    const pathName = req.url
    res.end(`Hello from the server!\nPath detected: ${pathName}`);
});

server.listen(3000,'127.0.0.1',() => {
    console.log('listening to port 3000');
});