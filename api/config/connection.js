'use strict'; //For use with ES6
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env;
const Sequelize = require('sequelize');
const tedious = require('tedious');//s * as tedious from 'tedious';

// Initialize the connection in apratner db
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: 'DESKTOP-IC2NPU6',
  dialect: 'mssql',
  logging: false,
  dialectModule: tedious,
  username: 'sa',
  password: 'Inno@12345',
});
 
// db.sync({
//   force: false,
// });
 
module.exports = {
  db,
};