const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')

/*------------------------
    CSV file data storing array
*-------------------------
* */
let csvData = [];

/*--------------------------
    body-parser middleware use
* --------------------------
*/
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))


/*----------------------------
    Using Multer to file saving
*-----------------------------
* */
const storage = multer.diskStorage({
    destination: 'app/controller/upload/',
    filename: function (req, file, cb) {
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});


/*---------------------------
   CSV file uploading endpoint
   @type   POST
*----------------------------
*/
app.post('/upload', upload.single("uploadfile"), (req, res) => {
    console.log('Request recived - ' + req.file.filename);
    UploadCsvDataToMySQL(__dirname + '/upload/' + req.file.filename);
    res.send("Data Added Successfully")
});


/*---------------------------
   Sending CSV data to requested count
   @type   GET
*----------------------------
*/
app.get('/data', (req, res) => {
    console.log(req.query.start +" to "+req.query.end );
    if (req.query.start === undefined && req.query.end === undefined) {
        res.send(csvData.slice(0, 100))
    } else if (req.query.start > 0 && req.query.end === undefined) {
        res.send(csvData.slice(req.query.start, 100+ +req.query.start))
    } else if (req.query.start > 0 && req.query.end > 0) {
        res.send(csvData.slice(req.query.start, req.query.end))
    }
});

/*---------------------------
   Adding csv to array
*----------------------------
*/
function UploadCsvDataToMySQL(filePath) {
    let stream = fs.createReadStream(filePath);
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();

            // Open the MySQL connection
            console.log(csvData.length);

            // delete file after saving to MySQL database
            fs.unlinkSync(filePath)
        });
    stream.pipe(csvStream);
}
module.exports = app;
