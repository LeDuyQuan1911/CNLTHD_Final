const express = require("express")
const connectDatabase = require("./src/config/db")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const apiRoutes = require("./src/routes/apiUser")
require("dotenv").config()

const port = process.env.PORT || 4002;
const hostname = process.env.HOST_NAME || 'localhost';

//config middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//config routes
apiRoutes(app);


(async()=>{
  try {
      await connectDatabase();
      app.listen(port, hostname,  () => {
          console.log(`Example app listening on port ${process.env.PORT}`)
      })
  } catch (error) {
      console.log("Error connecting to database: ", error);
  }
})()
