"use strict"; //For use with ES6

const express = require("express");
const router = express.Router();

const authRouter = require("./auth-routes/auth-routes");

router.use("/v1/auth", authRouter);

module.exports = router;
