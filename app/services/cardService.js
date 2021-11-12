import { $http } from "../utils";

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

    async getCard(cardId) {
        try {
            const response = await $http.get(`/api/card/${cardId}`);

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
            const response = await $http.get("/api/card/me");

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

    async deleteCard(cardId) {
        try {
            const response = await $http.delete(`/api/card/${cardId}`);

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

export default new cardService();
