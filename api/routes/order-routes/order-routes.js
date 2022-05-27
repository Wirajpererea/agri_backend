"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const orderController = require('../../controllers/orderController/orderController');
router.post('/', asyncHandler(async (req, res) => {

    return orderController.addOrder(req, res);
}));

router.post('/updateTransport', asyncHandler(async (req, res) => {
    return productController.updateTransport(req, res);
}));

router.get('/', asyncHandler(async (req, res) => {
    return orderController.getOrders(req, res);
}));


module.exports = router;