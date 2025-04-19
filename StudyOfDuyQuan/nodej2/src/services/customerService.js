const Customer = require('../models/customer');

const createCustomerService = async (customerData) => {
    try {
        const newCustomer = await Customer.create(customerData);
        return newCustomer
    } catch (error) {
        throw new Error('Error creating customer: ' + error.message); // Xử lý lỗi nếu có
    }
}

module.exports = {
    createCustomerService,
}