import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAccessToken, removeAccessToken, storeAccessToken } from '../../utils/manageAccessToken';
import { getUserData, removeUserData, setUserData } from '../../utils/manageUserData';
 
// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5131/api/auth/login', credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
 
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserData() || null,
    token: getAccessToken() || null,
    isAuthenticated: getAccessToken() && getUserData() ? true : false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeUserData();
      removeAccessToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        storeAccessToken(action.payload.token);
        setUserData(JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
      });
  },
});
 
export const { logout } = authSlice.actions;
export default authSlice.reducer;
 