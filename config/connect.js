var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'sa123',
    database: 'blog_db'
});

connection.connect(function(err) {
    if (err) 
    console.log('Khong the ket noi den database!');
});

module.exports = connection;