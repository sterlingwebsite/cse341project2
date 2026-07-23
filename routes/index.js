const router = require("express").Router();
const passport = require("passport");

router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] }),
);

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
    res.redirect("/api-docs");
  },
);

router.get("/", (req, res) => {
  res.send(
    req.isAuthenticated()
      ? `Logged in as ${req.user.displayName}`
      : "Logged out",
  );
});


router.use("/items", require("./items"));
router.use("/", require("./swagger"));

module.exports = router;
