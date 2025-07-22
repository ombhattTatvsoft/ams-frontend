import baseApi from "../../common/api/baseApi";
import { USER_ENDPOINTS } from "../../constants/endPoint";
import { PRIVATE_ROUTES } from "../../constants/routes";

export const userApi = {
  GetUsers: () =>
    baseApi.get({
      endPoint: PRIVATE_ROUTES.USERS + USER_ENDPOINTS.GET_USERS,
    }),

  GetUser: (userId) =>
    baseApi.get({
      endPoint: PRIVATE_ROUTES.USERS + USER_ENDPOINTS.GET_USER + userId,
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
