const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);

router.get("/api-docs", (req, res) => {
  /* #swagger.ignore = true */
  res.send(swaggerUi.generateHTML(swaggerDocument));
});

module.exports = router;
