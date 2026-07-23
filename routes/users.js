const router = require("express").Router();
const usersController = require("../controllers/users");
const {
  userValidationRules,
  validateUser,
} = require("../middleware/validateUsers");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", (req, res) => {
  /* #swagger.tags = ['Users'] */
  usersController.getAllUsers(req, res);
});
router.post(
  "/",
  isAuthenticated,
  userValidationRules(),
  validateUser,
  (req, res) => {
    /* #swagger.tags = ['Users'] */
    usersController.createUser(req, res);
  },
);
router.put(
  "/:id",
  isAuthenticated,
  userValidationRules(),
  validateUser,
  (req, res) => {
    /* #swagger.tags = ['Users'] */
    usersController.updateUser(req, res);
  },
);
router.delete("/:id", isAuthenticated, (req, res) => {
  /* #swagger.tags = ['Users'] */
  usersController.deleteUser(req, res);
});

module.exports = router;
