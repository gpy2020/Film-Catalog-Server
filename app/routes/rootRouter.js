const express = require("express");
const rootRouter = express.Router();
const filmRouter = require("./filmRouter");
const authRouter = require("./authRouter");

rootRouter.use("/", filmRouter);
rootRouter.use("/", authRouter);
module.exports = rootRouter;
