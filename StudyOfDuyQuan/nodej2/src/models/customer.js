const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete'); // import mongoose

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: String,
    phone: String,
    email: String,
    Image: String,
    description: String,
  }, {timestamps: true, });

// Override all methods
customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' }, { deletedAt : true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;