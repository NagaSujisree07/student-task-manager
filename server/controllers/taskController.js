const mongoose = require('mongoose');
const Task = require('../models/Task');

/**
 * @desc    Get all tasks (with optional query filters)
 * @route   GET /api/tasks
 * @access  Public
 */
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sortBy } = req.query;

    // Build filter object
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (priority && priority !== 'All') {
      filter.priority = priority;
    }

    if (search && search.trim() !== '') {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    // Build sort object
    let sortOption = { deadline: 1 }; // Default: closest deadline first
    if (sortBy === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sortBy === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sortBy === 'deadline-desc') {
      sortOption = { deadline: -1 };
    } else if (sortBy === 'priority') {
      // Custom priority sort handled client side or with collation
      sortOption = { deadline: 1 };
    }

    const tasks = await Task.find(filter).sort(sortOption);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Task ID format'
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, deadline, status } = req.body;

    // Field presence validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    if (!deadline) {
      return res.status(400).json({
        success: false,
        message: 'Task deadline date is required'
      });
    }

    // Validate deadline is valid date
    const parsedDeadline = new Date(deadline);
    if (isNaN(parsedDeadline.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid deadline date'
      });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'Medium',
      deadline: parsedDeadline,
      status: status || 'Pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Task ID format'
      });
    }

    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${id}' not found`
      });
    }

    // Prepare fields to update
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title.trim();
    if (req.body.description !== undefined) updateData.description = req.body.description.trim();
    if (req.body.priority !== undefined) updateData.priority = req.body.priority;
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.deadline !== undefined) {
      const parsedDeadline = new Date(req.body.deadline);
      if (isNaN(parsedDeadline.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid deadline date format'
        });
      }
      updateData.deadline = parsedDeadline;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Task ID format'
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: task._id }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
