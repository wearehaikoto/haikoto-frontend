import axios from "axios";

const baseURL = process.env.BACKEND_URL || "http://localhost:8080";

const $http = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    },
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
    }
});

export default $http;
