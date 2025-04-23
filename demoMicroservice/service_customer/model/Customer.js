const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');

const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ']
    },
    birth: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Hash mật khẩu trước khi lưu
CustomerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Nếu password không thay đổi thì bỏ qua

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Plugin soft delete
CustomerSchema.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = { Customer };
