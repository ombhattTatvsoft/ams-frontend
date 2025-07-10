let navigate; 

export const setNavigator = (navFn)=>navigate=navFn;

export const navigateTo = (path) => {
  navigate(path);
}