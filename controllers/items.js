const fetch = require('node-fetch');
const { request, response } = require('express');

const Item = require('./../models/item');

//método utilizado por endpoint /api/items/:id
const itemGet = async (req, res = response, next) => {
	const { id } = req.params;
    console.log('itemGet');
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    console.log(id);

    
    const url = `https://api.mercadolibre.com/items/${id}`;
        
	
    try{
        const results = {
            author:{
                name: "Ricardo",
                lastname: "Gauna" 
            },
        };

        const resp = await fetch(url);
        const item = await resp.json();

        const itemCondition = item.attributes.find(
            item => item.id === 'ITEM_CONDITION'
          );
        const generado = {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.price.toFixed(0),
              decimals: item.price % 1
            },
            picture: item.thumbnail,
            condition: itemCondition,
            free_shipping: item.shipping && item.shipping.free_shipping,
            
          };

        //console.log(informacion.id);
        //console.log(informacion.title);
        /*
        console.log(` informacion currency_id => ${informacion.currency_id}`);
        console.log(` informacion => ${informacion.currency_id}`);
        console.log(` informacion price => ${informacion.price.toFixed(0)}`);
        console.log(` informacion shipping.free_shipping => ${informacion.shipping.free_shipping}`);
        console.log(` informacion sold_quantity => ${informacion.sold_quantity}`);
        console.log(` informacion sold_quantity => ${informacion.price % 1}`)
        */
        /*
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
        */
        /*
        res.json({
            item
        });
        */
        results.item = generado;
        res.data = results;
        next();

    }catch (error){
        console.log('--------------------------- ERROR ---------------------------------------');
        console.log(error);
        res.send(error.message);
    }

};

const descriptionGet = async (req, res = response) => {
    
    const { id } = req.params;

    console.log('descriptionGet');
    console.log(id);

    const results = {
        author: res.data.author,
    };
    const url_description = `https://api.mercadolibre.com/items/${id}/description`;
    let plain_text = '';

    try{
        const resp_description = await fetch(url_description);
        const informacion_description = await resp_description.json();

        plain_text = informacion_description.plain_text;

        results.item = {...res.data.item,...{"description":informacion_description.plain_text}};
    }catch (error){
        console.log('--------------------------- ERROR ---------------------------------------');
        console.log(error);
    }

    //console.log('**************** plain_text *************************************');
    //console.log(plain_text);

    
    
    
    res.json({
        results
    });
}

//método utilizado por endpoint /api/items?q=:query
const itemsGet = async (req, res = response, next) => {    

    
    const query = req.query.q;
    
    console.log('itemsGet');
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    console.log(`query: ${query}`);
    
    //(limit=4) para cumplir con el requerimiento de visualizar solo 4 productos.
    const resp = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`);
    const informacion = await resp.json();

    
    const results = {
        author:{
            name: "Ricardo",
            lastname: "Gauna" 
        },
    };

    //categorias de los productos buscados
    const categorias = informacion.results.map(item => item.category_id)
    .filter((value, index, self) => self.indexOf(value) === index);

    res.category_id = categorias[0];
    
    const items = informacion.results.map(item =>{
        //console.log(`${item.id} => ${item.category_id}`);
        const itemCondition = item.attributes.find(
            item => item.id === 'ITEM_CONDITION'
          );
        const generado = {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.price.toFixed(0),
              decimals: item.price % 1
            },
            picture: item.thumbnail,
            condition: itemCondition,
            free_shipping: item.shipping && item.shipping.free_shipping,
            city_name: item.address.city_name,
          };
        
        
        
       return (generado);

    });

    
    
    
    results.items = items;
    res.data = results;
    
    next();
	
};


const categoriesGet = async (req, res = response) => {
   
    const results = {
        author: res.data.author,
    };

    //console.log(res.category_id);    
    
    const url = `https://api.mercadolibre.com/categories/${res.category_id}`
    
    console.log(url);
    
    const resp = await fetch(`https://api.mercadolibre.com/categories/${res.category_id}`);
    const informacion = await resp.json();
    
    //console.log(informacion);

    const categories = informacion.path_from_root.map(categorie =>{
        const generado = {
            name: categorie.name,
        }
        return (generado);
    });

    results.categories = categories;

    results.items = res.data.items;
    
    res.json({
        results
    });
    
    
}

module.exports = {
    itemGet,
    descriptionGet,
    itemsGet,
    categoriesGet,
};