"use strict"; //For use with ES6
const { db } = require("../../config/connection");
const Sequelize = require("sequelize");

//Apartner db user table Schema
const Product = db.define(
  "product",
  {
    product_row_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      omitNull: true,
    },
    product_id: {
      type: Sequelize.INTEGER,
      omitNull: true,
    },
    product_name: Sequelize.STRING, 
    qty: Sequelize.STRING, 
    user_name: Sequelize.STRING, 
    user_id: Sequelize.STRING, 
    status: {
        type: Sequelize.ENUM("active", "deactive", "delete"),
        defaultValue: "active",
      },
    recorded_by: Sequelize.INTEGER,
    recorded_date: Sequelize.DATE,
  },
  { timestamps: false, tableName: "product", omitNull: true }
);


module.exports = Product;
