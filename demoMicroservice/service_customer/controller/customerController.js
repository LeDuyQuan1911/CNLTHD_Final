const express = require('express'); 
const { Customer } = require('../model/Customer'); // import đúng model
const bcrypt = require('bcrypt'); // import bcrypt để mã hóa mật khẩu
// Tạo customer
const postCustomer = async (req, res) => {
    try {
        const { username, password, email, birth, name } = req.body;
        console.log(req.body); // Kiểm tra dữ liệu đầu vào
        const result = await Customer.create({ username, password, email, birth, name });
        res.status(201).json({
            message: 'Customer created successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create customer', error: err.message });
    }
};

// Lấy tất cả customer
const getCustomer = async (req, res) => {
    try {
        const result = await Customer.find({});
        res.status(200).json({
            message: 'Get all customers successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get customers', error: err.message });
    }
};

// Cập nhật customer
const updateCustomer = async (req, res) => {
    const { id, username, password, email, birth, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await Customer.findByIdAndUpdate(id, {
            username,
            password: hashedPassword,
            email,
            birth,
            name
        }, { new: true });

        res.status(200).json({
            message: 'Customer updated successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to update customer',
            error: err.message
        });
    }
};


// Xoá customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.body;
        
        // Kiểm tra ID
        if (!id) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        // Soft delete khách hàng (Lưu ý truyền vào _id thay vì id)
        const result = await Customer.delete({ _id: id }); // Đảm bảo dùng _id, không phải id

        if (!result) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            message: 'Customer soft deleted successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete customer', error: err.message });
    }
};


module.exports = {
    postCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
};
