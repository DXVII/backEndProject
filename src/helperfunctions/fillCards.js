
// export const fillCard = (card, jsonInstance) => {
//     const cardVars = ['IMAGE','PRODUCTNAME','QUANTITY','PRICE'];
//     const jsonVars = ['image','productName','quantity','price'];
//     let temp = card;
//     for (let i=0; i<cardVars.length; i++) {
//         // let cardRegex = `/\{\%${cardVars[i]}\%\}/g`
//         let cardRegex = new RegExp(`{%${cardVars[i]}%}`,'g')
//         let jsonKey = jsonVars[i];
//         let jsonValue = jsonInstance[jsonKey];
//         temp = temp.replace(cardRegex, jsonValue);
//     }
//     return(temp);   
// }