const { Router } = require('express');


const router = Router();

const {
	itemsGet,
    itemGet,
} = require("../controllers/items");

router.get("/items", itemsGet);

router.get("/:id",itemGet);

module.exports = router;