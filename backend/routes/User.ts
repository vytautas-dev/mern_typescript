import express from 'express';
import controller from '../controllers/User';
import auth from '../middleware/Auth';

const router = express.Router();

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/me', auth, controller.getMe);

export default router;
