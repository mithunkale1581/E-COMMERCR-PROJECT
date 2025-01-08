const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    salePrice: Number,
    totalStock: Number,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);