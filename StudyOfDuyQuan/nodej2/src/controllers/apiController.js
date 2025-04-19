const e = require('express');
const User = require('../models/user');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService'); // Import multer config
const { data } = require('autoprefixer');

const getUsersAPI = async (req, res) => {
  try {
    const users = await User.find({}); // Lấy tất cả người dùng
    return res.status(200).json({
      message: 'Lấy danh sách người dùng thành công',
      errorCode: 0,
      data: users, 
    });
  } catch (err) {
    res.status(500).json({
      message: 'Lỗi khi lấy danh sách người dùng',
      errorCode: 1,
      data: [],
      error: err.message || 'Internal Server Error',
    })
  }
};

const postUsersAPI = async (req, res) => {  
  try {
    let { name, email, city } = req.body; // Lấy thông tin người dùng từ body request
    let user = await User.create({ name, email, city }); // Tạo người dùng mới trong cơ sở dữ liệu
    return res.status(200).json({
      message: 'Tạo người dùng thành công',
      errorCode: 0,
      data: user,
    });
  } catch (error) {
      res.status(500).json({
        message: 'Lỗi khi tạo người dùng',
        errorCode: 1,
        data: [],
        error: error.message || 'Internal Server Error',
      })
  }
}

const putUsersAPI = async (req, res) => { 
  try {
    let { id, name, email, city } = req.body; // Lấy thông tin người dùng từ body request
    let user = await User.findByIdAndUpdate(id, { name, email, city }, { new: true }); // Cập nhật thông tin người dùng trong cơ sở dữ liệu
    res.status(200).json({
      message: 'Cập nhật người dùng thành công',
      errorCode: 0,
      data: user,
    });
  }
  catch (error) {
    res.status(500).json({
      message: 'Lỗi khi cập nhật người dùng',
      errorCode: 1,
      data: [],
      error: error.message || 'Internal Server Error',
    })
  }

}

const deleteUsersAPI = async (req, res) => { 
  try {
    let userId = req.body.id; // Lấy ID từ URL
    user = await User.findByIdAndDelete(userId); // Xóa người dùng theo ID
    res.status(200).json({
      message: 'Xóa người dùng thành công',
      errorCode: 0,
      data: user,
    });
  }
    catch(error) {
      res.status(500).json({
        message: 'Lỗi khi xóa người dùng',
        errorCode: 1,
        data: [],
        error: error.message || 'Internal Server Error',
      })
    }
}
  
  const postUploadSingleFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: 'Không có file nào được tải lên',
        errorCode: 1, 
        data: [],
      });
    }
    
    let result = await uploadSingleFile(req.files.image) // Gọi hàm uploadSingleFile từ fileService
    console.log(result)
    return res.status(200).json({
      message: 'Tải lên file thành công',
      data: result,
    })

  }
  const postUploadMultipleFiles = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: 'Không có file nào được tải lên',
        errorCode: 1,
        data: [],
      });
    }
    
    if(Array.isArray(req.files.image)){
      let result = await uploadMultipleFiles(req.files.image) // Gọi hàm uploadSingleFile từ fileService
      return res.status(200).json({ 
        message: 'Tải lên nhiều file thành công',
        path: result.path,
        errorCode: 0,
        data: result,
      });
    }
    else{
      let result = await uploadSingleFile(req.files.image) // Gọi hàm uploadSingleFile từ fileService\
      return res.status(200).json({ 
        message: 'Tải lên nhiều file thành công',
        errorCode: 0,
        data: result,
      })
    }
    
  }

module.exports = { getUsersAPI, postUsersAPI, putUsersAPI, deleteUsersAPI, postUploadSingleFile, postUploadMultipleFiles };
