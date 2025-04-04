import express from 'express';
const router = express.Router();
import * as mealsCtrl from '../controllers/meals.js';

// INDEX
router.get('/', mealsCtrl.index);

// NEW
router.get('/new', mealsCtrl.newMeal);

// CREATE
router.post('/', mealsCtrl.create);

// SHOW
router.get('/:id', mealsCtrl.show);

// EDIT
router.get('/:id/edit', mealsCtrl.edit);

// UPDATE
router.put('/:id', mealsCtrl.update);

// DELETE
router.delete('/:id', mealsCtrl.destroy); // ✅ this was probably the crash

export default router;
