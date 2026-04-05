import express from 'express';
import Coupon from '../models/Coupon.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Get all coupons (public for validation, but we'll check validity)
router.get('/validate/:code', async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase(), active: true });
  if (!coupon) return res.status(404).json({ valid: false });
  const now = new Date();
  if (coupon.expiresAt && now > coupon.expiresAt) return res.status(400).json({ valid: false, message: 'Expired' });
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return res.status(400).json({ valid: false, message: 'Max uses reached' });
  res.json({ valid: true, discountType: coupon.discountType, discountValue: coupon.discountValue, minOrder: coupon.minOrder });
});

// Admin CRUD
router.get('/', protectAdmin, async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json(coupons);
});

router.post('/', protectAdmin, async (req, res) => {
  const coupon = new Coupon(req.body);
  await coupon.save();
  res.status(201).json(coupon);
});

router.put('/:id', protectAdmin, async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(coupon);
});

router.delete('/:id', protectAdmin, async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ message: 'Coupon deleted' });
});

export default router;
