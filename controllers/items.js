const fetch = require('node-fetch');
const { request, response } = require('express');

const Item = require('./../models/item');

//método utilizado por endpoint /api/items/:id
const itemGet = async (req, res = response) => {
	const { id } = req.params;
    console.log('itemGet');
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    console.log(id);

    
    const url = `https://api.mercadolibre.com/items/${id}`;
        
	const url_description = `https://api.mercadolibre.com/items/${id}/description`;

    let plain_text = '';
    try{
        const resp_description = await fetch(url_description);
        const informacion_description = await resp_description.json();

        plain_text = informacion_description.plain_text;
    }catch (error){
        console.log('--------------------------- ERROR ---------------------------------------');
        console.log(error);
    }

    //console.log('**************** plain_text *************************************');
    //console.log(plain_text);

    try{
        const resp = await fetch(url);
        const informacion = await resp.json();

        //console.log(informacion.id);
        //console.log(informacion.title);
        
        const product = new Item(
            informacion.id, 
            informacion.title, 
            informacion.thumbnail,
            '',
            '',
            '', 
            plain_text);

        const firma = {
            author:{
                name: "Ricardo",
                lastname: "Gauna" 
            }
        };

        const item = {...firma,...product};
        //console.log(item);        
    
        res.json({
            item
        });

    }catch (error){
        console.log('--------------------------- ERROR ---------------------------------------');
        console.log(error);
        res.send(error.message);
    }

};

//método utilizado por endpoint /api/items?q=:query
const itemsGet = async (req, res = response) => {
    
    const query = req.query.q;
    
    console.log('itemsGet');
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    console.log(query);
    
    //(limit=4) para cumplir con el requerimiento de visualizar solo 4 productos.
    const resp = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=1`);
    const informacion = await resp.json();

    const firma = {
        author:{
            name: "Ricardo",
            lastname: "Gauna" 
        }
    };

    const informacion2 = informacion.results.map(item =>{
        //console.log(item);
        /*const price = item.prices.map(price => {
            console.log(price);
        })*/
        console.log(item.prices.prices.currency);
        console.log(item.prices.prices);
        console.log('**************************');
        console.log(item.prices.prices.amount);
        const producto = new Item(item.id,item.title,item.thumbnail,item.condition);
        return {...firma,...producto};
    });

    /*
    informacion.results.map(item =>{
        const listado = {...firma,...item}
    });
    */

    res.json({
        informacion2
    });
	
};

module.exports = {
    itemGet,
    itemsGet,
};