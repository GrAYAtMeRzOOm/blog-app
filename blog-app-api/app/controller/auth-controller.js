const {mysql_connection} = require("../service/database-service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();

//bcrypt cost factor doubles the hashing rounds
const costFactor = 10;

/*------------------------------------------
    adding other middleware
--------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*------------------------------------------
    Enabling Security Measures
--------------------------------------------*/
/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Access-Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Set response content-type to JSON
    res.header("Content-Type", "application/json");

    // Pass to next layer of middleware
    next();
});*/

/*------------------------------------------
    enable files upload
--------------------------------------------*/
app.use(fileUpload({
    limits: {
        fileSize: '30mb',
    }, abortOnLimit: true,
}));
/**
 * Create New User
 *
 * @method post()
 *
 * @return response()
 */
app.post('/register', (req, res) => {
    console.log("register invoked")
    // data set for insertion

    let pw = req.body.user_password
    console.log(req.body)
    let bcryptPw = bcrypt.hashSync(pw, costFactor)
    let data = {
        user_email: req.body.user_email, user_password: bcryptPw, user_name: req.body.user_name
    };

    let sqlQuery = "INSERT INTO user_tb SET ?";

    let query = mysql_connection.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});
/**
 * Get Users with email and password
 *
 * @method post()
 *
 * @return response()
 */
app.post('/login', (req, res) => {

    //SQL prepared statment for get user by email and password
    let sqlQuery = "SELECT * FROM user_tb WHERE user_email = ?";
    try {
        let query = mysql_connection.query(sqlQuery, [req.body.user_email], (err, results) => {
            if (err) throw err;
            console.log(results);
            if (bcrypt.compareSync(req.body.user_password, results[0].user_password)) {
                console.log('login success');
                const token = jwt.sign({id: results[0].user_id}, req.app.get('secretKey'), {expiresIn: '1h'});
                res.send(apiResponse({
                    token: token,
                    data: results
                }, undefined, 200));
            }
        });
    }catch (e) {
        res.send(apiResponse(undefined,e,400))
    }
});

/**
 * Email Validator
 *
 * @return boolean
 * @param email
 *
 */
function isValidEmail(email) {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (emailRegex.test(email)) {
        return true;
    }
}

/**
 * API Response builder
 *
 * @return response()
 */
function apiResponse(results, error, status) {
    return JSON.stringify({"status": status, "error": error, "response": results});
}

module.exports = app;
