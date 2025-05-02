const Shop = require("../model/shop");
const Event = require("../model/event");
const Order = require("../model/order");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// Tạo sự kiện mới
const createEvent = async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    }

    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);

    const eventData = req.body;
    eventData.images = imageUrls;
    eventData.shop = shop;

    const product = await Event.create(eventData);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// Lấy tất cả sự kiện
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// Lấy tất cả sự kiện của shop
const getAllEventsOfShop = async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// Xoá sự kiện của shop
const deleteShopEvent = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const eventData = await Event.findById(productId);

    eventData.images.forEach((imageUrl) => {
      const filePath = `uploads/${imageUrl}`;
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    });

    const event = await Event.findByIdAndDelete(productId);
    if (!event) return next(new ErrorHandler("Event not found!", 500));

    res.status(201).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// Lấy tất cả sự kiện cho admin
const getAllEventsForAdmin = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Review cho event
const createNewReview = async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const event = await Event.findById(productId);
    const review = { user, rating, comment, productId };

    const isReviewed = event.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      event.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          rev.rating = rating;
          rev.comment = comment;
          rev.user = user;
        }
      });
    } else {
      event.reviews.push(review);
    }

    let avg = 0;
    event.reviews.forEach((rev) => (avg += rev.rating));
    event.ratings = avg / event.reviews.length;

    await event.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reviewed successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getAllEventsOfShop,
  deleteShopEvent,
  getAllEventsForAdmin,
  createNewReview,
};