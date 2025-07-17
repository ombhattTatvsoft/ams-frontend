import Cookies from "js-cookie";

const userCookieKey = "JwtAmsToken";

// Get token from cookie
export const getAccessToken = () => {
  return Cookies.get(userCookieKey);
};

// Set token in cookie
export const storeAccessToken = (accessToken,rememberme) => {
  Cookies.set(userCookieKey, accessToken, {
    expires: rememberme ? 30 : 1,
    secure: true,
    sameSite: "strict",
  });
};

// Remove token from cookie
export const removeAccessToken = () => {
  Cookies.remove(userCookieKey);
};

export default {
  getAccessToken,
  storeAccessToken,
  removeAccessToken,
};
