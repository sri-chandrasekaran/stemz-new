import { buildApiUrl } from './config/api-config';

// Handle token expiration and redirect to login
const handleTokenExpiration = (response, data) => {
  const isTokenExpired = 
    response.status === 401 || 
    response.status === 403 || 
    data?.message?.toLowerCase().includes('token') ||
    data?.message?.toLowerCase().includes('unauthorized') ||
    data?.message?.toLowerCase().includes('expired') ||
    data?.error?.toLowerCase().includes('token') ||
    data?.error?.toLowerCase().includes('unauthorized');

  if (isTokenExpired) {
    // Clear expired token
    localStorage.removeItem('token');
    
    // Redirect to login with return URL
    const currentPath = window.location.pathname;
    const returnUrl = encodeURIComponent(currentPath);
    const message = encodeURIComponent('Your session has expired. Please log in again.');
    
    window.location.href = `/login?returnUrl=${returnUrl}&message=${message}`;
    return true;
  }
  
  return false;
};

export function call_api(payload, target, method) {
  const url = buildApiUrl(target);
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const handleResponse = async (response) => {
    let data;
    
    try {
      data = await response.json();
    } catch (error) {
      data = { 
        message: response.statusText || 'Unknown error',
        status: response.status 
      };
    }
    
    // Check for token expiration first
    if (handleTokenExpiration(response, data)) {
      const error = new Error('Token expired - redirecting to login');
      error.response = {
        status: response.status,
        statusText: response.statusText,
        data: data
      };
      throw error;
    }
    
    // Handle other HTTP errors
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.response = {
        status: response.status,
        statusText: response.statusText,
        data: data
      };
      throw error;
    }
    
    return data;
  };

  const fetchOptions = {
    method: method,
    headers: headers,
  };

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  return fetch(url, fetchOptions).then(handleResponse);
}