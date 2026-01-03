import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { authenticate } from '../middleware/auth';
import { createLimiter, apiLimiter } from '../middleware/rateLimiter';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.route('/').get(apiLimiter, getTasks).post(createLimiter, createTask);
router.route('/:id').get(apiLimiter, getTask).put(apiLimiter, updateTask).delete(apiLimiter, deleteTask);

export default router;
