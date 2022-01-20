"use strict";

const authService = require("../../services/authImplServices/authImplServices");

module.exports = {
  
  logIn: async (req, res) => {
    try {
      const user = await authService.login(req.body);
      if (user.validUser) {
        res.send({ message: "success", body: user });
      } else {
        res.send({ message: "fail", body: {} });
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },

  register: async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.send({ message: "success", body: user });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },

};
