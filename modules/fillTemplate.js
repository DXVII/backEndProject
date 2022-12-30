
const fillOrganic = require(`./fillOrganic`);

module.exports = (template, jsonInstance) => {
    const templateVars = ['ID','PRODUCTNAME','IMAGE','FROM','NUTRIENTS','QUANTITY','PRICE','DESCRIPTION'];
    const jsonVars = ['id','productName','image','from','nutrients','quantity','price','description'];
    // fill all 
    let temp = template;
    for (let i=0; i<templateVars.length; i++) {
        let templateRegex = new RegExp(`{%${templateVars[i]}%}`,'g')
        let jsonKey = jsonVars[i];
        let jsonValue = jsonInstance[jsonKey];
        temp = temp.replace(templateRegex, jsonValue);
    }
    temp = fillOrganic(temp, jsonInstance.organic);
    return(temp)
}