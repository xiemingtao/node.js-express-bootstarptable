var mysql = require("mysql");


// 连接数据库
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "workdate"
});
// var sqlstring = "";
 
// 创建表
// sqlstring = "Create Table MYTABLE (name VARCHAR(20), sex CHAR(1))"
// connection.query(sqlstring, function (err, results, fields) {
//     if (err) {
//          console.log('[UPDATE ERROR] - ', err.message);
//         return;
//     }
//     console.log('--------------------------CREATE----------------------------');       
//     console.log('CREATE TABLE:', results);        
//     console.log('------------------------------------------------------------\n\n');  
// });

module.exports = connection