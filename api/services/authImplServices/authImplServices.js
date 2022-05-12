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
      console.log(dataParams, "HERE");
      const {
        name,
        nic,
        email,
        type,
        dateOfBirth,
        contact,
        profilePicPath,
        password,
        address,
        recordedBy,
      } = dataParams;
      console.log("dataParams==>", dataParams);
      const insertQuery = `
      INSERT INTO [dbo].[user]
                 ([name]
                 ,[nic]
                 ,[email]
                 ,[address]
                 ,[dateOfBirth]
                 ,[type]
                 ,[contactNumber]
                 ,[profilePicPath]
                 ,[password]
                 ,[status]
                 ,[recorded_by]
                 ,[recorded_date])
           VALUES
                 (
                  '${name}'
                 ,'${nic}'
                 ,'${email}'
                 ,'${address}'
                 ,'${dateOfBirth}'
                 ,'${type}'
                 ,'${contact}'
                 ,'${profilePicPath}'
                 ,'${password}'
                 ,'active'
                 ,'1'
                 ,'${moment().format("YYYY-MM-DD")}')`;
      console.log("insertQuery==>", insertQuery);

      const response = await db.query(insertQuery, {
        type: QueryTypes.INSERT,
      });
      return response;
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },

  login: async (dataParams) => {
    try {
      const { email, password } = dataParams;
      console.log(dataParams,"dataParams")
      let user;
      user = await db.query(
        `SELECT * FROM [dbo].[user]
          WHERE email='${email}' AND password='${password}' AND status = 'active'`,
        {
          type: QueryTypes.SELECT,
        }
      );
      console.log("user==>",user);
      return user.length > 0
        ? { status: true, user: user[0] }
        : { status: false, user: {} };
    } catch (error) {
      console.log(error);
      return new Error({ message: error, body: {} });
    }
  },
};
