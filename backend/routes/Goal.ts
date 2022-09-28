import express from 'express';
import controller from '../controllers/Goal';
import auth from '../middleware/Auth';

const router = express.Router();

router.get('/', auth, controller.getGoals);
router.post('/', auth, controller.setGoal);
router.put('/:id', auth, controller.updateGoal);
router.delete('/:id', auth, controller.deleteGoal);

export default router;
