import { $http, serviceResponse } from "../utils";

class userService {
    async getAll() {
        try {
            const response = await $http.get("/api/user");

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(
                error.response ? error.response.data.message : error.message
            );
        }
    }

    async getUser(userId) {
        try {
            const response = await $http.get(`/api/user/${userId}`);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(
                error.response ? error.response.data.message : error.message
            );
        }
    }

    async updateRole(userId, data) {
        try {
            const response = await $http.patch(
                `/api/user/${userId}/updateRole`,
                data
            );

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(
                error.response ? error.response.data.message : error.message
            );
        }
    }

    async deleteUser(userId) {
        try {
            const response = await $http.delete(`/api/user/${userId}`);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(
                error.response ? error.response.data.message : error.message
            );
        }
    }
}

export default new userService();
