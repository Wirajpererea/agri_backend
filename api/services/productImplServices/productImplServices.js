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

  updateProduct: async (dataParams) => {
    try {
      const {productId, name, location, qty, price, userId } = dataParams;
      const insertQuery = `
      UPDATE [dbo].[products]
      SET name = '${name}',
      location ='${location}',
      qty = '${qty}',
      price = ${price} 
      WHERE product_row_id = ${productId}
`;
      const product = await db.query(insertQuery, {
        type: QueryTypes.UPDATE,
      });

      return product;
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },

  getAllProducts: async (dataParams) => {
    try {
      const { userId } = dataParams;
      console.log(dataParams, "DATAPARAMS!");
      const res = await db.query(
        `SELECT * FROM Products
        ${userId ? ` WHERE user_id = ${userId}`: ''}
        `,
        {
          type: QueryTypes.SELECT,
        }
      );

      return res;
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },
};
