const express = require("express");
const routerAPI = express.Router();
const {
    createEvent,
    getAllEvents,
    getAllEventsOfShop,
    deleteShopEvent,
    getAllEventsForAdmin,
    createNewReview,
} = require("../controllers/eventController");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiRoutes = (app) => { 
// Tạo event mới
routerAPI.post("/create-event", upload.array("images"), catchAsyncErrors(createEvent));

// Lấy tất cả events
routerAPI.get("/get-all-events", catchAsyncErrors(getAllEvents));

// Lấy events của shop
routerAPI.get("/get-all-events/:id", catchAsyncErrors(getAllEventsOfShop));

// Xoá event của shop
routerAPI.delete("/delete-shop-event/:id", isSeller, catchAsyncErrors(deleteShopEvent));

// Admin lấy toàn bộ event
routerAPI.get("/admin-all-events", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(getAllEventsForAdmin));

// Review cho event
routerAPI.put("/create-new-review-event", isAuthenticated, catchAsyncErrors(createNewReview));

app.use("/", routerAPI); 
}
module.exports = apiRoutes;
