const express = require('express'); // import express
const routerAPI = express.Router();
const {
    createShop, activateShop, loginShop, getSeller,
    logoutShop, getShopInfo, updateShopAvatar,
    updateSellerInfo, getAllSellers, deleteSeller,
    updateWithdrawMethods, deleteWithdrawMethod,
  } = require("../controllers/userController");const { expressjwt: jwt } = require("express-jwt");
const {isAdmin, isAuthenticated, isSeller} = require("../middleware/auth");
const { upload } = require("../../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const SECRET_KEY = "q3r#7sG!8fL09p*7h";
const apiRoutes = (app) => { 

    routerAPI.post("/create-shop", upload.single("file"), catchAsyncErrors(createShop));
    routerAPI.post("/activation", catchAsyncErrors(activateShop));
    routerAPI.post("/login-shop", catchAsyncErrors(loginShop));
    routerAPI.get("/getSeller", isSeller, catchAsyncErrors(getSeller));
    routerAPI.get("/logout", catchAsyncErrors(logoutShop));
    routerAPI.get("/get-shop-info/:id", catchAsyncErrors(getShopInfo));
    routerAPI.put("/update-shop-avatar", isSeller, upload.single("image"), catchAsyncErrors(updateShopAvatar));
    routerAPI.put("/update-seller-info", isSeller, catchAsyncErrors(updateSellerInfo));
    routerAPI.get("/admin-all-sellers", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(getAllSellers));
    routerAPI.delete("/delete-seller/:id", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(deleteSeller));
    routerAPI.put("/update-payment-methods", isSeller, catchAsyncErrors(updateWithdrawMethods));
    routerAPI.delete("/delete-withdraw-method", isSeller, catchAsyncErrors(deleteWithdrawMethod));
    
    app.use("/", routerAPI); // tat cac url se bat dau bang / o day

}

module.exports = apiRoutes;