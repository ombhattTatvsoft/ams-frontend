const userDataKey = "user_data";

export const getUserData = () => {
  return JSON.parse(localStorage.getItem(userDataKey));
};

export const setUserData = (userData) => {
  localStorage.setItem(userDataKey, userData);
};

export const removeUserData = () => {
  localStorage.removeItem(userDataKey);
};

export default {
  getUserData,
  setUserData,
  removeUserData,
};
