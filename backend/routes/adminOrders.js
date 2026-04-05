import express from 'express';
import Order from '../models/Order.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Get all orders
router.get('/', protectAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Update order status
router.put('/:id/status', protectAdmin, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

export default router;
