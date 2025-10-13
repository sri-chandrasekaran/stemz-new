// api-config.js
// Centralized API base URL configuration for prod and dev.

// Manual switch: set to 'dev' or 'prod'
export const API_ENV = 'dev'; // change to 'prod' for production

const BASES = {
  prod: 'https://core-server-nine.vercel.app/api',
  dev: 'http://localhost:3000/api'
};

export const API_BASE_URL = BASES[API_ENV].replace(/\/+$/,'');

export const buildApiUrl = (path = '') => {
  const sanitizedPath = String(path || '').replace(/^\/+/, '');
  return `${API_BASE_URL}/${sanitizedPath}`;
};

export default API_BASE_URL;


