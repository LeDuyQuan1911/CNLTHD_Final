const Conversation = require("../models/Consersation");
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new conversation
const createNewConversation = async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    const isConversationExist = await Conversation.findOne({ groupTitle });

    if (isConversationExist) {
      return res.status(201).json({
        success: true,
        conversation: isConversationExist,
      });
    }

    const conversation = await Conversation.create({
      members: [userId, sellerId],
      groupTitle,
    });

    res.status(201).json({ success: true, conversation });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Create failed", 500));
  }
};

// Get all conversations for seller
const getSellerConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(201).json({ success: true, conversations });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Fetch failed", 500));
  }
};

// Get all conversations for user
const getUserConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(201).json({ success: true, conversations });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Fetch failed", 500));
  }
};

// Update the last message
const updateLastMessage = async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { lastMessage, lastMessageId },
      { new: true }
    );

    res.status(201).json({ success: true, conversation });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Update failed", 500));
  }
};

module.exports = {
  createNewConversation,
  getSellerConversations,
  getUserConversations,
  updateLastMessage,
};