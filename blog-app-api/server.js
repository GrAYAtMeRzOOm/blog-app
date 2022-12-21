// @create-index
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
var cors = require('cors')
const app = express();


/*-------------------------------------------
    JWT Secret token
---------------------------------------------*/
app.set('secretKey', 'BlogAppApiNodeJs');
app.use(cors());

/*-------------------------------------------
    Adding other routes
---------------------------------------------*/
const user = require('./app/controller/user-controller');
const blog = require('./app/controller/blog-controller');
const auth = require('./app/controller/auth-controller');
const assert = require('./app/controller/assert-controller');

//private routes
app.use('/api/user',validateUser,user);
app.use('/api/blog',validateUser,blog);
//public routes
app.use('/api/auth',auth);
app.use('/assert',assert);

/*------------------------------------------
    Server listening
--------------------------------------------*/
const {mysql_connection} = require("./app/service/database-service");
const jwt = require("jsonwebtoken");
app.listen(3000, () => {
    console.log('Server started on port 3000...');

});

/*------------------------------------------
    Checking Mysql Connection
--------------------------------------------*/
mysql_connection.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected');
});

/**
 * User Validator
 *
 * @return response()
 */
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        }else{
            // add user email to request
            // req.body.user_id = decoded.id;
            next();
        }
    });
}



