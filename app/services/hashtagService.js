import { $http, serviceResponse } from "../utils";

class hashtagService {
    async create(data) {
        try {
            const response = await $http.post("/api/hashtag/create", data);

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

    async getAll() {
        try {
            const response = await $http.get("/api/hashtag");

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

    async getHashtag(hashtagId) {
        try {
            const response = await $http.get(`/api/hashtag/${hashtagId}`);

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

    async getAllParentHashtags() {
        try {
            const response = await $http.get(
                `/api/hashtag/getAllParentHashtags`
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

    async getAllChildrenHashtags() {
        try {
            const response = await $http.get(
                `/api/hashtag/getAllChildrenHashtags`
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

    async getAllChildrenHashtagsByParent(hashtagId) {
        try {
            const response = await $http.get(
                `/api/hashtag/getAllChildrenHashtagsByParent/${hashtagId}`
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
}

export default new hashtagService();
