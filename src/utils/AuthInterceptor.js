let navigate = null;

// Setup function to be called once in your App component
export const setupAuthInterceptor = (navigateFunction) => {
  navigate = navigateFunction;
};

// Helper function to handle token expiration
export const handleTokenExpiration = (error) => {
  const isTokenExpired = 
    error.response?.status === 401 || 
    error.response?.status === 403 || 
    error.response?.data?.message?.toLowerCase().includes('token') ||
    error.response?.data?.message?.toLowerCase().includes('unauthorized') ||
    error.response?.data?.message?.toLowerCase().includes('expired') ||
    error.message?.toLowerCase().includes('unauthorized');

  if (isTokenExpired) {
    console.log('Token expired globally, clearing auth data');
    
    // Clear auth data
    localStorage.removeItem('token');
    
    // Clear any other auth-related localStorage items
    // localStorage.removeItem('user');
    // localStorage.removeItem('refreshToken');
    
    // Redirect to login if navigate is available
    if (navigate) {
      navigate('/login', { 
        state: { 
          returnUrl: window.location.pathname,
          message: 'Your session has expired. Please log in again.'
        } 
      });
    } else {
      // Fallback if navigate is not available
      window.location.href = '/login';
    }
    
    return true;
  }
  return false;
};

// Enhanced call_api function with global error handling
export const call_api_with_global_auth = async (payload, target, method) => {
  const CORE_API_URL = "https://core-server-nine.vercel.app";
  const url = CORE_API_URL + "/api/" + target;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions = {
    method: method,
    headers: headers,
  };

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.response = {
        status: response.status,
        statusText: response.statusText,
        data: data
      };
      
      // Automatically handle token expiration
      handleTokenExpiration(error);
      
      throw error;
    }
    
    return data;
  } catch (error) {
    // Handle network errors and other fetch errors
    if (!error.response) {
      // Network error or fetch failed
      console.error('Network error:', error);
    }
    
    // Always check for token expiration, even on network errors
    handleTokenExpiration(error);
    
    throw error;
  }
};