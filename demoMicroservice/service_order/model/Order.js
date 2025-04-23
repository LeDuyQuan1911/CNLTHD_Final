const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId, // Kiểu ObjectId để tham chiếu tới Customer
        ref: 'Customer', // Tham chiếu tới model Customer
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId, // Kiểu ObjectId để tham chiếu tới Book
        ref: 'Book', // Tham chiếu tới model Book
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Đảm bảo số lượng ít nhất là 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 1 // Đảm bảo số lượng ít nhất là 1
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'canceled'], // Trạng thái đơn hàng
        default: 'pending'
    }
}, { timestamps: true });

// Plugin soft delete
OrderSchema.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };
