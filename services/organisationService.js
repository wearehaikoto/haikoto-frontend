import { $http, serviceResponse } from "../utils";

class organisationService {
    async create(data) {
        try {
            const response = await $http.post("/api/organisation/create", data);

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
            const response = await $http.get("/api/organisation");

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

    async getByUrlSlug(url_slug) {
        try {
            const response = await $http.get(
                `/api/organisation/${url_slug}/get`
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

    async deleteOrganisation(organisationId) {
        try {
            const response = await $http.delete(
                `/api/organisation/${organisationId}`
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
export default new organisationService();
