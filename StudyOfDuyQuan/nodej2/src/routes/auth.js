// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("admin123", 8), admin: true },
  { id: 2, username: "user", password: bcrypt.hashSync("user123", 8), admin: false },
  { id: 3, username: "user2", password: bcrypt.hashSync("user123", 8), admin: false },
  { id: 4, username: "user3", password: bcrypt.hashSync("user123", 8), admin: false },
]
const router = express.Router();
const SECRET_KEY = "q3r#7sG!8fL09p*7h";

// Đăng nhập
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user){
    return res.status(401).json({ 
      message: "Tài khoản không tồn tại" 
    });
  } 
  if (!bcrypt.compareSync(password, user.password)){
    return res.status(401).json({ 
      message: "Sai mật khẩu" 
    });
  }

  const token = jwt.sign({ sub: user.id, username: user.username, admin: user.admin }, SECRET_KEY, { expiresIn: "1h" });
  const decoded = jwt.decode(token);
  res.json({ token, decoded });
});

module.exports = router;
