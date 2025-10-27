import axios from 'axios';
import { buildApiUrl } from '../config/api-config';

// Legacy dashboard courses API (registered/recommended)
export async function getCoursesForUser(payload) {
  const res = await axios.post(buildApiUrl('get_courses'), payload, { withCredentials: true });
  return res.data;
}


