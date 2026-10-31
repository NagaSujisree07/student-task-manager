import React from 'react';
import './DeleteModal.css';

/**
 * Confirmation modal for deleting a task
 */
export default function DeleteModal({
  isOpen,
  taskTitle,
  onConfirm,
  onCancel,
  isDeleting
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-icon-wrapper">
          ⚠️
        </div>

        <h3 id="modal-title" className="modal-title">
          Delete Task
        </h3>

        <p className="modal-message">
          Are you sure you want to delete this task?
        </p>

        {taskTitle && (
          <div className="modal-task-preview">
            "{taskTitle}"
          </div>
        )}

        <p className="modal-warning">
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary modal-btn"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger-modal modal-btn"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete Task'}
          </button>
        </div>
      </div>
    </div>
  );
}
