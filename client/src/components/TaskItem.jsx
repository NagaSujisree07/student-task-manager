import React from 'react';
import './TaskItem.css';

/**
 * TaskItem component rendering individual task cards
 */
export default function TaskItem({
  task,
  onToggleStatus,
  onEdit,
  onDelete
}) {
  const isCompleted = task.status === 'Completed';

  // Format created date
  const formatCreatedDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format deadline date & compute urgency
  const getDeadlineMeta = (deadlineStr) => {
    if (!deadlineStr) return { text: 'No deadline', isOverdue: false, isToday: false };

    const deadline = new Date(deadlineStr);
    const now = new Date();

    // Reset hours for accurate calendar day comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const formattedDate = deadline.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    let urgencyLabel = '';
    let isOverdue = false;
    let isToday = false;

    if (!isCompleted) {
      if (diffDays < 0) {
        urgencyLabel = `Overdue (${Math.abs(diffDays)}d ago)`;
        isOverdue = true;
      } else if (diffDays === 0) {
        urgencyLabel = 'Due Today!';
        isToday = true;
      } else if (diffDays === 1) {
        urgencyLabel = 'Due Tomorrow';
      } else if (diffDays <= 7) {
        urgencyLabel = `In ${diffDays} days`;
      }
    }

    return {
      text: formattedDate,
      urgencyLabel,
      isOverdue,
      isToday
    };
  };

  const deadlineMeta = getDeadlineMeta(task.deadline);

  // Priority CSS class
  const priorityClass = `priority-${task.priority.toLowerCase()}`;

  return (
    <article className={`task-card ${isCompleted ? 'task-completed' : ''} ${priorityClass}`}>
      <div className="task-card-main">
        {/* Toggle Status Checkbox */}
        <button
          type="button"
          className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleStatus(task._id, task.status)}
          aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
          title={isCompleted ? 'Click to mark as pending' : 'Click to mark as completed'}
        >
          {isCompleted && <span className="check-mark">✓</span>}
        </button>

        {/* Task Details */}
        <div className="task-content">
          <div className="task-title-row">
            <h4 className={`task-title ${isCompleted ? 'title-done' : ''}`}>
              {task.title}
            </h4>

            <div className="task-badges">
              {/* Priority Badge */}
              <span className={`badge badge-priority badge-priority-${task.priority.toLowerCase()}`}>
                {task.priority === 'High' && '🔴 High'}
                {task.priority === 'Medium' && '🟡 Medium'}
                {task.priority === 'Low' && '🟢 Low'}
              </span>

              {/* Status Badge */}
              <span 
                className={`badge badge-status ${isCompleted ? 'badge-completed' : 'badge-pending'}`}
                onClick={() => onToggleStatus(task._id, task.status)}
                title="Click to toggle status"
              >
                {isCompleted ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>

          {/* Task Description */}
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          {/* Meta Info: Deadline and Created Date */}
          <div className="task-meta">
            <div className="meta-item deadline-item">
              <span className="meta-icon">⏰</span>
              <span className="meta-label">Deadline:</span>
              <span className="meta-value">{deadlineMeta.text}</span>
              {deadlineMeta.urgencyLabel && (
                <span className={`urgency-pill ${deadlineMeta.isOverdue ? 'overdue' : deadlineMeta.isToday ? 'today' : 'upcoming'}`}>
                  {deadlineMeta.urgencyLabel}
                </span>
              )}
            </div>

            <div className="meta-item created-item">
              <span className="meta-icon">📅</span>
              <span className="meta-label">Created:</span>
              <span className="meta-value">{formatCreatedDate(task.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Edit and Delete */}
      <div className="task-actions">
        <button
          type="button"
          className="btn-action btn-edit"
          onClick={() => onEdit(task)}
          title="Edit this task"
        >
          <span className="action-icon">✏️</span>
          <span>Edit</span>
        </button>

        <button
          type="button"
          className="btn-action btn-delete"
          onClick={() => onDelete(task)}
          title="Delete this task"
        >
          <span className="action-icon">🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}
