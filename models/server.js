const express = require("express");
const cors = require("cors");


class Server {
    constructor(){
        this.itemsPath = '/api/items';

		this.app = express();        

		this.middlewares();

        //rutas
		this.routes();
    }

	middlewares() {
		//this.app.use(express.static("public"));

		this.app.use(cors());

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

    //agrgamos la Rutas y a cual Path apunta
	routes() {
		console.log(this.itemsPath);
		this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});
		this.app.use( this.itemsPath, require('../routes/items') );
		
	}

    listen() {
		this.app.listen(8080, () => {
			console.log("Server MELI onLine");
		});
	}
}

module.exports = Server;