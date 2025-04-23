const axios = require('axios');
const { Order } = require('../model/Order'); // Import model Order

const postOrder = async (req, res) => {
    try {
        const { customer, book, quantity, orderDate, totalPrice, status } = req.body;
        // Check book exist
        const dataBook = await axios.get(`http://localhost:3001/v1/api/book`);
        const books = dataBook.data.data;
        const foundBook = books.find(item => item._id === book);
        if (!foundBook) {
            return res.status(400).json({
                message: 'Book not found'
            });
        }

        // Check customer exist
        const dataCustomer = await axios.get(`http://localhost:3002/v1/api/customer`);
        const customers = dataCustomer.data.data;
        const foundCustomer = customers.find(item => item._id === customer);
        if (!foundCustomer) {
            return res.status(400).json({
                message: 'Customer not found'
            });
        }
        const result = await Order.create({
            customer,
            book,
            quantity,
            orderDate,
            totalPrice,
            status
        });
        res.status(201).json({
            message: 'Order created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create order',
            error: error.message
        });
    }
};


// Lấy thông tin đơn hàng
const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        const dataCustomer = await axios.get(`http://localhost:3002/v1/api/customer`);
        const customers = dataCustomer.data.data;
        const foundCustomer = customers.find(item => item._id.toString() === order.customer.toString());

        const dataBook = await axios.get(`http://localhost:3001/v1/api/book`);
        const books = dataBook.data.data;
        const foundBook = books.find(item => item._id.toString() === order.book.toString());


        const result = {
            ...order._doc,
            customer: foundCustomer,
            book: foundBook
        }

        res.status(200).json({
            message: 'Order retrieved successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get order', error: err.message });
    }
};

// Cập nhật đơn hàng
const updateOrder = async (req, res) => {
    // try {
    //     const { orderId, customerId, bookId } = req.body;

    //     // Gửi yêu cầu để cập nhật thông tin đơn hàng
    //     const customerResponse = await axios.get(`${CUSTOMER_API_URL}/${customerId}`);
    //     const bookResponse = await axios.get(`${BOOK_API_URL}/${bookId}`);

    //     const updatedOrder = {
    //         customer: customerResponse.data,
    //         book: bookResponse.data,
    //         updatedDate: new Date()
    //     };

    //     // Cập nhật thông tin đơn hàng vào cơ sở dữ liệu của bạn
    //     // const result = await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true });

    //     res.status(200).json({
    //         message: 'Order updated successfully',
    //         data: updatedOrder
    //     });
    // } catch (err) {
    //     res.status(500).json({ message: 'Failed to update order', error: err.message });
    // }
};

// Xoá đơn hàng
const deleteOrder = async (req, res) => {
    // try {
    //     const { orderId } = req.body;

    //     // Giả sử bạn xoá đơn hàng từ cơ sở dữ liệu
    //     // const result = await Order.findByIdAndDelete(orderId);

    //     res.status(200).json({
    //         message: 'Order deleted successfully'
    //     });
    // } catch (err) {
    //     res.status(500).json({ message: 'Failed to delete order', error: err.message });
    // }
};

module.exports = {
    postOrder,
    getOrder,
    updateOrder,
    deleteOrder
};
