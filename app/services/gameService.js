import { $http } from "../utils";

class gameService {
    async create(data) {
        try {
            const response = await $http.post("/api/game/create", data);

            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data.data
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
            const response = await $http.get("/api/game");

            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data.data
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

    async getGame(gameId) {
        try {
            const response = await $http.get(`/api/game/${gameId}`);

            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data.data
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

    async getAllByMe() {
        try {
            const response = await $http.get("/api/game/me");

            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data.data
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

    async addAnswer(gameId, data) {
        try {
            const response = await $http.post(`/api/game/${gameId}/addAnswer`, data);

            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data.data
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

export default new gameService();
