const CORE_API_URL = "https://core-server-nine.vercel.app";

function call_api(payload, target, method) {
    const url = CORE_API_URL + "/api/" + target;

    switch (method) {
        case "GET":
            return fetch(url, { // Ensure you return the fetch promise
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            });
        case "POST":
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Make sure to stringify the payload
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            });
        default:
            return Promise.reject(new Error("Unsupported method")); // Handle unsupported methods
    }
}


module.exports = { call_api };