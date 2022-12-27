// building a simple http server
const fs = require('fs');
const http = require('http');
const url = require('url');

const content_HTML = {'Content-type': 'text/html'};
const content_JSON = {'Content-type': 'application/json'};
// -- Files
// const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
// const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
// const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const data = fs.readFileSync(`./dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

// -- Server
// create callback function server for every single request call
const server = http.createServer((req, res) => {
    const pathName = req.url.toLowerCase();

    // -- Overview Page
    if (pathName === "/" || pathName === "/overview"){
        let message = "<h1>Navigating to Overview</h1>";
        res.writeHead(200, content_HTML);
        res.end(`Hello from the server!\n  Path detected: ${pathName}\n${message}`);
    } 


    else if(pathName === "/product"){
        res.end(`Hello from the Product server!`);
    }


    // API
    else if (pathName === '/api') {
        res.writeHead(200, content_JSON);
        res.end(data);

    // Not found
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
        res.writeHead(404,content_HTML);
        res.end(`Hello from the server!\n  Path detected: ${pathName}\n${message}`);
    }
    
});

server.listen(3000,'127.0.0.1',() => {
    console.log('listening to port 3000');
});