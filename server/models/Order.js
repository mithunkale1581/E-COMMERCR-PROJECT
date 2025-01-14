const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    phone: String,
    city: String,
    pincode: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: String,
  orderDate: String,
  orderUpdateDate: String,
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", OrderSchema);
