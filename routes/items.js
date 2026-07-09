const router = require("express").Router();
const itemsController = require("../controllers/items");
const { itemValidationRules, validate } = require("../middleware/validate");

router.get("/", itemsController.getAllItems);
router.post("/", itemValidationRules(), validate, itemsController.createItem);

router.put("/:id", itemValidationRules(), validate, itemsController.updateItem);
router.delete("/:id", itemsController.deleteItem);

module.exports = router;
