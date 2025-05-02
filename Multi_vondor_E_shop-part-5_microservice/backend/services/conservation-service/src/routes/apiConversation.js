const express = require("express");
const routerAPI = express.Router();
const {
    createNewConversation,
    getSellerConversations,
    getUserConversations,
    updateLastMessage,
} = require("../controllers/consersationController");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiRoutes = (app) => { 
routerAPI.post("/create-new-conversation", catchAsyncErrors(createNewConversation));
routerAPI.get("/get-all-conversation-seller/:id", isSeller, catchAsyncErrors(getSellerConversations));
routerAPI.get("/get-all-conversation-user/:id", isAuthenticated, catchAsyncErrors(getUserConversations));
routerAPI.put("/update-last-message/:id", catchAsyncErrors(updateLastMessage));
app.use("/", routerAPI); // tat cac url se bat dau bang / o day
}
module.exports = apiRoutes;
