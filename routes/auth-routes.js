const router = require("express").Router({ mergeParams: true });
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.get(
  "/google",
  passport.authenticate("google", {
    scope: "profile"
  })
);
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.redirect("/users/" + req.user.id);
  }
);

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.send("facebook registration");
    // res.redirect("/user/" + req.user.id);
  }
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/rarey", (req, res) => {
  res.send("Rarey");
});
module.exports = router;
