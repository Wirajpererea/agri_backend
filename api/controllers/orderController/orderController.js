"use strict";

const orderService = require("../../services/productImplServices/productImplServices");

module.exports = {
 
  addOrder: async (req, res) => {
    try {
      const result = await orderService.addOrder(req.body);
      res.send({ message: "success", body: result });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },
};
