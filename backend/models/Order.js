import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    productId: { type: String, required: true },
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String
  }],
  shippingAddress: {
    name: String,
    email: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String
  },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'pay_on_delivery' },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
