import axios, { HttpStatusCode } from "axios";
import { GENERAL } from "../../constants/general";
import {
  getAccessToken,
  removeAccessToken,
} from "../../utils/manageAccessToken";
import { PUBLIC_ROUTES } from "../../constants/routes";
import { removeUserData } from "../../utils/manageUserData";
import { navigateTo } from "../utils/navigate";

const baseUrl = "http://localhost:5131/api";

// Create Axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message;
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      removeAccessToken();
      removeUserData();
      navigateTo(PUBLIC_ROUTES.LOGIN);
      message = GENERAL.SESSION_EXPIRED;
    }
    else if(error.response?.status === HttpStatusCode.Forbidden){
      message = GENERAL.FORBID;
    }
    else{
      message = GENERAL.UNEXPECTED_ERROR;
    }
    return Promise.reject(
      error.response?.data.errors ? {message : Object.values(error.response.data.errors).flat().join(', ')} : (error.response?.data || {message})
    );
  }
);

const baseApi = {
  get : async({endPoint,params}) => await api.get(endPoint,params),
  post : async({endPoint,data}) => await api.post(endPoint,data),
  put : async({endPoint,data}) => await api.put(endPoint,data),
  delete : async({endPoint,params}) => await api.delete(endPoint,params),
}

export default baseApi;
