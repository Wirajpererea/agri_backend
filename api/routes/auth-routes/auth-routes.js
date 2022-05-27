"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authController = require('../../controllers/authControllers/authController');



router.post('/login', asyncHandler(async (req, res) => {
    return authController.logIn(req, res);
}));


router.post('/register', asyncHandler(async (req, res) => {
    return authController.register(req, res);
}));

router.get('/getTransportUsers', asyncHandler(async (req, res) => {
    return authController.getUsers(req, res);
}));

module.exports = router;