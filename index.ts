// building a simple http server
const fs = require('fs');
const http = require('http');
const url = require('url');

// -- Files
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const productData = JSON.parse(data);

// -- Server
// create callback function server for every single request call
const server = http.createServer((req, res) => {
    const pathName = req.url.toLowerCase();

    // -- Overview Page
    if (pathName === "/" || pathName === "/overview"){
        let message = "<h1>Navigating to Overview</h1>";
        res.writeHead(200);
        res.end(`Hello from the server!\n  Path detected: ${pathName}\n${message}`);
    } 


    else if(pathName === "/product"){
        res.end(`Hello from the Product server!`);
    }


    else if(pathName === "/api"){
      res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
    } 
    // else if(pathName === "/api"){
    //     const productData = fs.readFileSync(`./dev-data/data.json`,'utf-8',(err, data) => {
    //         let productData = JSON.parse(data);
    //     });
    //     res.writeHead(200, {
    //         'Content-type': 'application/json'
    //     });
    // res.end(productData);
    // } 
    else {
        let message = "<h1>Page not found</h1>"
        res.writeHead(404,{'Content-type':'text/html'});
        res.end(`Hello from the server!\n  Path detected: ${pathName}\n${message}`);
    }
    
});

server.listen(3000,'127.0.0.1',() => {
    console.log('listening to port 3000');
});