const mysql = require('mysql');

/*------------------------------------------
Database Connection
--------------------------------------------*/

const mysql_connection = mysql.createConnection({
    host: 'localhost', user: 'gray-test', /* MySQL User */
    password: 'Produce@Destroy@9', /* MySQL Password */
    database: 'blog-app-db' /* MySQL Database */
});


module.exports = {mysql_connection};
