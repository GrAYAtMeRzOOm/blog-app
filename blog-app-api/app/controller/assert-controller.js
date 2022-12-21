const express = require('express');
const cors = require('cors');
const app = express();
/*------------------------------------------
    adding other middleware
--------------------------------------------*/
const fileUpload = require("express-fileupload");
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
app.use(cors());

/*
* Get File Assert
*
* @return file
*
* */
app.get('/:name',(req,res)=>{
    if(!req.params['name']) res.send('cannot find the file with name :'+req.params['name'])
    // Set disposition and send it.
    res.sendFile(__dirname+'/upload/'+req.params['name'],function (err) {
        if(err){
            throw err;
        }else{
            console.log('File: '+req.params['name']+' sent');
        }
    })
});
module.exports = app;
