const Messages = require("../models/message");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");


// Tạo tin nhắn mới
const createNewMessage = async (req, res, next) => {
  try {
    const messageData = req.body;

    if (req.file) {
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      messageData.images = fileUrl;
    }

    messageData.conversationId = req.body.conversationId;
    messageData.sender = req.body.sender;
    messageData.text = req.body.text;

    const message = new Messages({
      conversationId: messageData.conversationId,
      text: messageData.text,
      sender: messageData.sender,
      images: messageData.images ? messageData.images : undefined,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Lấy tất cả tin nhắn theo conversation id
const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.id,
    });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createNewMessage,
  getAllMessages,
};