import React from 'react';
import './TaskStats.css';

/**
 * TaskStats component showing Total, Pending, and Completed counters
 * with a completion progress bar and quick filter toggle.
 */
export default function TaskStats({ tasks, activeFilter, onFilterChange }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;

  const percentComplete = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="stats-section" aria-label="Task Statistics">
      <div className="stats-grid">
        {/* Total Tasks Card */}
        <div 
          className={`stat-card stat-total ${activeFilter === 'All' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('All')}
          role="button"
          tabIndex={0}
          title="Click to view all tasks"
        >
          <div className="stat-card-inner">
            <div className="stat-info">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-number">{total}</span>
            </div>
            <div className="stat-icon-wrapper total-icon">
              📋
            </div>
          </div>
          <div className="stat-footer">
            <span className="stat-tag">All enrolled tasks</span>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div 
          className={`stat-card stat-pending ${activeFilter === 'Pending' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('Pending')}
          role="button"
          tabIndex={0}
          title="Click to view pending tasks"
        >
          <div className="stat-card-inner">
            <div className="stat-info">
              <span className="stat-label">Pending</span>
              <span className="stat-number">{pending}</span>
            </div>
            <div className="stat-icon-wrapper pending-icon">
              ⏳
            </div>
          </div>
          <div className="stat-footer">
            <span className="stat-tag pending-tag">Awaiting completion</span>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div 
          className={`stat-card stat-completed ${activeFilter === 'Completed' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('Completed')}
          role="button"
          tabIndex={0}
          title="Click to view completed tasks"
        >
          <div className="stat-card-inner">
            <div className="stat-info">
              <span className="stat-label">Completed</span>
              <span className="stat-number">{completed}</span>
            </div>
            <div className="stat-icon-wrapper completed-icon">
              🎉
            </div>
          </div>
          <div className="stat-footer">
            <span className="stat-tag completed-tag">Finished successfully</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Banner */}
      <div className="progress-banner">
        <div className="progress-header">
          <span className="progress-title">Overall Semester Progress</span>
          <span className="progress-percentage">{percentComplete}% Complete</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={percentComplete} aria-valuemin="0" aria-valuemax="100">
          <div 
            className="progress-fill" 
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>
    </section>
  );
}
