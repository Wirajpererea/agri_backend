"use strict";

const authService = require("../../services/authImplServices/authImplServices");

module.exports = {
 
  register: async (req, res) => {
    try {
      const user = await authService.registerUser(req.body);
      res.send({ message: "success", body: user });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error", body: { message: error.message } });
    }
  },

};
