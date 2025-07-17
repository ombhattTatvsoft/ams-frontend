import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import departmentReducer from '../features/department/departmentSlice'
import userReducer from "../features/users/userSlice";

export const store = configureStore({
    reducer : {
        auth : authReducer,
        department : departmentReducer,
        user: userReducer,
    },
});
