const express = require("express");
const routerAPI = express.Router();
const { upload } = require("../multer");

const {
    createOrder,
    getAllOrdersOfUser,
    getAllOrdersOfSeller,
    getAllOrdersAdmin,
    updateOrderStatus,
    requestRefund,
    refundSuccess,
} = require("../controllers/orderController");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiRoutes = (app) => { 
// Create order
routerAPI.post("/create-order", catchAsyncErrors(createOrder));

// Get user orders
routerAPI.get("/get-all-orders/:userId", catchAsyncErrors(getAllOrdersOfUser));

// Get seller orders
routerAPI.get("/get-seller-all-orders/:shopId", catchAsyncErrors(getAllOrdersOfSeller));

// Admin get all
routerAPI.get("/admin-all-orders", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(getAllOrdersAdmin));

// Update status
routerAPI.put("/update-order-status/:id", isSeller, catchAsyncErrors(updateOrderStatus));

// Refund request
routerAPI.put("/order-refund/:id", catchAsyncErrors(requestRefund));

// Seller approve refund
routerAPI.put("/order-refund-success/:id", isSeller, catchAsyncErrors(refundSuccess));
app.use("/", routerAPI); 
}
module.exports = apiRoutes;
