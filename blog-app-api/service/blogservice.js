const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const mysql = require('mysql');

/*------------------------------------------
Database Connection
--------------------------------------------*/
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'gray-test', /* MySQL User */
    password: 'Produce@Destroy@9', /* MySQL Password */
    database: 'blog-app-db' /* MySQL Database */
});


/*------------------------------------------
    enable files upload
--------------------------------------------*/
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);
/*------------------------------------------
    adding other middleware
--------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*------------------------------------------
Checking Mysql Connection
--------------------------------------------*/
connection.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected');
});

/*------------------------------------------
Server listening
--------------------------------------------*/
app.listen(3000, () => {
    console.log('Server started on port 3000...');

});

/**
 * Get All Blog Posts
 *
 * @return response()
 */
app.get('/api/blog', (req, res) => {
    let sqlQuery = "SELECT * FROM post_tb";

    let query = connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Get Single Blog Post
 *
 * @return response()
 */
app.get('/api/blog/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM post_tb WHERE post_id=" + req.params['id'];

    let query = connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Create New Blog Post
 *
 * @return response()
 */
app.post('/api/blog', (req, res) => {

    // Get the file that was set to our field named "image"
    // console.log(req.files.post_image);
    const post_image = req.files.post_image;
    // If no image submitted, exit
    if (post_image===null) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    var filetypes = /jpeg|jpg|png/;
    if (!filetypes.test(post_image.mimetype)) return res.sendStatus(400);

    let savingFilePath = __dirname + "\\upload\\" + post_image.name;
    let tempFilePath = __dirname + '/upload/' + post_image.name;
    // Move the uploaded image to our upload folder
    post_image.mv(tempFilePath);


    let data = {
        post_title: req.body.post_title,
        post_description: req.body.post_description,
        post_image: savingFilePath
    };

    let sqlQuery = "INSERT INTO post_tb SET ?";

    let query = connection.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Update Blog Posts
 *
 * @return response()
 */
app.put('/api/blog/:id', (req, res) => {
    // Get the file that was set to our field named "image"
    // console.log(req.files.post_image);
    const post_image = req.files.post_image;
    // If no image submitted, exit
    // if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    // if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    let savingFilePath = __dirname + "\\upload\\" + post_image.name;
    let tempFilePath = __dirname + '/upload/' + post_image.name;
    // Move the uploaded image to our upload folder
    post_image.mv(tempFilePath);


    let data = {
        post_title: req.body.post_title,
        post_description: req.body.post_description,
        post_image: savingFilePath
    };

    let sqlQuery = "UPDATE post_tb SET ? WHERE post_id="+req.params['id'];
    let query = connection.query(sqlQuery,data,(err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Delete Blog Posts
 *
 * @return response()
 */
app.delete('/api/blog/:id', (req, res) => {
    let sqlQuery = "DELETE FROM items WHERE id=" + req.params.id + "";

    let query = connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
    return JSON.stringify({"status": 200, "error": null, "response": results});
}



