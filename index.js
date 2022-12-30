// -- Libraries
const fs = require('fs');
const http = require('http');
const url = require('url');

// -- Functions
const fillTemplate = require(`./modules/fillTemplate`);


// const fillTemplate = (template, jsonInstance) => {
//     const templateVars = ['ID','PRODUCTNAME','IMAGE','FROM','NUTRIENTS','QUANTITY','PRICE','DESCRIPTION'];
//     const jsonVars = ['id','productName','image','from','nutrients','quantity','price','description'];
//     // fill all 
//     let temp = template;
//     for (let i=0; i<templateVars.length; i++) {
//         let templateRegex = new RegExp(`{%${templateVars[i]}%}`,'g')
//         let jsonKey = jsonVars[i];
//         let jsonValue = jsonInstance[jsonKey];
//         temp = temp.replace(templateRegex, jsonValue);
//     }
//     temp = fillOrganic(temp, jsonInstance.organic);
//     return(temp)
// }

// const fillOrganic = (template, ifOrganic)=>{
//     let temp = template;
//     // organic 
//     if(ifOrganic){
//         temp = temp.replace('{%NOT_ORGANIC%}',"organic");
        
//     } else {
//         temp = temp.replace('{%NOT_ORGANIC%}',"not-organic");
        
//         // Not organic -- Card
//         if(template.includes('<figure class="card">')){
//             temp = temp.replace('card__detail--organic','card__detail--not-organic');
//             temp = temp.replace("Organic!","Not Organic!");
//         }
//         // Not Organic -- product
//         else {
//             temp = temp.replace("Organic","Not Organic");
//         }
//     }
//     return (temp)
// }

// -- Files
const tempOverview = fs.readFileSync(`${__dirname}/src/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/src/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/src/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/src/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);

let cardsHTML = dataObject.map(el => fillTemplate(tempCard, el));

// -- Server
const content_HTML = {'Content-type': 'text/html'};
const content_JSON = {'Content-type': 'application/json'};

// Creates a callback function server for every single request call
const server = http.createServer((req, res) => {
    const urlPath = req.url;
    const urlHost = "http://"+req.headers.host;
    const urlObj = new URL(urlPath, urlHost);
    const pathName = urlObj.pathname
    const searchParams = new URLSearchParams(urlObj.searchParams);
    const paramMap = new Map(searchParams)
    // for(const el of searchParams){
    //     console.log(el);
    // }
    // -- Overview Page
    if (pathName === "/" || pathName === "/overview"){
        let message = "<h1>Navigating to Overview</h1>";
        res.writeHead(200, content_HTML);
        let filledOverview = tempOverview.replace(`{%PRODUCT_CARDS%}`,cardsHTML)
        res.end(filledOverview);
    } 

    else if(pathName === "/product/" || pathName === "/product"){
        let queryID = parseInt(paramMap.get('id'));
        try {
            filledProduct = fillTemplate(tempProduct, dataObject[queryID]);
        } catch(err){
            filledProduct = tempOverview.replace(`{%PRODUCT_CARDS%}`,cardsHTML);
        }
        res.writeHead(200, content_HTML);
        fs.writeFileSync(`${__dirname}/cache/filledProductID${queryID}.html`, filledProduct);
        res.end(filledProduct);
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