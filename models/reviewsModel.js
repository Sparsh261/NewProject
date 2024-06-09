const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review: String,
    rating: Number,
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

const reviewsModel = mongoose.model('Reviews', reviewSchema)

module.exports = reviewsModel