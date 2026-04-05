import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/seed', async (req, res) => {
  const sampleProducts = [
    { name: 'Velvet Cherry Wave', price: 299, category: 'Frontal', imageUrl: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=1200', description: '26" Frontal Unit • Pre-plucked Natural Hairline', isTrending: true },
    { name: 'Lace Essentials', price: 159, category: 'Lace', imageUrl: 'https://images.unsplash.com/photo-1595475884199-ad286421e7bb?auto=format&fit=crop&q=80&w=800', description: 'HD Lace Closure' },
    { name: 'Silk Wrap', price: 89, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800', description: 'Silk Bonnet' }
  ];
  await Product.insertMany(sampleProducts);
  res.json({ message: 'Products seeded' });
});

export default router;
