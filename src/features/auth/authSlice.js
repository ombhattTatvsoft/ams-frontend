import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5131/api/auth/login",
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5131/api/auth/forgot-password",
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for forgot password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5131/api/auth/reset-password",
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: getAccessToken() && getUserData() ? true : false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      removeUserData();
      removeAccessToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        storeAccessToken(action.payload.token, action.meta.arg.rememberme);
        setUserData(JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login Failed';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.message);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Forgot Password Failed';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.message);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Reset Password Failed';
      })
      .addMatcher(
        (action) =>
          [loginUser.pending, forgotPassword.pending,resetPassword.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
