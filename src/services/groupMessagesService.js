import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { buildApiUrl } from '../config/api-config';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Resolve current user ID from login_response or JWT
 * @returns {string|null} senderUserId
 */
function getSenderUserId() {
  try {
    const loginResponse = localStorage.getItem('login_response');
    if (loginResponse) {
      const parsed = JSON.parse(loginResponse);
      const userId = parsed?.user?._id;
      if (userId) return userId;
    }
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?.id) return decoded.id;
    }
  } catch (_e) {}
  return null;
}

/**
 * Get messages for a study group (matches backend GET api/group-messages/:groupId)
 * @param {string} groupId - Study group's ObjectId
 * @returns {Promise<Array>} - Array of message objects sorted oldest to newest
 */
export async function getMessagesByStudyGroup(groupId) {
  try {
    if (!groupId) throw new Error('Group ID is required');

    const res = await axios.get(buildApiUrl(`group-messages/${groupId}`), {
      headers: authHeaders(),
    });
    const data = res.data;
    const messages = Array.isArray(data) ? data : (data?.messages ?? []);
    return messages;
  } catch (error) {
    console.error('Error fetching group messages:', error);
    if (error.response?.status === 404) throw new Error('Study group not found');
    if (error.response?.status === 403) throw new Error('You are not a member of this study group');
    throw error;
  }
}

/**
 * Post a message to a study group (matches backend POST api/group-messages/:groupId)
 * @param {string} groupId - Study group's ObjectId
 * @param {Object} messageData - { content, attachments? }
 * @returns {Promise<Object>} - Created message object
 */
export async function postGroupMessage(groupId, messageData) {
  try {
    if (!groupId) throw new Error('Group ID is required');
    if (!messageData?.content?.trim()) throw new Error('Message content is required');

    const senderUserId = await getSenderUserId();
    if (!senderUserId) throw new Error('User not authenticated');

    const payload = {
      content: messageData.content.trim(),
      attachments: messageData.attachments ?? [],
      senderUserId,
    };

    const res = await axios.post(buildApiUrl(`group-messages/${groupId}`), payload, {
      headers: authHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error('Error posting group message:', error);
    if (error.response?.status === 404) throw new Error('Study group not found');
    if (error.response?.status === 403) throw new Error('You are not a member of this study group');
    if (error.response?.status === 400) throw new Error('Invalid message data');
    throw error;
  }
}

/**
 * Edit a message (matches backend PUT api/group-messages/message/:messageId)
 * @param {string} messageId - Message's ObjectId
 * @param {string} content - Updated message content
 * @returns {Promise<Object>} - Updated message object
 */
export async function updateMessage(messageId, content) {
  try {
    if (!messageId) throw new Error('Message ID is required');
    if (!content?.trim()) throw new Error('Message content is required');

    const res = await axios.put(
      buildApiUrl(`group-messages/message/${messageId}`),
      { content: content.trim() },
      { headers: authHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing message:', error);
    if (error.response?.status === 404) throw new Error('Message not found');
    if (error.response?.status === 403) throw new Error('You can only edit your own messages');
    throw error;
  }
}

/**
 * Delete a message (soft delete) (matches backend DELETE api/group-messages/message/:messageId)
 * @param {string} messageId - Message's ObjectId
 * @returns {Promise<Object>} - Deletion confirmation
 */
export async function deleteMessage(messageId) {
  try {
    if (!messageId) throw new Error('Message ID is required');

    const res = await axios.delete(buildApiUrl(`group-messages/message/${messageId}`), {
      headers: authHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error('Error deleting message:', error);
    if (error.response?.status === 404) throw new Error('Message not found');
    if (error.response?.status === 403) throw new Error('You can only delete your own messages');
    throw error;
  }
}
