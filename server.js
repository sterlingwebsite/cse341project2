const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./config/db");
const app = express();

const port = process.env.PORT || 3000;

// ====== DIAGNOSTIC ROUTE FOR TESTING ======
app.get('/debug-env', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  // 1. Gather file system state
  let filesInRoot = [];
  try {
    filesInRoot = fs.readdirSync(path.join(__dirname));
  } catch (err) {
    filesInRoot = [err.message];
  }

  // 2. Map registered Express routes
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push(`${Object.keys(middleware.route.methods).toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Router sub-stacks
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push(`${Object.keys(handler.route.methods).toUpperCase()} ${handler.route.path}`);
        }
      });
    }
  });

  // 3. Return structural payload
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    rootFiles: filesInRoot,
    hasSwaggerJson: filesInRoot.includes('swagger.json'),
    activeRoutes: routes
  });
});
// ==========================================


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and active on port ${port}`);
  }
});
