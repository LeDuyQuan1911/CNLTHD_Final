// controllers/orderController.js (Microservice tách riêng, KHÔNG phụ thuộc Product và Shop model)

const Order = require("../models/order");
const ErrorHandler = require("../utils/ErrorHandler");
const axios = require("axios");

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:4009";
const SHOP_SERVICE_URL = process.env.SHOP_SERVICE_URL || "http://localhost:4003";

const createOrder = async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    const shopItemsMap = new Map();
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) shopItemsMap.set(shopId, []);
      shopItemsMap.get(shopId).push(item);
    }

    const orders = [];
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({ success: true, orders });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllOrdersOfUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllOrdersOfSeller = async (req, res, next) => {
  try {
    const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllOrdersAdmin = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ deliveredAt: -1, createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHandler("Order not found", 400));

    if (req.body.status === "Transferred to delivery partner") {
      for (const o of order.cart) {
        await axios.patch(`${PRODUCT_SERVICE_URL}/update-stock`, {
          productId: o._id,
          quantity: o.qty,
          action: "decrease",
        });
      }
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.1;
      await axios.patch(`${SHOP_SERVICE_URL}/update-balance`, {
        sellerId: req.seller.id,
        amount: order.totalPrice - serviceCharge,
      });
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const requestRefund = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHandler("Order not found", 400));

    order.status = req.body.status;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const refundSuccess = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHandler("Order not found", 400));

    order.status = req.body.status;
    await order.save();

    if (req.body.status === "Refund Success") {
      for (const o of order.cart) {
        await axios.patch(`${PRODUCT_SERVICE_URL}/api/product/update-stock`, {
          productId: o._id,
          quantity: o.qty,
          action: "increase",
        });
      }
    }

    res.status(200).json({ success: true, message: "Order refunded successfully!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createOrder,
  getAllOrdersOfUser,
  getAllOrdersOfSeller,
  getAllOrdersAdmin,
  updateOrderStatus,
  requestRefund,
  refundSuccess,
};