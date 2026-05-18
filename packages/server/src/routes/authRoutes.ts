import { Router } from 'express';
import { register, login, getMe, getUsers } from '../controllers/authController';
import { protect, restrictTo } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/users', protect, restrictTo('Admin'), getUsers);

export default router;
