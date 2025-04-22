const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
};

exports.isAdmin = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
  }
  next();
};