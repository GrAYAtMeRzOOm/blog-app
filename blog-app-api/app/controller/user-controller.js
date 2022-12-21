const express = require('express');
const app = express();
const {mysql_connection} = require('../service/database-service');

/**
 * Get All Users
 *
 * @method get()
 *
 * @return response()
 */

app.get('', (req, res) => {
    let sqlQuery = "SELECT * FROM user_tb";

    let query = mysql_connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


/**
 * Change user password
 *
 * @method post()
 *
 * @return response()
 */
app.post('/auth/reset',(req, res) => {
    if (req.user_new_password===req.user_confirm_password) {
        //SQL prepared statement for get user by email and password
        let sqlQuery = "SELECT * FROM user_tb WHERE user_email = ?";
        let query = mysql_connection.query(sqlQuery, [req.params.user_email], (err, results) => {
            if (err) throw err;
            let sqlQuery = "UPDATE post_tb SET ? WHERE post_id=" + req.params['id'];
            res.send(results);
        });
    } else {
        res.send(apiResponse(null, "invalid user try again", 400))
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
