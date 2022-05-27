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

  getOrders: async (dataParams) => {
    try {
      const { userId } = dataParams;

      const res = await db.query(
        `
  SELECT o.*,u.name AS userName,p.name AS productName ,p.price ,ut.name AS transporterName
  FROM [dbo].[orders] AS o
INNER JOIN [dbo].[products] AS p ON p.product_row_id = o.product_row_id
INNER JOIN [dbo].[user] AS u ON u.user_row_id = o.user_row_id
LEFT JOIN  [dbo].[user] AS ut ON ut.user_row_id = o.transportedBy
WHERE u.user_row_id=${userId}`,
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

  updateTransport: async (dataParams) => {
    try {
      const { transportedBy, orderId } = dataParams;
      const res = await db.query(
        `
        UPDATE  [dbo].[orders] 
        SET isTransported = 1 , transportedBy = ${transportedBy}
        WHERE order_row_id = ${orderId}`,
        {
          type: QueryTypes.UPDATE,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },
};
