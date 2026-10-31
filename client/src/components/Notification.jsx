import React, { useEffect } from 'react';
import './Notification.css';

/**
 * Toast notification for feedback messages
 */
export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification-toast notification-${type}`} role="alert">
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
        </span>
        <span className="notification-message">{message}</span>
      </div>
      <button 
        type="button" 
        className="notification-close" 
        onClick={onClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}
