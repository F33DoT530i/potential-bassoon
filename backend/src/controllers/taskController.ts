import { Response } from 'express';
import Joi from 'joi';
import { Task } from '../models/Task';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// Validation schemas
const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

// @desc    Get all tasks for current user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching tasks',
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Error fetching task',
      });
    }
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const task = await Task.create({
      ...value,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Error creating task',
      });
    }
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      value,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Error updating task',
      });
    }
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Error deleting task',
      });
    }
  }
};
