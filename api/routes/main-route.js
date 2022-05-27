"use strict"; //For use with ES6

const express = require("express");
const router = express.Router();

const authRouter = require("./auth-routes/auth-routes");
const productsRouter = require("./product-routes/product-routes");
const ordersRouter = require("./order-routes/order-routes");

router.use("/v1/auth", authRouter);
router.use("/v1/products", productsRouter);
router.use("/v1/order", ordersRouter);

module.exports = router;
