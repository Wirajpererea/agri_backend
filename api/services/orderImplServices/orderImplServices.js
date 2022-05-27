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
  addOrder: async (dataParams) => {
    try {
      const { product_row_id, user_row_id, qty, dateRequested } = dataParams;
      const insertQuery = `
INSERT INTO [dbo].[orders]
([product_row_id]
,[user_row_id]
,[qty]
,[dateRequested]
,[createdDate])
VALUES
( '${product_row_id}'
,'${user_row_id}'
,'${qty}'
,'${dateRequested}'
,'${moment().format("YYYY-MM-DD")}')
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

  getAllOrders: async (dataParams) => {
    try {
      // const { } = dataParams;

      const res = await db.query(
        `SELECT * 
      FROM [dbo].[orders]`,
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
