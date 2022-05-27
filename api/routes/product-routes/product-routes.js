"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const productController = require('../../controllers/productControllers/productController');
var multer  = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     if (file.fieldname === "pics[]") {
        // upload is from the documents tag
        cb(null, 'files/productFiles/');
     }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-'+ file.originalname)
  }
})  
 
var upload = multer({ storage: storage })

router.post('/', upload.fields([
    {
      name : 'pics[]',
      maxCount : 2
    },
  ]), asyncHandler(async (req, res) => {
    console.log("files==>",req.file);
    console.log("files==>",req.files);

    return productController.addProduct(req, res);
}));

router.post('/update', asyncHandler(async (req, res) => {
    return productController.updateProduct(req, res);
}));

router.get('/', asyncHandler(async (req, res) => {
    return productController.getAllProducts(req, res);
}));


module.exports = router;