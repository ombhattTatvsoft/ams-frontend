import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { toast } from "react-toastify";

// Async thunk for user list
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.GetUsers();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to get user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      return await userApi.GetUser(userId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk for roles list
export const getRoles = createAsyncThunk(
  "user/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.GetRoles();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to save user
export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await userApi.SaveUser(userData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId,{rejectWithValue}) => {
    try {
      return await userApi.DeleteUser(userId);
    } catch (err) {
        return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    users: [],
    roles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.data;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addMatcher(isAnyOf(saveUser.fulfilled,deleteUser.fulfilled), (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addMatcher(isAnyOf(getUsers.pending, getRoles.pending, saveUser.pending, deleteUser.pending, getUser.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(
        isAnyOf(getUsers.rejected, getRoles.rejected, saveUser.rejected, deleteUser.rejected, getUser.rejected),
        (state, action) => {
          state.loading = false;
          toast.error(action.payload.message);
        }
      );
  },
});

export default userSlice.reducer;
