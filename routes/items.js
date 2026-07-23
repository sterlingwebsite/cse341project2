const router = require("express").Router();
const itemsController = require("../controllers/items");
const { itemValidationRules, validate } = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", (req, res) => {
  /* #swagger.tags = ['Items'] */
  itemsController.getAllItems(req, res);
});

router.post(
  "/",
  isAuthenticated,
  itemValidationRules(),
  validate,
  (req, res) => {
    /* #swagger.tags = ['Items'] */
    itemsController.createItem(req, res);
  },
);

router.put(
  "/:id",
  isAuthenticated,
  itemValidationRules(),
  validate,
  (req, res) => {
    /* #swagger.tags = ['Items'] */
    itemsController.updateItem(req, res);
  },
);

router.delete("/:id", isAuthenticated, (req, res) => {
  /* #swagger.tags = ['Items'] */
  itemsController.deleteItem(req, res);
});

module.exports = router;
