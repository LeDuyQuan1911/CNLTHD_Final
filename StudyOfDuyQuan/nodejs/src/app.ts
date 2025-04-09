const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
import { getConnection } from "./config/database";
import webRoutes from "./routes/web";

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Set the views directory

//config request body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//config static files: images, css, javascript
app.use(express.static("public"))

//config routes
webRoutes(app);

// // connect to database
// getConnection()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(process.env.PORT);
});

 