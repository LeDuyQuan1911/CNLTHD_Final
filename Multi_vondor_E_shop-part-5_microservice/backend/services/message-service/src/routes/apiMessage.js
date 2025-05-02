const express = require("express");
const routerAPI = express.Router();
const { upload } = require("../multer");

const {
    createNewMessage,
    getAllMessages,
} = require("../controllers/messageController");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiRoutes = (app) => { 
    // Tạo tin nhắn mới
    routerAPI.post("/create-new-message", upload.single("images"), catchAsyncErrors(createNewMessage));
        // Lấy tất cả tin nhắn theo conversationId
        routerAPI.get("/get-all-messages/:id", catchAsyncErrors(getAllMessages));
app.use("/", routerAPI); 
}
module.exports = apiRoutes;
