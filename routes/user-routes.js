const router = require("express").Router({ mergeParams: true });
const { User } = require("../models");
router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then(dbUser => {
      res.render("user.ejs", { ejsUser: dbUser });
    })
    .catch(err => {
      console.log("Error finding user on show page");
      res.redirect("/");
    });
});
module.exports = router;
