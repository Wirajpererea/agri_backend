"use strict";

const orderService = require("../../services/orderImplServices/orderImplServices");

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

  getOrders: async (req, res) => {
    try {
      const result = await orderService.getOrders(req.query);
      res.send({ message: "success", body: result });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },
};
