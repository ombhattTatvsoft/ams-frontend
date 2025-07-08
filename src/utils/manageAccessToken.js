import Cookies from "js-cookie";

// Get token from cookie
export const getAccessToken = () => {
  return Cookies.get("access_token");
};

// Set token in cookie
export const storeAccessToken = (accessToken,rememberme) => {
  Cookies.set("access_token", accessToken, {
    expires: rememberme ? 30 : 1,
    secure: true,
    sameSite: "strict",
  });
};

// Remove token from cookie
export const removeAccessToken = () => {
  Cookies.remove("access_token");
};

export default {
  getAccessToken,
  storeAccessToken,
  removeAccessToken,
};
