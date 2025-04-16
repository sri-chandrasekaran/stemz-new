import { jwtDecode } from 'jwt-decode';
import { call_api } from './api';

export const getUserEmail = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded = jwtDecode(token);
  const userId = decoded.id;

  try {
    const response = await call_api(null, `users/id/${userId}`, "GET");
    return response.email; // Assuming the response contains the user's email
  } catch (error) {
    console.error('Error fetching user email:', error);
    return null;
  }
};