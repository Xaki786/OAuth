const express = require("express");
const mongoose = require("mongoose");
const passportSetup = require("./config/passport-setup.js");
const cookieSession = require("cookie-session");
const { authRoutes, userRoutes } = require("./routes");
const { mongoDB } = require("./config/keys.js");
const passport = require("passport");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["rareyarrearwsdfdsaf"]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoDB.URI, { useNewUrlParser: true })
  .then(() => {
    console.log("MONGO DB STARTED");
    app.listen(PORT, () => {
      console.log(`SERVER STARTED AT ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
