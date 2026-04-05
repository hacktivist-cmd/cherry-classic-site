import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, username });
});

// Create default admin (run once)
const createDefaultAdmin = async () => {
  const existing = await Admin.findOne({ username: 'cherryadmin' });
  if (!existing) {
    const admin = new Admin({ username: 'cherryadmin', password: 'Admin123!' });
    await admin.save();
    console.log('Default admin created: cherryadmin / Admin123!');
  }
};
createDefaultAdmin();

export default router;
