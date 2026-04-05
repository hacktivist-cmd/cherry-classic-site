import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendOrderConfirmation } from '../utils/emailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, paymentMethod } = req.body;
    
    // Reduce stock for each item
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }
    
    const order = new Order({
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: paymentMethod || 'pay_on_delivery',
      status: 'Pending'
    });
    await order.save();
    
    // Send email confirmation
    try {
      await sendOrderConfirmation(order, shippingAddress.email, shippingAddress.name);
    } catch (emailErr) {
      console.error('Email failed:', emailErr);
    }
    
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Track order endpoint remains same...
router.get('/track', async (req, res) => {
  const { email, orderId } = req.query;
  const order = await Order.findOne({ _id: orderId, 'shippingAddress.email': email });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// Public list (optional)
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
