const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const config = require("./config/main");
const mongoose = require("mongoose");

const rootRouter = require("./app/routes/rootRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(passport.initialize());

app.get("/", (req, res, next) => {
  res.send("You are on a home page");
});

mongoose.connect(config.database);

require("./config/passport")(passport);

app.use("/api", rootRouter);

app.listen(port, () => console.log(`running on http://localhost:${port}`));
