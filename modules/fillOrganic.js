
module.exports = (template, ifOrganic)=>{
    let temp = template;
    // organic 
    if(ifOrganic){
        temp = temp.replace('{%NOT_ORGANIC%}',"organic");
        
    } else {
        temp = temp.replace('{%NOT_ORGANIC%}',"not-organic");
        
        // Not organic -- Card
        if(template.includes('<figure class="card">')){
            temp = temp.replace('card__detail--organic','card__detail--not-organic');
            temp = temp.replace("Organic!","Not Organic!");
        }
        // Not Organic -- product
        else {
            temp = temp.replace("Organic","Not Organic");
        }
    }
    return (temp)
}
