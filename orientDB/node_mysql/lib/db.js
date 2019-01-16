var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zhzkzhffk34',
    database: 'subproject'
});
db.connect();
module.exports = db;