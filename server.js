require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./config/db");
const app = express();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const GitHubStrategy = require("passport-github2").Strategy;

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "cse341SecretKey",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const isProduction = process.env.RENDER !== undefined;

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

const callbackUrl = isProduction
  ? "https://cse341project2-0k9h.onrender.com/github/callback"
  : `http://localhost:${port}/github/callback`;

passport.use(
  new GitHubStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, userDone) => {
  userDone(null, user);
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
