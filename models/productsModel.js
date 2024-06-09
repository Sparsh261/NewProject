const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }],
    images: [String]
})

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;