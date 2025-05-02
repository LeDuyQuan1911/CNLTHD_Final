// controllers/productController.js

const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const axios = require("axios");

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://localhost:4008";
const SHOP_SERVICE_URL = process.env.SHOP_SERVICE_URL || "http://localhost:4003";

// Gọi API kiểm tra shop tồn tại
const checkShopExists = async (shopId) => {
  try {
    const response = await axios.get(`${SHOP_SERVICE_URL}/get-shop-info/${shopId}`);
    return response.data.shop;
  } catch (err) {
    return null;
  }
};

// Tạo sản phẩm
const createProduct = async (req, res, next) => {
  try {
    const files = req.files;
    const imageUrls = files.map(file => file.filename);

    const productData = req.body;
    productData.images = imageUrls;

    const shopId = productData.shopId;
    const shop = await checkShopExists(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop not found via Shop Service", 404));
    }
    productData.shop = shop;

    const product = await Product.create(productData);

    res.status(201).json({ success: true, product });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Lấy tất cả sản phẩm theo shop
const getAllProductsShop = async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Review sản phẩm và cập nhật trạng thái reviewed cho order
const reviewProduct = async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const review = { user, rating, comment, productId };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === user._id) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;
    product.reviews.forEach((rev) => (avg += rev.rating));
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    // Gọi API tới order-service để đánh dấu isReviewed
    await axios.patch(`${ORDER_SERVICE_URL}/mark-reviewed`, {
      orderId,
      productId,
    });

    res.status(200).json({ success: true, message: "Reviewed successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// API cập nhật tồn kho từ order-service
const updateStock = async (req, res, next) => {
  try {
    const { productId, quantity, action } = req.body;

    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    if (action === "decrease") {
      product.stock -= quantity;
      product.sold_out += quantity;
    } else if (action === "increase") {
      product.stock += quantity;
      product.sold_out -= quantity;
    }

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, product });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = {
  createProduct,
  getAllProductsShop,
  deleteProduct,
  getAllProducts,
  reviewProduct,
  updateStock,
};
