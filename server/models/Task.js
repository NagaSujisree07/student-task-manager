const mongoose = require('mongoose');

/**
 * Task Schema
 * Defines structure and validation rules for student tasks
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    priority: {
      type: String,
      required: [true, 'Please specify priority level'],
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Priority must be either High, Medium, or Low'
      },
      default: 'Medium'
    },
    deadline: {
      type: Date,
      required: [true, 'Please provide a task deadline']
    },
    status: {
      type: String,
      required: [true, 'Please specify task status'],
      enum: {
        values: ['Pending', 'Completed'],
        message: 'Status must be either Pending or Completed'
      },
      default: 'Pending'
    }
  },
  {
    timestamps: true // Automatically generates createdAt and updatedAt fields
  }
);

// Virtual index on createdAt and deadline for faster query sorting
taskSchema.index({ deadline: 1, status: 1 });

module.exports = mongoose.model('Task', taskSchema);
