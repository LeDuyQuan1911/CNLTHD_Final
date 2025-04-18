const { get } = require('http');
const User = require('../models/user');

const getHomePage = async (req, res) => {
  try {
    const users = await User.find({}); // Lấy tất cả người dùng
    res.render('sample.ejs', { users: users }); // Truyền 'users' vào view
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách người dùng');
  }
};

const getUpdatePage = async (req, res) => { 
  const userId = req.params.id; // Lấy ID từ URL
  let user = await User.findById(userId); // Tìm người dùng theo ID
  res.render('updateUser.ejs', { user: user }); // Truyền người dùng vào view
}

const postUpdatePage = async (req, res) => { 
  try {
    const { name, email, city } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email, city });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Cập nhật thất bại');
  }
};

const postDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy ID từ URL
    await User.findByIdAndDelete(userId); // Xóa người dùng theo ID
    res.redirect('/'); // Quay lại trang chính sau khi xóa
  } catch (err) {
    res.status(500).send('Xóa thất bại');
  }
};


module.exports = { getHomePage, getUpdatePage, postUpdatePage, postDeleteUser };
