
Construir los siguientes endpoints para ser utilizados desde las vistas:
○ /api/items?q=:query
■ Debe consultar el siguiente endpoint:
https://api.mercadolibre.com/sites/MLA/search?q=:query
Y devolver los resultados en el formato indicado:
{
“author”: {
“name”: String
“lastname”: String
},
categories: [String, String, String, ...],
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
{...},
{...},
{...}
]
}
○ /api/items/:id
■ Debe consultar los siguientes endpoints:
https://api.mercadolibre.com/items/:id
https://api.mercadolibre.com/items/:id​/description
Y devolver los resultados en el formato indicado:
{
“author”: {
    “name”: String
    “lastname”: String
},
“item”: {
    "id": String,
    "title": String,
    "price": {
        "currency": String,
        "amount": Number,
        "decimals": Number,
    },
    “picture”: String,
    "condition": String,
    "free_shipping": Boolean,
    "sold_quantity", Number
    "description": String
}
}