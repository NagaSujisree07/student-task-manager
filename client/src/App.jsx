import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import TaskStats from './components/TaskStats';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import DeleteModal from './components/DeleteModal';
import Notification from './components/Notification';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
} from './api/taskApi';
import './App.css';

export default function App() {
  // Main data state
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form & Action states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter & Search states
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');

  // Feedback Notification state
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  /**
   * Load tasks from backend API
   */
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllTasks();
      if (response && response.data) {
        setTasks(response.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError(
        err.message || 'Unable to connect to the server. Please verify backend is running on port 5000.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Create or update task handler
   */
  const handleCreateOrUpdateTask = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        // Update existing task
        const response = await updateTask(taskToEdit._id, formData);
        const updatedTask = response.data;
        setTasks((prev) =>
          prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
        showNotification('Task updated successfully!', 'success');
        setTaskToEdit(null);
      } else {
        // Create new task
        const response = await createTask(formData);
        const createdTask = response.data;
        setTasks((prev) => [createdTask, ...prev]);
        showNotification('Task created successfully!', 'success');
      }
      resetForm();
    } catch (err) {
      console.error('Error saving task:', err);
      showNotification(err.message || 'Failed to save task. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Toggle task status between Completed and Pending
   */
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await toggleTaskStatus(id, currentStatus);
      const updatedTask = response.data;
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? updatedTask : t))
      );
      const isNowCompleted = updatedTask.status === 'Completed';
      showNotification(
        isNowCompleted ? 'Task marked as Completed! Great job!' : 'Task moved back to Pending.',
        'info'
      );
    } catch (err) {
      console.error('Error updating status:', err);
      showNotification(err.message || 'Failed to update task status.', 'error');
    }
  };

  /**
   * Set task for editing and scroll into view
   */
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    const formElement = document.getElementById('task-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * Cancel editing
   */
  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  /**
   * Open delete confirmation dialog
   */
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
  };

  /**
   * Close delete confirmation dialog
   */
  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setTaskToDelete(null);
    }
  };

  /**
   * Confirm task deletion
   */
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete._id);
      setTasks((prev) => prev.filter((t) => t._id !== taskToDelete._id));
      showNotification('Task deleted successfully.', 'info');
      setTaskToDelete(null);
      // If the currently edited task was deleted, cancel edit
      if (taskToEdit && taskToEdit._id === taskToDelete._id) {
        setTaskToEdit(null);
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      showNotification(err.message || 'Failed to delete task.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Quick Add button clicked in Navbar
   */
  const handleQuickAddTask = () => {
    setTaskToEdit(null);
    const formElement = document.getElementById('task-form-section');
    const titleInput = document.getElementById('title');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (titleInput) {
        titleInput.focus();
      }
    }
  };

  /**
   * Filter and sort tasks for display
   */
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Status filter
        if (statusFilter !== 'All' && task.status !== statusFilter) {
          return false;
        }

        // Priority filter
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const titleMatch = task.title?.toLowerCase().includes(q);
          const descMatch = task.description?.toLowerCase().includes(q);
          if (!titleMatch && !descMatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return new Date(a.deadline) - new Date(b.deadline);
        } else if (sortBy === 'deadline-desc') {
          return new Date(b.deadline) - new Date(a.deadline);
        } else if (sortBy === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
      });
  }, [tasks, statusFilter, priorityFilter, searchQuery, sortBy]);

  return (
    <div className="app-container">
      {/* Sticky Navbar */}
      <Navbar onQuickAddTask={handleQuickAddTask} />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Statistics Cards & Progress */}
        <TaskStats
          tasks={tasks}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />

        {/* Task Form (Add / Edit) */}
        <TaskForm
          onSubmit={handleCreateOrUpdateTask}
          taskToEdit={taskToEdit}
          onCancelEdit={handleCancelEdit}
          isSubmitting={isSubmitting}
        />

        {/* Task List (Search, Filters & Cards) */}
        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          error={error}
          onRetry={loadTasks}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={handleOpenDeleteModal}
          onOpenCreateForm={handleQuickAddTask}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>🎓 Student Task Manager &bull; Built with React, Express & MongoDB</p>
      </footer>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(taskToDelete)}
        taskTitle={taskToDelete ? taskToDelete.title : ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
        isDeleting={isDeleting}
      />

      {/* Toast Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
