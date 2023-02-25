const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    reviews: [{
        user: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        userId: { type: String, required: true }
    }],
});


module.exports = mongoose.model('Book', bookSchema);