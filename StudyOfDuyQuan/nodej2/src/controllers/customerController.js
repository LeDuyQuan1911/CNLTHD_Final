const express = require('express'); // import express
const { uploadSingleFile } = require('../services/fileService');
const {createCustomerService} = require('../services/customerService'); // Import service để xử lý logic
const Customer = require('../models/customer');
const aqp = require('api-query-params');


const postCreateCustomer = async (req, res) => {
    const { name, address, phone, email, Image, description } = req.body; // Lấy thông tin người dùng từ body request
    let imageUrl = "";
    // image:
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          message: 'Không có file nào được tải lên',
          errorCode: 1, 
          data: [],
        });
      }
    else if (req.files && req.files.image) {
        let resultImage = await uploadSingleFile(req.files.image) // Gọi hàm uploadSingleFile từ fileService
        imageUrl = resultImage.path; // Lưu đường dẫn của ảnh vào biến imageUrl
    }
    try {
    let result = {name, address, phone, email, Image, description, image: imageUrl}; // Gọi hàm createUserService từ service để tạo người dùng mới
    await createCustomerService(result); // Gọi hàm createUserService từ service để tạo người dùng mới
    return res.status(200).json({
        message: 'Tạo người dùng thành công',
        errorCode: 0,
        data: result,
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

const postCreateManyCustomer = async (req, res) => {
    const arrayCustomer = req.body;
  
    if (!Array.isArray(arrayCustomer)) {
      return res.status(400).json({
        message: 'Dữ liệu gửi lên không phải là mảng',
        errorCode: 1,
      });
    }
  
    try {
      // Tạo mảng các Promise
      const promises = arrayCustomer.map(async customer => {
        const { name, address, phone, email, description } = customer;
        if (name && address && phone && email && description) {
          return await Customer.create({ name, address, phone, email, description });
        }
        return null; // bỏ qua bản ghi không hợp lệ
      });
  
      // Đợi tất cả Promise hoàn thành
      let result = await Promise.all(promises);
  
      // Lọc null nếu có bản ghi không hợp lệ
      result = result.filter(r => r !== null);
  
      return res.status(200).json({
        message: 'Dữ liệu thành công',
        errorCode: 0,
        data: result,
      });
    } catch (error) {
      console.error('Lỗi khi tạo user:', error);
      return res.status(500).json({
        message: 'Lỗi server',
        errorCode: 2,
      });
    }
  };

  const getAllCustomer = async (req,res) =>{
    const {name} = req.query; // Lấy thông tin người dùng từ body request
    const {page, limit} = req.query; // Lấy thông tin người dùng từ body request
    const skip = (page - 1) * limit; // Tính toán số bản ghi cần bỏ qua
    let result = null;
    if(name && page && limit){
        result = await Customer.find({name: {$regex: name, $options: 'i'}}).skip(skip).limit(limit); // Tìm kiếm người dùng theo tên
        const total = await Customer.countDocuments({name: {$regex: name, $options: 'i'}}); // Đếm tổng số bản ghi
        return res.status(200).json({
            message: 'Lấy danh sách người dùng thành công',
            errorCode: 0,
            data: result,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total,
                totalPage: Math.ceil(total / limit), // Tính toán tổng số trang
            }
        })
    }
    if(page && limit) {
        const user = await Customer.find({}).skip(skip).limit(limit); 
        const total = await Customer.countDocuments({}); // Đếm tổng số bản ghi
        return res.status(200).json({
            message: 'Lấy danh sách người dùng thành công',
            errorCode: 0,
            data: user,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total,
                totalPage: Math.ceil(total / limit), // Tính toán tổng số trang
            }
        })
    }else{
        result = await Customer.find({}) 
        // console.log(result)
        res.status(200).json({
            message: 'Lấy danh sách người dùng thành công',
            errorCode: 0,
            data: result
        })
    } 
  }

  const updateCustomer = async (req,res) =>{
    const { id, name, address, phone, email, description } = req.body; // Lấy thông tin người dùng từ body request
    console.log(req.body)
    let result = await Customer.findByIdAndUpdate(id, { name, address, phone, email, description }, {new : true}); // Gọi hàm createUserService từ service để tạo người dùng mới
    res.status(200).json({
        message: 'Cập nhật người dùng thành công',
        errorCode: 0,
        data: result
    })
  }

  const deleteCustomer = async (req,res) =>{
    const {id} = req.body; // Lấy thông tin người dùng từ body request
    const result = await Customer.deleteById(id); // Gọi hàm createUserService từ service để tạo người dùng mới
    console.log(id)
    res.status(200).json({
        message: 'Xóa người dùng thành công',
        errorCode: 0,
        data: result
    })
  }

  const deleteCustomers = async (req, res) => {
    const { ids } = req.body; // Lấy thông tin người dùng từ body request
    let result = [];
    try {
      const promises = ids.map(async (id) => {
        const result_id = await Customer.deleteById(id); // Gọi hàm xóa
        if (result_id) {
          result.push({ id, status: 'deleted' });
        } else {
          result.push({ id, status: 'not found' });
        }
      });
  
      await Promise.all(promises);
  
      return res.status(200).json({
        message: 'Xóa người dùng thành công',
        errorCode: 0,
        data: result, // Trả về thông tin về các bản ghi đã xóa
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Lỗi server',
        errorCode: 2,
      });
    }
  };
  
  
module.exports = {postCreateCustomer, postCreateManyCustomer, getAllCustomer, updateCustomer, deleteCustomer, deleteCustomers}
