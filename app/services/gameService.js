import { $http, serviceResponse } from "../utils";

class gameService {
    async create(data) {
        try {
            const response = await $http.post("/api/game/create", data);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async newCard(gameId) {
        try {
            const response = await $http.post(`/api/game/${gameId}/newCard`);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async newHashtag(gameId) {
        try {
            const response = await $http.post(`/api/game/${gameId}/newHashtag`);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async getAll() {
        try {
            const response = await $http.get("/api/game");

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async getGame(gameId) {
        try {
            const response = await $http.get(`/api/game/${gameId}`);

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
            const response = await $http.get("/api/game/me");

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async addLeftSwipedCard(gameId, data) {
        try {
            const response = await $http.put(`/api/game/${gameId}/addLeftSwipedCard`, data);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async addRightSwipedCard(gameId, data) {
        try {
            const response = await $http.put(
                `/api/game/${gameId}/addRightSwipedCard`,
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

    async addLeftSwipedHashtag(gameId, data) {
        try {
            const response = await $http.put(`/api/game/${gameId}/addLeftSwipedHashtag`, data);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async addRightSwipedHashtag(gameId, data) {
        try {
            const response = await $http.put(`/api/game/${gameId}/addRightSwipedHashtag`, data);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async updateRightSwipedCards(gameId, data) {
        try {
            const response = await $http.patch(
                `/api/game/${gameId}/updateRightSwipedCards`,
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
}

export default new gameService();
