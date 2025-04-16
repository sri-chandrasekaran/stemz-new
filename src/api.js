const CORE_API_URL = "https://core-server-nine.vercel.app";

// FOR LOCAL BACKEND DEVELOPMENTS
// const CORE_API_URL = "http://localhost:3000";

function call_api(payload, target, method) {
  const url = CORE_API_URL + "/api/" + target;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  // Add token if exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  switch (method) {
    case "GET":
<<<<<<< HEAD
        return fetch(url, {
            method: 'GET',
            headers: headers,
        })
        .then(response => {
            if (!response.ok) { // Check if response status is not OK
                throw new Error(`Error: ${response.status} ${response.statusText}`); // Throw error with status
            }
            return response.json();
        });
        
    case "POST":
        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: payload ? JSON.stringify(payload) : undefined // Only add body if payload exists
        })
        .then(async response => {
            if (!response.ok) { // Check if response status is not OK
                throw new Error(`Error: ${url} ${response.status} ${response.statusText}`); // Throw error with status
            }
            const data = await response.json();
            console.log("API Response:", data); // Debug log
            return data;
        });
    case "PUT":
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: payload ? JSON.stringify(payload) : undefined // Only add body if payload exists
        })
        .then(async response => {
            if (!response.ok) { // Check if response status is not OK
                throw new Error(`Error: ${url} ${response.status} ${response.statusText}`); // Throw error with status
            }
            const data = await response.json();
            console.log("API Response:", data); // Debug log
            return data;
        });
=======
      return fetch(url, {
        method: "GET",
        headers: headers,
      }).then((response) => response.json());

    case "POST":
      return fetch(url, {
        method: "POST",
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined, // Only add body if payload exists
      }).then(async (response) => {
        const data = await response.json();
        console.log("API Response:", data); // Debug log
        return data;
      });
>>>>>>> aa06e14b24b4ce609915748cca94061560d27368
    default:
      return Promise.reject(new Error("Unsupported method")); // Handle unsupported methods
  }
}

module.exports = { call_api };
