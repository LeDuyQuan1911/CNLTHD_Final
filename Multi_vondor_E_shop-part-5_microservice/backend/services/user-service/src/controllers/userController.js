const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
require("dotenv").config();
// Create user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });
    return next(new ErrorHandler("User already exists", 400));
  }

  const fileUrl = path.join(req.file.filename);
  const user = { name, email, password, avatar: fileUrl };
  const activationToken = jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
  const activationUrl = `http://localhost:3000/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click the link to activate your account: ${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account!`,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

// Activate user account
exports.activateUser = catchAsyncErrors(async (req, res, next) => {
  const { activation_token } = req.body;
  const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

  if (!newUser) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  const { name, email, password, avatar } = newUser;
  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  user = await User.create({ name, email, avatar, password });
  sendToken(user, 201, res);
});

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 400));
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  sendToken(user, 201, res);
});

// Load user
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 400));
  }

  res.status(200).json({ success: true, user });
});

// Logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully!" });
});

// Update user info
exports.updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  const { email, password, phoneNumber, name } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid password", 400));
  }

  user.name = name;
  user.email = email;
  user.phoneNumber = phoneNumber;
  await user.save();

  res.status(200).json({ success: true, user });
});

// Update user avatar
exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const existAvatarPath = `uploads/${user.avatar}`;

  fs.unlinkSync(existAvatarPath);

  const fileUrl = path.join(req.file.filename);
  user.avatar = fileUrl;
  await user.save();

  res.status(200).json({ success: true, user });
});

// Update user addresses
exports.updateUserAddresses = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const sameTypeAddress = user.addresses.find(
    (address) => address.addressType === req.body.addressType
  );
  if (sameTypeAddress) {
    return next(new ErrorHandler(`${req.body.addressType} address already exists`, 400));
  }

  const existsAddress = user.addresses.find(
    (address) => address._id === req.body._id
  );

  if (existsAddress) {
    Object.assign(existsAddress, req.body);
  } else {
    user.addresses.push(req.body);
  }

  await user.save();
  res.status(200).json({ success: true, user });
});

// Delete user address
exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const addressId = req.params.id;

  await User.updateOne(
    { _id: userId },
    { $pull: { addresses: { _id: addressId } } }
  );

  const user = await User.findById(userId);
  res.status(200).json({ success: true, user });
});

// Update user password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect!", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({ success: true, message: "Password updated successfully!" });
});

// Get user info by ID
exports.getUserInfoById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, user });
});

// Get all users (Admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, users });
});

// Delete user (Admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "User deleted successfully!" });
});