const mysql=require('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
    host     : process.env.HOST_NAME,
    user     : process.env.USER_NAME,
    password : process.env.USER_PASSWORD,
    database : process.env.DATABASE_NAME
});

module.exports = connection;