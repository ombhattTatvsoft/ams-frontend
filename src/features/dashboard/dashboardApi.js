import { DASHBOARD_ENDPOINTS } from "../../constants/endPoint";
import { PRIVATE_ROUTES } from "../../constants/routes";
import baseApi from "./../../common/api/baseApi";

export const dashboardApi = {
  ChangePassword: (data) =>
    baseApi.post({
      endPoint: PRIVATE_ROUTES.DASHBOARD + DASHBOARD_ENDPOINTS.CHANGE_PASSWORD,
      data: data,
    }),
  
};
