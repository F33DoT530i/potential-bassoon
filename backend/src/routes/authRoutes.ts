import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { authLimiter, apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', apiLimiter, authenticate, getMe);

export default router;
