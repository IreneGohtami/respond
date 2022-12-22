const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  sku: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  price: {
    type: Number
  },
  upc: {
    type: String
  },
  category: {
    type: Array
  },
  shipping: {
    type: Number
  },
  description: {
    type: String
  },
  manufacturer: {
    type: String
  },
  model: {
    type: String
  },
  url: {
    type: String
  },
  image: {
    type: String
  }
});

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;