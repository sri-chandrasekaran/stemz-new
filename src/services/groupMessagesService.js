import axios from 'axios';
import { buildApiUrl } from '../config/api-config';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Get all messages for a study group
 * GET /api/group-messages/studygroup/:studyGroupId
 * @param {string} studyGroupId - Study group ID
 * @param {Object} options - { limit, offset }
 * @returns {Promise} Array of messages
 */
export async function getMessagesByStudyGroup(studyGroupId, options = {}) {
  const { limit = 50, offset = 0 } = options;
  const res = await axios.get(
    buildApiUrl(`group-messages/studygroup/${studyGroupId}?limit=${limit}&offset=${offset}`),
    { headers: authHeaders() }
  );
  return res.data;
}

/**
 * Send a message to a study group
 * POST /api/group-messages
 * @param {Object} payload - { studyGroupId, content }
 * @returns {Promise} Created message object
 */
export async function sendMessage(payload) {
  const res = await axios.post(buildApiUrl('group-messages'), payload, { headers: authHeaders() });
  return res.data;
}

/**
 * Update a message (only by sender)
 * PUT /api/group-messages/:id
 * @param {string} messageId - Message ID
 * @param {Object} payload - { content }
 * @returns {Promise} Updated message object
 */
export async function updateMessage(messageId, payload) {
  const res = await axios.put(buildApiUrl(`group-messages/${messageId}`), payload, { headers: authHeaders() });
  return res.data;
}

/**
 * Delete a message (only by sender)
 * DELETE /api/group-messages/:id
 * @param {string} messageId - Message ID
 * @returns {Promise} Deletion confirmation
 */
export async function deleteMessage(messageId) {
  const res = await axios.delete(buildApiUrl(`group-messages/${messageId}`), { headers: authHeaders() });
  return res.data;
}
