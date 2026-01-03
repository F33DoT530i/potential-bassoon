import { Router } from 'express';
import authRoutes from './authRoutes';
import taskRoutes from './taskRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

export default router;
