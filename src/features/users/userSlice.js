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

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addMatcher(isAnyOf(getUsers.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getUsers.rejected), (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

export default userSlice.reducer;
