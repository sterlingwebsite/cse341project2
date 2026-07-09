const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./config/db");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/", require("./routes"));
app.use(require("./middleware/errorHandler").errorHandler);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and active on port ${port}`);
  }
});
