const express = require('express'); // import express
const routerAPI = express.Router();
const {createUser, activateUser, loginUser,getUser,logoutUser, updateUserInfo, updateUserAvatar, updateUserAddresses, deleteUserAddress, updateUserPassword, getUserInfo, getAllUsers, deleteUser} = require("../controllers/userController")
const { expressjwt: jwt } = require("express-jwt");
const {isAdmin, isAuthenticated} = require("../middleware/auth");
const { upload } = require("../../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const SECRET_KEY = "q3r#7sG!8fL09p*7h";
const apiRoutes = (app) => { 

    routerAPI.get("/", (req, res) => {
        res.send("Hello from User Microservice")
    });
    routerAPI.post("/create-user", upload.single("file"), catchAsyncErrors(createUser));
    routerAPI.post("/activation", catchAsyncErrors(activateUser));
    routerAPI.post("/login-user", catchAsyncErrors(loginUser));
    routerAPI.get("/getuser", isAuthenticated, catchAsyncErrors(getUser));
    routerAPI.get("/logout", catchAsyncErrors(logoutUser));
    routerAPI.put("/update-user-info", isAuthenticated, catchAsyncErrors(updateUserInfo));
    routerAPI.put("/update-avatar", isAuthenticated, upload.single("image"), catchAsyncErrors(updateUserAvatar));
    routerAPI.put("/update-user-addresses", isAuthenticated, catchAsyncErrors(updateUserAddresses));
    routerAPI.delete("/delete-user-address/:id", isAuthenticated, catchAsyncErrors(deleteUserAddress));
    routerAPI.put("/update-user-password", isAuthenticated, catchAsyncErrors(updateUserPassword));
    routerAPI.get("/user-info/:id", catchAsyncErrors(getUserInfo));
    routerAPI.get("/admin-all-users", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(getAllUsers));
    routerAPI.delete("/delete-user/:id", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(deleteUser));

    app.use("/", routerAPI); // tat cac url se bat dau bang / o day
}

module.exports = apiRoutes;