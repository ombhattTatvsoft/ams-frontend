import baseApi from "../../common/API/BaseAPI";
import { USER_ENDPOINTS } from "../../constants/endPoint";
import { PRIVATE_ROUTES } from "../../constants/routes";

export const userApi = {
  GetUsers: () =>
    baseApi.get({
      endPoint: PRIVATE_ROUTES.USERS + USER_ENDPOINTS.GET_USERS,
    }),
};
