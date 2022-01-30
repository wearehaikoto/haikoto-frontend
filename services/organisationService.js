import { $http, serviceResponse } from "../utils";

class organisationService {
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
}
export default new organisationService();
