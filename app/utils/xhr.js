import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const config = {
    baseURL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    },
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
    }
};

// checks whether we are on client / browser or server.
if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth-token");

    // Check for token
    if (token) {
        // config.withCredentials = true;
        config.headers.Authorization = `Bearer ${token}`;
    }
}

// Create thw axios instance
const $http = axios.create(config);

export default $http;
