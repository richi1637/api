class Item{
    
    constructor(id,title,picture,condition,free_shipping,description){
        
            this.id = id,
            this.title = title,
            this.picture = picture,
            this.condition = condition,
            this.free_shipping = free_shipping,
            this.description = description                        
    }
    //currency,amount,decimals
}

class ItemPrice extends Item {
    constructor(id,title,price,currency,amount,decimals,) {
        super(id,title,price,currency,amount,decimals);
        this.currency = currency,
        this.amount = amount,
        this.decimals = decimals   
    }    
}


module.exports = Item, ItemPrice;

/*
items: [
    {
        "id": String,
        "title": String,
        "price": {
        "currency": String,
        "amount": Number,
        "decimals": Number
    },
    “picture”: String,
    "condition": String,
    "free_shipping": Boolean
},

*/