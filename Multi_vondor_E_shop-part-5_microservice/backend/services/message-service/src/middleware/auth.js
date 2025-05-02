const jwt = require("jsonwebtoken");
const axios = require("axios");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const userServiceURL = process.env.USER_SERVICE_URL || "http://localhost:4002"; // URL của user-service

// Xác thực user (client)
const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decodedData);
  // Tùy chọn: Nếu chỉ cần ID và role từ token
  req.user = {
    id: decodedData.id,
    role: decodedData.role,
    email: decodedData.email,
    // thêm các thông tin khác nếu token có
  };


  next();
});

// Xác thực seller (shop)
const isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = {
    id: decoded.id,
    // Có thể lấy thêm info nếu cần
  };

  next();
});

// Xác thực admin
const isAdmin = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403));
  }
  next();
};

module.exports = { isAuthenticated, isAdmin, isSeller };
