const express = require("express");
const {
  createUser,
  activateUser,
  loginUser,
  getUser,
  logoutUser,
  updateUserInfo,
  updateAvatar,
  updateUserAddresses,
  deleteUserAddress,
  updateUserPassword,
  getUserInfoById,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { upload } = require("../multer");

const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", activateUser);
router.post("/login-user", loginUser);
router.get("/getuser", isAuthenticated, getUser);
router.get("/logout", logoutUser);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.put("/update-avatar", isAuthenticated, upload.single("image"), updateAvatar);
router.put("/update-user-addresses", isAuthenticated, updateUserAddresses);
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);
router.put("/update-user-password", isAuthenticated, updateUserPassword);
router.get("/user-info/:id", getUserInfoById);
router.get("/admin-all-users", isAuthenticated, isAdmin("Admin"), getAllUsers);
router.delete("/delete-user/:id", isAuthenticated, isAdmin("Admin"), deleteUser);

module.exports = router;