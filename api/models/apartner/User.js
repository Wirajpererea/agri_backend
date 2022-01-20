"use strict"; //For use with ES6
const { db } = require("../../config/connection");
const Sequelize = require("sequelize");

//Apartner db user table Schema
const User = db.define(
  "user",
  {
    user_row_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      omitNull: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      omitNull: true,
    },
    name: Sequelize.STRING, 
    password: Sequelize.STRING, 
    status: {
      type: Sequelize.ENUM("active", "deactive", "delete"),
      defaultValue: "active",
    },
    recorded_by: Sequelize.INTEGER,
    recorded_date: Sequelize.DATE,
  },
  { timestamps: false, tableName: "user", omitNull: true }
);


module.exports = User;
