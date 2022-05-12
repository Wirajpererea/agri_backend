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
  addProduct: async (dataParams) => {
    try {
      const { name, location, qty, price, userId } = dataParams;
      const insertQuery = `INSERT INTO [dbo].[products]
      ([name]
      ,[location]
      ,[qty]
      ,[price]
      ,[user_id])
   VALUES
  (
    '${name}'
    ,'${location}'
    ,'${qty}'
    ,${price}
    ,${userId}
  )
`;
      const product = await db.query(insertQuery, {
        type: QueryTypes.INSERT,
      });

      return product;
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },

  getAllProducts: async (dataParams) => {
    try {
      // const { } = dataParams;

      const res = await db.query(`SELECT * FROM Products`, {
        type: QueryTypes.SELECT,
      });

      return res;
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },
};
