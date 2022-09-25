import express from 'express';
import controller from '../controllers/Goal';

const router = express.Router();

router.get('/', controller.getGoals);
router.post('/', controller.setGoal);
router.put('/:id', controller.updateGoal);
router.delete('/:id', controller.deleteGoal);

export default router;
