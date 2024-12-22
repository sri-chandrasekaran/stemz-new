const CORE_API_URL = "https://core-server-nine.vercel.app";

function call_api(payload, target, method) {
    const url = CORE_API_URL + "/api/" + target;
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json'
    };

    // Add token if exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

  switch (method) {
    case "GET":
        return fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json());
        
    case "POST":
        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: payload ? JSON.stringify(payload) : undefined // Only add body if payload exists
        })
        .then(async response => {
            const data = await response.json();
            console.log("API Response:", data); // Debug log
            return data;
        });
    default:
      return Promise.reject(new Error("Unsupported method")); // Handle unsupported methods
  }
}

module.exports = { call_api };
