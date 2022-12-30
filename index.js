// -- Libraries
const fs = require('fs');
const http = require('http');
const url = require('url');

// -- Functions
// import { fillCard } from "./src/helperfunctions/fillCards.js";

const fillCard = (card, jsonInstance) => {
    const cardVars = ['ID','IMAGE','PRODUCTNAME','QUANTITY','PRICE'];
    const jsonVars = ['id','image','productName','quantity','price'];
    let temp = card;
    for (let i=0; i<cardVars.length; i++) {
        let cardRegex = new RegExp(`{%${cardVars[i]}%}`,'g')
        let jsonKey = jsonVars[i];
        let jsonValue = jsonInstance[jsonKey];
        temp = temp.replace(cardRegex, jsonValue);
    }
    if(!jsonInstance.organic){
        temp = temp.replace('{%NOT_ORGANIC%}',"not-organic");
        temp = temp.replace('card__detail--organic','card__detail--not-organic');
        temp = temp.replace("Organic!","Not Organic!");
    } else{
        temp = temp.replace('{%NOT_ORGANIC%}',"organic");
    } 
    return(temp)
}

// -- Files
const tempOverview = fs.readFileSync(`${__dirname}/src/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/src/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/src/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/src/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);

let cardsHTML = dataObject.map(el => fillCard(tempCard, el));

// -- Server
const content_HTML = {'Content-type': 'text/html'};
const content_JSON = {'Content-type': 'application/json'};

// Creates a callback function server for every single request call
const server = http.createServer((req, res) => {
    const pathName = req.url.toLowerCase();

    // -- Overview Page
    if (pathName === "/" || pathName === "/overview"){
        let message = "<h1>Navigating to Overview</h1>";
        res.writeHead(200, content_HTML);
        let filledOverview = tempOverview.replace(`{%PRODUCT_CARDS%}`,cardsHTML)
        res.end(filledOverview);
    } 

    else if (pathName === "/cards"){
        res.writeHead(200);
        res.end(cardsHTML.toString());
    }

    else if(pathName === "/product"){
        res.writeHead(200, content_HTML);
        res.end(tempProduct);
    }


    // API
    else if (pathName === '/api') {
        res.writeHead(200, content_JSON);
        res.end(data);
    }
    
    // Not found
    else {
        let message = "<h1>Page not found</h1>"
        res.writeHead(404,content_HTML);
        res.end(`Hello from the server!\n  Path detected: ${pathName}\n${message}`);
    }
    
});

server.listen(3000,'127.0.0.1',() => {
    console.log('listening to port 3000');
});