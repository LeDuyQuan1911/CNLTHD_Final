const express = require('express');
const path = require('path');
// config dotenv
require("dotenv").config();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';
const app = express();

//config express file upload
app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config router
webRoutes(app);
apiRoutes(app);

//config ejs and config static files
configViewEngine(app);

//connect database
(async()=>{
    try {
        await connection();
        app.listen(port, hostname,  () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
})()
