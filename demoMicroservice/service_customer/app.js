const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connection = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');
require('./routes/apiRoutes');

const port = process.env.PORT || 3002;
const hostname = process.env.HOST_NAME || 'localhost';

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config routes
apiRoutes(app); // call apiRoutes function with app as argument

// connect database and start server
(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Example app listening on http://${hostname}:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();
