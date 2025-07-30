// src/utils/NotificationAPIs.js
// Updated API helper for Physical Classroom system using your existing call_api

import { call_api } from '../api';

/**
 * Get notifications for current user (Physical Classroom)
 */
export const getMyNotifications = async () => {
  try {
    const response = await call_api(null, 'notifications/my-notifications', 'GET');
    return response || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

/**
 * Get assignments for current user (Physical Classroom)
 */
export const getMyAssignments = async () => {
  try {
    const response = await call_api(null, 'assignments/my-assignments', 'GET');
    return response || [];
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
};

/**
 * Get notification summary
 */
export const getNotificationSummary = async () => {
  try {
    const response = await call_api(null, 'notifications/summary', 'GET');
    return response || { unreadCount: 0, urgentCount: 0, assignmentCount: 0, hasNotifications: false };
  } catch (error) {
    console.error('Error fetching notification summary:', error);
    return { unreadCount: 0, urgentCount: 0, assignmentCount: 0, hasNotifications: false };
  }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await call_api(null, `notifications/read/${notificationId}`, 'POST');
    return response;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Dismiss notification
 */
export const dismissNotification = async (notificationId) => {
  try {
    const response = await call_api(null, `notifications/dismiss/${notificationId}`, 'POST');
    return response;
  } catch (error) {
    console.error('Error dismissing notification:', error);
    throw error;
  }
};

/**
 * Clear all notifications
 */
export const clearAllNotifications = async () => {
  try {
    const response = await call_api(null, 'notifications/clear-all', 'POST');
    return response;
  } catch (error) {
    console.error('Error clearing all notifications:', error);
    throw error;
  }
};

/**
 * Report quiz failure to teachers (Physical Classroom)
 */
export const reportQuizFailure = async (failureData) => {
  try {
    const response = await call_api(failureData, 'notifications/quiz-failure', 'POST');
    return response;
  } catch (error) {
    console.error('Error reporting quiz failure:', error);
    throw error;
  }
};

export default {
  getMyNotifications,
  getMyAssignments,
  getNotificationSummary,
  markNotificationAsRead,
  dismissNotification,
  clearAllNotifications,
  reportQuizFailure
};