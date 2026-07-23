const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res, next) => {
  /* #swagger.description = "<p style='color: #b0b5bc;'>CLICK THIS ARROW TO LOG IN LOCALLY: <a href='http://localhost:3000/login' target='_blank' style='color: #ffffff; background-color: #24292e; padding: 10px 15px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold;'>➡️</a></p><p style='color: #b0b5bc;'>CLICK THIS ARROW TO LOG IN TO RENDER: <a href='https://cse341project2-0k9h.onrender.com/login' target='_blank' style='color: #ffffff; background-color: #24292e; padding: 10px 15px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold;'>➡️</a></p>" */
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
});


router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs" }),
  function (req, res) {
    /* #swagger.ignore = true */
    res.redirect("/api-docs");
  },
);

router.get("/", (req, res) => {
  /* #swagger.ignore = true */
  res.send(
    req.isAuthenticated()
      ? `Logged in as ${req.user.displayName}`
      : "Logged out",
  );
});


router.use("/items", require("./items"));
router.use("/users", require("./users"));
router.use("/", require("./swagger"));

module.exports = router;
