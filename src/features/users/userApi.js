import baseApi from "../../common/API/BaseAPI";
import { USER_ENDPOINTS } from "../../constants/endPoint";
import { PRIVATE_ROUTES } from "../../constants/routes";

export const userApi = {
  GetUsers: () =>
    baseApi.get({
      endPoint: PRIVATE_ROUTES.USERS + USER_ENDPOINTS.GET_USERS,
    }),

  GetRoles: () =>
    baseApi.get({
      endPoint: PRIVATE_ROUTES.USERS + USER_ENDPOINTS.GET_ROLES,
    }),

  SaveUser: (userData) => 
    baseApi.post({
      endPoint: PRIVATE_ROUTES.USERS + USER_ENDPOINTS.SAVE_USER,
      data: userData,
    }),
  
  DeleteUser: (userId) => 
    baseApi.delete({
      endPoint: PRIVATE_ROUTES.USERS + USER_ENDPOINTS.DELETE_USER + userId,
    })
};
