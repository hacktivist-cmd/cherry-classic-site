import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json({ cart: user.cart, wishlist: user.wishlist });
});

router.post('/cart', protect, async (req, res) => {
  const { productId, name, price, imageUrl, quantity = 1 } = req.body;
  const user = await User.findById(req.userId);
  const existing = user.cart.find(item => item.productId.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({ productId, name, price, imageUrl, quantity });
  }
  await user.save();
  res.json(user.cart);
});

router.delete('/cart/:productId', protect, async (req, res) => {
  const user = await User.findById(req.userId);
  user.cart = user.cart.filter(item => item.productId.toString() !== req.params.productId);
  await user.save();
  res.json(user.cart);
});

router.post('/wishlist', protect, async (req, res) => {
  const { productId, name, price, imageUrl } = req.body;
  const user = await User.findById(req.userId);
  const exists = user.wishlist.some(item => item.productId.toString() === productId);
  if (!exists) {
    user.wishlist.push({ productId, name, price, imageUrl });
    await user.save();
  }
  res.json(user.wishlist);
});

router.delete('/wishlist/:productId', protect, async (req, res) => {
  const user = await User.findById(req.userId);
  user.wishlist = user.wishlist.filter(item => item.productId.toString() !== req.params.productId);
  await user.save();
  res.json(user.wishlist);
});

export default router;
