import API_MEHTODS from "../../constants/apiMethods";
import { PUBLIC_ROUTES } from "../../constants/routes";
import baseApi from "../../common/API/BaseAPI";

const authApi = {
  login: (credentials) =>
    baseApi({
      method: API_MEHTODS.POST,
      endPoint: PUBLIC_ROUTES.LOGIN,
      data: credentials
    }),

  forgotPassword: (credentials) =>
    baseApi({
      method: API_MEHTODS.POST,
      endPoint: PUBLIC_ROUTES.FORGOT_PASSWORD,
      data: credentials
    }),

  getResetPassword: (credentials) =>
    baseApi({
      method: API_MEHTODS.GET,
      endPoint: PUBLIC_ROUTES.RESET_PASSWORD.replace(":resetcode",'')+credentials,
    }),

  resetPassword: (credentials) =>
    baseApi({
      method: API_MEHTODS.POST,
      endPoint: PUBLIC_ROUTES.RESET_PASSWORD.replace(":resetcode",''),
      data: credentials
    }),
};

export default authApi;