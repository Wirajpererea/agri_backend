"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const AuthController = require('../../controllers/authControllers/authController');



router.post('/login', asyncHandler(async (req, res) => {
    return AuthController.logIn(req, res);
}));


router.post('/register', asyncHandler(async (req, res) => {
    return AuthController.register(req, res);
}));

module.exports = router;