require('dotenv').config()
const mysql = require('mysql');

// Setup our connect
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: process.env.DB_PASSWORD,
  database: 'employeeTracker_DB',
});

module.exports = connection;