const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const ErrorHandler = require("./utils/ErrorHandler");
const connectDatabase = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
connectDatabase();

// Routes
app.use("/api/v1/user", userRoutes);

const cors = require('cors');

// Cấu hình CORS với các tùy chọn
const corsOptions = {
  origin: 'http://localhost:3000',  // Cho phép các yêu cầu từ http://localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'],  // Các header được phép
  // credentials: true,  // Để chấp nhận cookie, nếu cần
};

// Sử dụng CORS với các tùy chọn trên
app.use(cors(corsOptions));

// Nếu bạn cần hỗ trợ các yêu cầu preflight (OPTIONS) cho tất cả các route
app.options('*', cors(corsOptions));

// Middleware for Errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

app.listen(process.env.PORT || 5002, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 5002}`);
});

module.exports = app;
