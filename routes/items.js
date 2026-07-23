const router = require("express").Router();
const itemsController = require("../controllers/items");
const { itemValidationRules, validate } = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", itemsController.getAllItems);

router.post(
  "/",
  isAuthenticated,
  itemValidationRules(),
  validate,
  itemsController.createItem,
);

router.put(
  "/:id",
  isAuthenticated,
  itemValidationRules(),
  validate,
  itemsController.updateItem,
);

router.delete("/:id", isAuthenticated, itemsController.deleteItem);

module.exports = router;
