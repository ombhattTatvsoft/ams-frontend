import axios from "axios";
import { GENERAL } from "../../constants/general";

const baseUrl = "http://localhost:5131/api";

const baseApi = async ({ method, endPoint, data, headers = {} }) => {
  try {
    const response = await axios({
      method,
      url: baseUrl+endPoint,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: GENERAL.UNEXPECTED_ERROR };
  }
};

export default baseApi;
