import express from 'express';
import Product from '../models/Product.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Get all products
router.get('/', protectAdmin, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Create product
router.post('/', protectAdmin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Update product
router.put('/:id', protectAdmin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Delete product
router.delete('/:id', protectAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

export default router;
