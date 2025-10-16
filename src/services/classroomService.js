import axios from 'axios';
import { buildApiUrl } from '../config/api-config';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// Per docs
// GET /api/classrooms
export async function getAllClassrooms() {
  const res = await axios.get(buildApiUrl('classrooms'), { headers: authHeaders() });
  return res.data;
}

// GET /api/classrooms/user/getUserClassrooms (documented)
export async function getUserClassrooms() {
  const res = await axios.get(buildApiUrl('classrooms/user/getUserClassrooms'), { headers: authHeaders() });
  return res.data;
}

// POST /api/classrooms/:id/enroll
export async function enrollInClassroom(classroomId, payload = {}) {
  const res = await axios.post(buildApiUrl(`classrooms/${classroomId}/enroll`), payload, { headers: authHeaders() });
  return res.data;
}

// Helper for classrooms/:id/users if needed elsewhere
export async function getClassroomUsers(classroomId) {
  const res = await axios.get(buildApiUrl(`classrooms/${classroomId}/users`), { headers: authHeaders() });
  return res.data;
}

// Legacy helper preserved for older routes using email check
export async function checkUserInClassrooms(payload) {
  // No direct equivalent in new docs; emulate via getUserClassrooms and compare
  const result = await getUserClassrooms();
  const enrolled = Array.isArray(result?.enrolled) ? result.enrolled.map(c => c._id) : [];
  return enrolled;
}


