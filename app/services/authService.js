import { $http } from "../utils";

class authService {
    async login(codeName) {
        try {
            const response = await $http.post("/api/auth/login", { codeName });
            if (response.data.success) {
                localStorage.setItem("auth-token", response.data.token);
                return true;
            } else {
                return response.data.message;
            }
        } catch (error) {
            return error.response ? error.response.data.message : error.message;
        }
    }

    async signup(codeName) {
        try {
            const response = await $http.post("/api/auth/signup", { codeName });
            if (response.data.success) {
                localStorage.setItem("auth-token", response.data.token);
                return true;
            } else {
                return response.data.message;
            }
        } catch (error) {
            return error.response ? error.response.data.message : error.message;
        }
    }
}

export default new authService();
