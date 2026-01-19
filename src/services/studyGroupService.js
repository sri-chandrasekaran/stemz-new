import axios from 'axios';
import { buildApiUrl } from '../config/api-config';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Create a new study group within a physical classroom
 * POST /api/studygroups/
 * @param {Object} payload - { classroomId, name (optional), memberUserIds }
 * @returns {Promise} Study group object
 */
export async function createStudyGroup(payload) {
  const res = await axios.post(buildApiUrl('studygroups/'), payload, { headers: authHeaders() });
  return res.data;
}

/**
 * Get a specific study group by ID with populated member details
 * GET /api/studygroups/:id
 * @param {string} studyGroupId - Study group ID
 * @returns {Promise} Study group object with populated members
 */
export async function getStudyGroupById(studyGroupId) {
  const res = await axios.get(buildApiUrl(`studygroups/${studyGroupId}`), { headers: authHeaders() });
  return res.data;
}

/**
 * Get all non-archived study groups for a specific classroom
 * GET /api/studygroups/classroom/:classroomId
 * @param {string} classroomId - Physical classroom ID
 * @returns {Promise} Array of study groups
 */
export async function getStudyGroupsByClassroom(classroomId) {
  const res = await axios.get(buildApiUrl(`studygroups/classroom/${classroomId}`), { headers: authHeaders() });
  return res.data;
}

/**
 * Get all non-archived study groups that the authenticated user is a member of
 * GET /api/studygroups/
 * @returns {Promise} Array of study groups
 */
export async function getUserStudyGroups() {
  const res = await axios.get(buildApiUrl('studygroups/'), { headers: authHeaders() });
  return res.data;
}

/**
 * Replace the entire member list of a study group
 * PUT /api/studygroups/:id/members
 * @param {string} studyGroupId - Study group ID
 * @param {Object} payload - { memberUserIds: [string] }
 * @returns {Promise} Updated study group object
 */
export async function updateStudyGroupMembers(studyGroupId, payload) {
  const res = await axios.put(buildApiUrl(`studygroups/${studyGroupId}/members`), payload, { headers: authHeaders() });
  return res.data;
}

/**
 * Add new members to an existing study group (does not remove existing members)
 * POST /api/studygroups/:id/members
 * @param {string} studyGroupId - Study group ID
 * @param {Object} payload - { userIds: [string] }
 * @returns {Promise} Updated study group object
 */
export async function addStudyGroupMembers(studyGroupId, payload) {
  const res = await axios.post(buildApiUrl(`studygroups/${studyGroupId}/members`), payload, { headers: authHeaders() });
  return res.data;
}

/**
 * Remove specified members from a study group
 * DELETE /api/studygroups/:id/members
 * @param {string} studyGroupId - Study group ID
 * @param {Object} payload - { userIds: [string] }
 * @returns {Promise} Updated study group object
 */
export async function removeStudyGroupMembers(studyGroupId, payload) {
  const res = await axios.delete(buildApiUrl(`studygroups/${studyGroupId}/members`), { 
    headers: authHeaders(),
    data: payload 
  });
  return res.data;
}

/**
 * Archive a study group (soft delete)
 * POST /api/studygroups/:id/archive
 * @param {string} studyGroupId - Study group ID
 * @returns {Promise} Archived study group object
 */
export async function archiveStudyGroup(studyGroupId) {
  const res = await axios.post(buildApiUrl(`studygroups/${studyGroupId}/archive`), {}, { headers: authHeaders() });
  return res.data;
}
