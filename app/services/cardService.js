import { $http, serviceResponse } from "../utils";

class cardService {
    async create(data) {
        try {
            const response = await $http.post("/api/card/create", data);

            if (response.data.success) {
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

    async getAll() {
        try {
            const response = await $http.get("/api/card");

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async getAllHashtags() {
        try {
            const response = await $http.get("/api/card/hashtags");

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async getCard(cardId) {
        try {
            const response = await $http.get(`/api/card/${cardId}`);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async getAllByMe() {
        try {
            const response = await $http.get("/api/card/me");

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async updateEloRating(data) {
        try {
            const response = await $http.put(
                "/api/card/elo_rating_update",
                data
            );

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async deleteCard(cardId) {
        try {
            const response = await $http.delete(`/api/card/${cardId}`);

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

export default new cardService();
