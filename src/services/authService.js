import axios from 'axios';
import { buildApiUrl } from '../config/api-config';
import { jwtDecode } from 'jwt-decode';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return { success: false };

  try {
    await axios.post(buildApiUrl('auth/verify'), {}, { headers: authHeaders() });
    // If verify succeeded, try to decode minimal user info from token
    let decodedUser = null;
    try {
      decodedUser = jwtDecode(token);
    } catch (_) {
      // ignore decode errors; still treat as authenticated
    }
    return {
      success: true,
      dashboardData: decodedUser ? { user: decodedUser } : undefined,
    };
  } catch (e) {
    return { success: false };
  }
}

export async function login(payload) {
  const res = await axios.post(buildApiUrl('auth/login'), payload, { headers: { 'Content-Type': 'application/json' } });
  return res.data;
}

export async function logout() {
  // If backend supports explicit logout; otherwise, caller should clear token locally
  const res = await axios.post(buildApiUrl('auth/logout'), {}, { headers: authHeaders() }).catch(() => ({ data: { success: true } }));
  return res.data;
}

export async function signup(payload) {
  const res = await axios.post(buildApiUrl('auth/signup'), payload, { headers: { 'Content-Type': 'application/json' } });
  return res.data;
}


