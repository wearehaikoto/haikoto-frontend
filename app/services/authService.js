import { $http, serviceResponse } from "../utils";

class authService {
    async loginOrSignup(codeName) {
        try {
            const response = await $http.post("/api/auth/loginOrSignup", {
                codeName
            });

            if (response.data.success) {
                localStorage.setItem("auth-token", response.data.data.token);
            }

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }
}

export default new authService();
