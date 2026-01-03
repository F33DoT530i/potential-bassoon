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

// All routes require authentication and rate limiting
router.use(apiLimiter, authenticate);

router.route('/').get(getTasks).post(createLimiter, createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router;
