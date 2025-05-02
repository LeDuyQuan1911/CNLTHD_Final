const jwt = require("jsonwebtoken");
const Shop = require("../models/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const isAuthenticated = async (req, res, next) => {
  
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
  console.log(decodedData);
  req.user = await Shop.findById(decodedData.id);
  next();
};

const isSeller = catchAsyncErrors(async (req, res, next) => {
  console.log(req.cookies)
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

const isAdmin = (role) => (req, res, next) => {
  console.log(req.user)
  if (req.user.role !== role) {
    return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
  }
  next();
};

module.exports = { isAuthenticated, isAdmin, isSeller };