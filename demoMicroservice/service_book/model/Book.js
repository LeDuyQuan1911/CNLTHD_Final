const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    }
});

BookSchema.plugin(mongoose_delete, { overrideMethods: 'all' }, { deletedAt : true });
const Book = mongoose.model('Book', BookSchema);
module.exports = {Book};