import React, { useState, useEffect } from 'react';
import './TaskForm.css';

/**
 * TaskForm component for creating and editing tasks.
 */
export default function TaskForm({
  onSubmit,
  taskToEdit,
  onCancelEdit,
  isSubmitting
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    status: 'Pending'
  });

  const [errors, setErrors] = useState({});

  // When taskToEdit changes, populate form or reset to defaults
  useEffect(() => {
    if (taskToEdit) {
      // Format deadline to YYYY-MM-DD for <input type="date" />
      let formattedDeadline = '';
      if (taskToEdit.deadline) {
        const d = new Date(taskToEdit.deadline);
        if (!isNaN(d.getTime())) {
          formattedDeadline = d.toISOString().split('T')[0];
        }
      }

      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Medium',
        deadline: formattedDeadline,
        status: taskToEdit.status || 'Pending'
      });
      setErrors({});
    } else {
      // Default initial form
      resetForm();
    }
  }, [taskToEdit]);

  const resetForm = () => {
    // Default deadline: 3 days from now
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);
    const defaultDeadline = futureDate.toISOString().split('T')[0];

    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      deadline: defaultDeadline,
      status: 'Pending'
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    } else if (formData.title.trim().length > 120) {
      newErrors.title = 'Title cannot exceed 120 characters';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear inline error on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData, resetForm);
  };

  const isEditing = Boolean(taskToEdit);

  return (
    <div className="task-form-card" id="task-form-section">
      <div className="form-header">
        <div className="form-header-title">
          <span className="form-icon">{isEditing ? '✏️' : '✨'}</span>
          <div>
            <h3>{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
            <p className="form-subtitle">
              {isEditing
                ? 'Update task details, deadline, or priority level'
                : 'Plan an assignment, exam prep, or study target'}
            </p>
          </div>
        </div>
        {isEditing && (
          <button
            type="button"
            className="btn-cancel-edit"
            onClick={onCancelEdit}
            title="Cancel editing"
          >
            ✕ Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Task Title <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-input ${errors.title ? 'input-error' : ''}`}
            placeholder="e.g., Complete Data Structures Lab 4, Read Chapter 6"
            value={formData.title}
            onChange={handleChange}
            disabled={isSubmitting}
            maxLength={120}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description <span className="optional-badge">(Optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="form-textarea"
            placeholder="Add relevant notes, submission link, teammate details or rubric requirements..."
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
            maxLength={1000}
          />
        </div>

        {/* Row for Priority, Deadline, Status */}
        <div className="form-row">
          {/* Priority Field */}
          <div className="form-group col-3">
            <label htmlFor="priority" className="form-label">
              Priority <span className="required-star">*</span>
            </label>
            <div className="priority-select-wrapper">
              <select
                id="priority"
                name="priority"
                className={`form-select priority-${formData.priority.toLowerCase()}`}
                value={formData.priority}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </select>
            </div>
          </div>

          {/* Deadline Field */}
          <div className="form-group col-3">
            <label htmlFor="deadline" className="form-label">
              Deadline <span className="required-star">*</span>
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              className={`form-input ${errors.deadline ? 'input-error' : ''}`}
              value={formData.deadline}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.deadline && <span className="error-text">{errors.deadline}</span>}
          </div>

          {/* Status Field */}
          <div className="form-group col-3">
            <label htmlFor="status" className="form-label">
              Status <span className="required-star">*</span>
            </label>
            <select
              id="status"
              name="status"
              className={`form-select status-${formData.status.toLowerCase()}`}
              value={formData.status}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="form-actions">
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancel Edit
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="btn-spinner">Saving...</span>
            ) : isEditing ? (
              'Save Task Changes'
            ) : (
              '+ Add Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
