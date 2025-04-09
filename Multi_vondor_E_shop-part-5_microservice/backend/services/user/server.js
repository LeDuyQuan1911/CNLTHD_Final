const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const connectDatabase = require("./db/Database");

// Config
dotenv.config({ path: "./config/.env" });

// DB
connectDatabase();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
const userRoutes = require("./controller/user");
app.use("/api/v2/user", userRoutes);

// Error handler
app.use(ErrorHandler);

// Test
app.get("/", (req, res) => {
  res.send("User Service is running!");
});

// Export for testing or gateway
module.exports = app;

// Server
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
  });
}
