require('dotenv').config()

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: 'root',
  // update with your own MySQL password!
  password: process.env.DB_PASSWORD,
  database: 'employee_db',
});

module.exports = connection;