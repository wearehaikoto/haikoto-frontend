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

    async addNoCard(gameId, data) {
        try {
            const response = await $http.put(`/api/game/${gameId}/addNoCard`, data);

            return serviceResponse(
                response.data.message,
                response.data.data,
                response.data.success
            );
        } catch (error) {
            return serviceResponse(error.response ? error.response.data.message : error.message);
        }
    }

    async addYesCard(gameId, data) {
        try {
            const response = await $http.put(
                `/api/game/${gameId}/addYesCard`,
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

    async updateYesCards(gameId, data) {
        try {
            const response = await $http.patch(
                `/api/game/${gameId}/updateYesCards`,
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
