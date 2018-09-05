const express = require("express");
const router = express.Router();
const filmRouter = require("./filmRouter");
const authRouter = require("./authRouter");

router.use("/", filmRouter);
router.use("/", authRouter);
module.exports = router;
