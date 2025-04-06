import express from 'express';
import Ingredient from '../models/ingredient.js';

const router = express.Router();

// GET /ingredients/search?q=turm
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || '';
    if (!query) return res.json([]);

    const matches = await Ingredient.find({
      name: { $regex: new RegExp(`^${query}`, 'i') }
    }).limit(10);

    res.json(matches);
  } catch (error) {
    console.error('Ingredient search error:', error);
    res.status(500).json({ error: 'Server error searching ingredients' });
  }
});

export default router;
