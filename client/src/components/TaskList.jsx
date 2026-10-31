import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

/**
 * TaskList component managing filtering, search, sorting, and task items display
 */
export default function TaskList({
  tasks,
  isLoading,
  error,
  onRetry,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortByChange,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onOpenCreateForm
}) {
  return (
    <section className="task-list-section" aria-label="Tasks List">
      {/* Control Bar: Search, Filters, Sorting */}
      <div className="filter-controls-card">
        {/* Search Input */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search assignments, exams, subjects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter & Sort Row */}
        <div className="filter-row">
          {/* Status Tabs */}
          <div className="status-tabs" role="tablist">
            {['All', 'Pending', 'Completed'].map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={statusFilter === tab}
                className={`tab-btn ${statusFilter === tab ? 'active-tab' : ''}`}
                onClick={() => onStatusFilterChange(tab)}
              >
                {tab === 'All' && 'All'}
                {tab === 'Pending' && '⏳ Pending'}
                {tab === 'Completed' && '✅ Completed'}
              </button>
            ))}
          </div>

          {/* Priority & Sort Dropdowns */}
          <div className="dropdown-group">
            {/* Priority Filter */}
            <div className="select-wrapper">
              <label htmlFor="priority-filter" className="control-label">Priority:</label>
              <select
                id="priority-filter"
                className="control-select"
                value={priorityFilter}
                onChange={(e) => onPriorityFilterChange(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="select-wrapper">
              <label htmlFor="sort-filter" className="control-label">Sort:</label>
              <select
                id="sort-filter"
                className="control-select"
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
              >
                <option value="deadline">⏰ Deadline (Closest)</option>
                <option value="deadline-desc">⏰ Deadline (Furthest)</option>
                <option value="newest">🆕 Newest Created</option>
                <option value="oldest">📅 Oldest Created</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-container" aria-live="polite">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="error-card" role="alert">
          <div className="error-icon">⚠️</div>
          <div className="error-body">
            <h4>Failed to Load Tasks</h4>
            <p>{error}</p>
            <button type="button" className="btn btn-secondary btn-retry" onClick={onRetry}>
              🔄 Try Again
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-illustration">📚</div>
          <h3 className="empty-title">No Tasks Found</h3>
          <p className="empty-text">
            {searchQuery || statusFilter !== 'All' || priorityFilter !== 'All'
              ? 'No tasks match your current filter and search criteria.'
              : 'You have not added any tasks yet. Stay ahead of your coursework by creating one now!'}
          </p>
          {searchQuery || statusFilter !== 'All' || priorityFilter !== 'All' ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onSearchChange('');
                onStatusFilterChange('All');
                onPriorityFilterChange('All');
              }}
            >
              Reset Filters
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenCreateForm}
            >
              + Create First Task
            </button>
          )}
        </div>
      )}

      {/* Tasks List */}
      {!isLoading && !error && tasks.length > 0 && (
        <div className="tasks-container">
          <div className="tasks-header">
            <span className="tasks-count">
              Showing {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>
          <div className="task-items-list">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
