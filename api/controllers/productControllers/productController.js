"use strict";

const productsService = require("../../services/productImplServices/productImplServices");

module.exports = {
 
  addProduct: async (req, res) => {
    try {
      const user = await productsService.addProduct(req.body);
      res.send({ message: "success", body: user });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const user = await productsService.updateProduct(req.body);
      res.send({ message: "success", body: user });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      console.log("REQ===>",req.params);
      console.log("REQ=ss==>",req.body);
      const results = await productsService.getAllProducts(req.query);
      res.send({ message: "success", body: results });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },
};
