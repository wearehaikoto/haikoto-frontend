import { $http, serviceResponse } from "../utils";

class organisationService {
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
            const response = await $http.get(`/api/organisation/${url_slug}/get`);

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
            const response = await $http.delete(`/api/organisation/${organisationId}`);

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
