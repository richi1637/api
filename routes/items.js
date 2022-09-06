const { Router } = require('express');


const router = Router();

const {
	itemsGet,
    itemGet,
    categoriesGet,
    descriptionGet,
} = require("../controllers/items");

router.get("/items", itemsGet, categoriesGet);

router.get("/:id",itemGet, descriptionGet, categoriesGet );

module.exports = router;