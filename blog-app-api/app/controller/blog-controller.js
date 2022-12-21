const express = require('express');
const app = express();
const {mysql_connection} = require('../service/database-service');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


/*------------------------------------------
    adding other middleware
--------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*------------------------------------------
    enable files upload
--------------------------------------------*/
app.use(fileUpload({
    limits: {
        fileSize: '30mb',
    }, abortOnLimit: true,
}));

/*------------------------------------------
    Enabling Security Measures
--------------------------------------------*/
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Access-Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Set response content-type to JSON
    res.header("Content-Type", "application/json");

    // Pass to next layer of middleware
    next();
});


/**
 * Get All Blog Posts
 *
 * @return PostModel[]
 */
app.get('', (req, res) => {
    console.log('getallpost invoked');
    let sqlQuery = "SELECT * FROM post_tb";

    let query = mysql_connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

/**
 * Get Single Blog Post
 *
 * @return PostModel
 */
app.get('/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM post_tb WHERE post_id=" + req.params['id'];

    let query = mysql_connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

/**
 * Create New Blog Post
 *
 * @return response()
 */
app.post('', (req, res) => {

    // Get the file that was set to our field named "post_image"

    const post_image = req.files.post_image;
    // If no image submitted, exit
    // if (post_image === null) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    var filetypes = /jpeg|jpg|png/;

    // if (!filetypes.test(post_image.mimetype)) return res.sendStatus(400);

    // deafult windows format file moving path
    let tempFilePath = __dirname + '/upload/' + post_image.name;
    // Move the uploaded image to our upload folder
    post_image.mv(tempFilePath);
    // data set for insertion
    let data = {
        post_title: req.body.post_title, post_description: req.body.post_description, post_image: post_image.name
    };

    let sqlQuery = "INSERT INTO post_tb SET ?";

    let query = mysql_connection.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Update Blog Posts
 *
 * @return response()
 */
app.put('/:id', (req, res) => {
    // Get the file that was set to our field named "image"
    // console.log(req.files.post_image);
    const post_image = req.files.post_image;
    // If no image submitted, exit
    // if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    // if (/^image/.test(image.mimetype)) return res.sendStatus(400);
    let tempFilePath = __dirname + '/upload/' + post_image.name;
    // Move the uploaded image to our upload folder
    post_image.mv(tempFilePath);


    let data = {
        post_title: req.body.post_title, post_description: req.body.post_description, post_image: post_image.name
    };

    let sqlQuery = "UPDATE post_tb SET ? WHERE post_id=" + req.params['id'];
    let query = mysql_connection.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});


/**
 * Delete Blog Posts
 *
 * @return response()
 */
app.delete('/:id', (req, res) => {
    let sqlQuery = "DELETE FROM post_tb WHERE post_id=" + req.params['id'] + "";

    let query = mysql_connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});


/**
 * API Response builder
 *
 * @return response()
 */
function apiResponse(results,error,status) {
    return JSON.stringify({"status": status, "error": error, "response": results});
}


module.exports=app;
