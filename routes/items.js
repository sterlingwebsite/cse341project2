const router = require("express").Router();
const itemsController = require("../controllers/items");

router.get("/", itemsController.getAllItems);

router.post("/", itemsController.createItem);

module.exports = router;
