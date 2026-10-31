import React from 'react';
import './Navbar.css';

/**
 * Navbar component for Student Task Manager
 */
export default function Navbar({ onQuickAddTask }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">🎓</div>
          <div className="brand-text">
            <h1 className="brand-title">Student Task Manager</h1>
            <p className="brand-subtitle">Organize coursework, deadlines & study goals</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="date-pill">
            <span className="calendar-icon">📅</span>
            <span>{today}</span>
          </div>
          <button 
            type="button" 
            className="btn-add-quick"
            onClick={onQuickAddTask}
            title="Create a new task"
          >
            <span className="btn-icon">+</span>
            <span>New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
