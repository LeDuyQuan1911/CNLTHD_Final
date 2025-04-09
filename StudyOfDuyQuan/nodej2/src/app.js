const express = require('express');
const path = require('path');
// config dotenv
require("dotenv").config();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';
const app = express();

//config router
webRoutes(app);

//config ejs and config static files
configViewEngine(app);


app.listen(port, hostname,  () => {
    console.log(`Example app listening on port ${port}`)
})