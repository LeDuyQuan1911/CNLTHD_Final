const CoupounCode = require("../models/coupounCode");
const ErrorHandler = require("../utils/ErrorHandler");

// Tạo mã giảm giá mới
const createCouponCode = async (req, res, next) => {
  try {
    const isCoupounCodeExists = await CoupounCode.find({ name: req.body.name });

    if (isCoupounCodeExists.length !== 0) {
      return next(new ErrorHandler("Coupon code already exists!", 400));
    }

    const coupounCode = await CoupounCode.create(req.body);

    res.status(201).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Lấy tất cả mã giảm giá của shop
const getCouponsOfShop = async (req, res, next) => {
  try {
    const couponCodes = await CoupounCode.find({ shopId: req.seller.id });

    res.status(201).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Xoá mã giảm giá
const deleteCouponCode = async (req, res, next) => {
  try {
    const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code doesn't exist!", 400));
    }

    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Lấy thông tin mã giảm giá theo tên
const getCouponValueByName = async (req, res, next) => {
  try {
    const couponCode = await CoupounCode.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = {
  createCouponCode,
  getCouponsOfShop,
  deleteCouponCode,
  getCouponValueByName,
};