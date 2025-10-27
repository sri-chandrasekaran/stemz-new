// src/components/NotificationToast.js
// Toast notification system that shows pop-ups and redirects to dashboard

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ToastNotification = ({ notification, onClose, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const handleClick = () => {
    handleClose();
    onNavigate(); // Navigate to dashboard
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'announcement': return '📢';
      case 'quiz_failure': return '⚠️';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'assignment': return '#4CAF50';
      case 'announcement': return '#2196F3';
      case 'quiz_failure': return '#f44336';
      default: return '#9C27B0';
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`toast-notification ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        border: `3px solid ${getNotificationColor(notification.type)}`,
        borderRadius: '12px',
        padding: '16px',
        maxWidth: '350px',
        minWidth: '300px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        zIndex: 10000,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
        opacity: isExiting ? 0 : 1
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ 
          fontSize: '24px',
          flexShrink: 0,
          marginTop: '2px'
        }}>
          {getNotificationIcon(notification.type)}
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '4px',
            wordBreak: 'break-word'
          }}>
            {notification.title}
          </div>
          
          <div style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.4',
            marginBottom: '8px',
            wordBreak: 'break-word'
          }}>
            {notification.message?.length > 100 
              ? `${notification.message.substring(0, 100)}...`
              : notification.message
            }
          </div>
          
          <div style={{
            fontSize: '12px',
            color: '#999',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{notification.physicalClassroomId?.name || 'Classroom'}</span>
            <span style={{
              backgroundColor: getNotificationColor(notification.type),
              color: 'white',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              Click to view
            </span>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            color: '#999',
            cursor: 'pointer',
            padding: '0',
            flexShrink: 0,
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  // Function to add new toast (will be called from other components)
  const addToast = (notification) => {
    const id = Date.now() + Math.random();
    const toast = { ...notification, id };
    setToasts(prev => [...prev, toast]);
  };

  // Function to remove toast
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Navigate to dashboard
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  // Make addToast available globally
  React.useEffect(() => {
    window.showNotificationToast = addToast;
    return () => {
      delete window.showNotificationToast;
    };
  }, []);

  return (
    <>
      {toasts.map(toast => (
        <ToastNotification
          key={toast.id}
          notification={toast}
          onClose={() => removeToast(toast.id)}
          onNavigate={navigateToDashboard}
        />
      ))}
    </>
  );
};

// CSS styles for animations
const toastStyles = `
  .toast-enter {
    animation: slideInRight 0.3s ease-out;
  }
  
  .toast-exit {
    animation: slideOutRight 0.3s ease-in;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .toast-notification:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
  }
`;

// Inject CSS styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = toastStyles;
  document.head.appendChild(styleSheet);
}

// Hook for other components to show toasts
export const useNotificationToast = () => {
  return {
    showToast: (notification) => {
      if (window.showNotificationToast) {
        window.showNotificationToast(notification);
      }
    }
  };
};

export default ToastNotification;