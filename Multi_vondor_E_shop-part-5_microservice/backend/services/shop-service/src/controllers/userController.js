const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const Shop = require("../models/Shop");
const {sendMail} = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");
const ErrorHandler = require("../utils/ErrorHandler");

// Tạo token kích hoạt
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

const createShop = async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filePath = `uploads/${req.file.filename}`;
      fs.unlink(filePath, () => {});
      return next(new ErrorHandler("User already exists", 400));
    }

    const fileUrl = path.join(req.file.filename);
    const seller = {
      name: req.body.name,
      email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    await sendMail({
      email: seller.email,
      subject: "Activate your Shop",
      message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `please check your email:- ${seller.email} to activate your shop!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const activateShop = async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newSeller) return next(new ErrorHandler("Invalid token", 400));

    const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;

    let seller = await Shop.findOne({ email });
    if (seller) return next(new ErrorHandler("User already exists", 400));

    seller = await Shop.create({
      name, email, avatar, password, zipCode, address, phoneNumber,
    });

    sendShopToken(seller, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const loginShop = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("Please provide all fields", 400));

    const user = await Shop.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }

    sendShopToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getSeller = async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);
    if (!seller) return next(new ErrorHandler("User doesn't exist", 400));
    res.status(200).json({ success: true, seller });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const logoutShop = async (req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({ success: true, message: "Log out successful!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getShopInfo = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({ success: true, shop });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateShopAvatar = async (req, res, next) => {
  try {
    const existsUser = await Shop.findById(req.seller._id);
    fs.unlinkSync(`uploads/${existsUser.avatar}`);
    const fileUrl = path.join(req.file.filename);

    const seller = await Shop.findByIdAndUpdate(req.seller._id, { avatar: fileUrl });
    res.status(200).json({ success: true, seller });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateSellerInfo = async (req, res, next) => {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;
    const shop = await Shop.findById(req.seller._id);
    if (!shop) return next(new ErrorHandler("User not found", 400));

    Object.assign(shop, { name, description, address, phoneNumber, zipCode });
    await shop.save();

    res.status(201).json({ success: true, shop });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Shop.find().sort({ createdAt: -1 });
    res.status(201).json({ success: true, sellers });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteSeller = async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.params.id);
    if (!seller) return next(new ErrorHandler("Seller not found", 400));
    await Shop.findByIdAndDelete(req.params.id);
    res.status(201).json({ success: true, message: "Seller deleted successfully!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateWithdrawMethods = async (req, res, next) => {
  try {
    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      withdrawMethod: req.body.withdrawMethod,
    });
    res.status(201).json({ success: true, seller });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteWithdrawMethod = async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);
    if (!seller) return next(new ErrorHandler("Seller not found", 400));
    seller.withdrawMethod = null;
    await seller.save();
    res.status(201).json({ success: true, seller });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createShop,
  activateShop,
  loginShop,
  getSeller,
  logoutShop,
  getShopInfo,
  updateShopAvatar,
  updateSellerInfo,
  getAllSellers,
  deleteSeller,
  updateWithdrawMethods,
  deleteWithdrawMethod,
};