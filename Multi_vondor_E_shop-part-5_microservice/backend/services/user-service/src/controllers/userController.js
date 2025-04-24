// controllers/userController.js
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "30m" });
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      fs.unlink(`uploads/${req.file.filename}`, () => {});
      return next(new ErrorHandler("User already exists", 400));
    }

    const fileUrl = path.join(req.file.filename);
    const user = { name, email, password, avatar: fileUrl };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:4002/activation/${activationToken}`;

    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account!`,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

const activateUser = async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) return next(new ErrorHandler("Invalid token", 400));

    const { name, email, password, avatar } = newUser;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400));

    user = await User.create({ name, email, avatar, password });
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const loginUser = async (req, res, next) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("All fields required", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not found", 400));

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return next(new ErrorHandler("Invalid credentials", 400));

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(new ErrorHandler("User not found", 400));

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

  const logoutUser = async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

const updateUserInfo = async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not found", 400));

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return next(new ErrorHandler("Incorrect password", 400));

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const existsUser = await User.findById(req.user.id);
    const existAvatarPath = `uploads/${existsUser.avatar}`;
    fs.unlinkSync(existAvatarPath);

    const fileUrl = path.join(req.file.filename);
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: fileUrl });

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateUserAddresses = async (req, res, next) => {
  console.log(req.user.addresses)
  try {
    const user = await User.findById(req.user.id);
    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      return next(new ErrorHandler(`${req.body.addressType} address already exists`));
    }

    const existsAddress = user.addresses.find((address) => address._id === req.body._id);
    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      user.addresses.push(req.body);
    }

    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteUserAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    await User.updateOne({ _id: userId }, { $pull: { addresses: { _id: addressId } } });
    const user = await User.findById(userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) return next(new ErrorHandler("Old password is incorrect!", 400));
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords do not match!", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(201).json({ success: true, users });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User not found with this id", 400));

    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createUser,
  activateUser,
  loginUser,
  getUser,
  logoutUser,
  updateUserInfo,
  updateUserAvatar,
  updateUserAddresses,
  deleteUserAddress,
  updateUserPassword,
  getUserInfo,
  getAllUsers,
  deleteUser,
};