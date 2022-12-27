// building a simple http server
const fs = require('fs');
const http = require('http');
const url = require('url');

// -- Files

// -- Server
// create callback function server for every single request call
const server = http.createServer((req, res) => {
    const pathName = req.url.toLowerCase();
    let message = ""
    if (pathName === "/" || pathName === "/overview"){
        message = "<h1>Navigating to Overview</h1>";
        res.writeHead(200);
    } 
    else if(pathName === "/product"){
        message = "<h1>Navigating to Product</h1>";
        res.writeHead(200);
    } 
    else {
        message = "<h1>Page not found</h1>"
        res.writeHead(404,{'Content-type':'text/html'});
    }
    res.end(`Hello from the server!\n  Path detected: ${pathName}\n${message}`);
});

server.listen(3000,'127.0.0.1',() => {
    console.log('listening to port 3000');
});