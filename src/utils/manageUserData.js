export const getUserData = () => {
    return JSON.parse(localStorage.getItem('user_data'));
  };
  
  export const setUserData = (userData) => {
    localStorage.setItem('user_data', userData);
  };
  
  export const removeUserData = () => {
    localStorage.removeItem('user_data');
  };
  
  export default {
    getUserData,
    setUserData,
    removeUserData
  };
  