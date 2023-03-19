const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'board_db'
});

connection.connect();

module.exports = connection;