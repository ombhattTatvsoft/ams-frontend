import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAccessToken,
  removeAccessToken,
  storeAccessToken,
} from "../../utils/manageAccessToken";
import {
  getUserData,
  removeUserData,
  setUserData,
} from "../../utils/manageUserData";
import { toast } from 'react-toastify';
import { GENERAL } from "../../constants/general";
import authApi from "./authApi";
import { navigateTo } from "../../common/navigate";
import { PUBLIC_ROUTES } from "../../constants/routes";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.forgotPassword(credentials);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.resetPassword(credentials);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// auth slice with action and reducers

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: getAccessToken() && getUserData() ? true : false,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      removeUserData();
      removeAccessToken();
      toast.success(GENERAL.LOGOUT_SUCCESS);
      navigateTo(PUBLIC_ROUTES.LOGIN);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending,(state)=>{
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        storeAccessToken(action.payload.data.token, action.meta.arg.rememberme);
        setUserData(JSON.stringify(action.payload.data.user));
        toast.success(action.payload.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.errors ? Object.values(action.payload.errors).flat().join(", ") : action.payload.message);
      })
      .addCase(forgotPassword.pending,(state)=>{
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.errors ? Object.values(action.payload.errors).flat().join(", ") : action.payload.message);
      })
      .addCase(resetPassword.pending,(state)=>{
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
        navigateTo(PUBLIC_ROUTES.LOGIN);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.errors ? Object.values(action.payload.errors).flat().join(", ") : action.payload.message);
      })
      // .addMatcher(
      //   (action) =>
      //     [loginUser.pending, forgotPassword.pending,resetPassword.pending].includes(action.type),
      //   (state) => {
      //     state.loading = true;
      //   }
      // );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
