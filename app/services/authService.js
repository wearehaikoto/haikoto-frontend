import { $http } from "../utils";

class authService {
    async loginOrSignup(codeName) {
        try {
            const response = await $http.post("/api/auth/loginOrSignup", { codeName });
            if (response.data.success) {
                localStorage.setItem("auth-token", response.data.data.token);
                return {
                    success: true,
                    message: response.data.message
                };
            } else {
                return {
                    success: false,
                    message: response.data.message
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response
                    ? error.response.data.message
                    : error.message
            };
        }
    }
}

export default new authService();
