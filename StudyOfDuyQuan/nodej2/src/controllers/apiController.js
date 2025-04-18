const User = require('../models/user');

const getUsersAPI = async (req, res) => {
  try {
    const users = await User.find({}); // Lấy tất cả người dùng
    return res.status(200).json({
      message: 'Lấy danh sách người dùng thành công',
      errorCode: 0,
      data: users, 
    });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách người dùng');
  }
};

module.exports = { getUsersAPI };
