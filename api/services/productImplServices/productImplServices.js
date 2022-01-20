"use strict";

const cipherService = require("../../utils/cipherServices");
const utils = require("../../utils/utilityServices");
const User = require("../../models/apartner/User");
const Sequelize = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;
const { db } = require("../../config/connection");
const userConst = require("../../models/constants/user-constant");

const Op = Sequelize.Op;
const moment = require("moment");


module.exports = {


  register: async (dataParams) => {
    try {
      const { userName, password , type} = dataParams;
      let user;
    
        user = await db.query(
          `SELECT * FROM User
          WHERE U.user_type ='resident' AND U.status='active' AND U.contact_primary = '${phoneNumber}' LIMIT 1`,
          {
            type: QueryTypes.SELECT,
          }
        );
   
        return new Error({ message: "Password is wrong", body: {} });
      
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },


};
