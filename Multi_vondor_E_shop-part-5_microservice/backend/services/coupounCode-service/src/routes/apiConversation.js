const express = require("express");
const routerAPI = express.Router();
const {
    createCouponCode,
    getCouponsOfShop,
    deleteCouponCode,
    getCouponValueByName,
} = require("../controllers/coupounCodeController");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiRoutes = (app) => { 
    routerAPI.post("/create-coupon-code", isSeller, catchAsyncErrors(createCouponCode));
    routerAPI.get("/get-coupon/:id", isSeller, catchAsyncErrors(getCouponsOfShop));
    routerAPI.delete("/delete-coupon/:id", isSeller, catchAsyncErrors(deleteCouponCode));
    routerAPI.get("/get-coupon-value/:name", catchAsyncErrors(getCouponValueByName));
app.use("/", routerAPI); 
}
module.exports = apiRoutes;
