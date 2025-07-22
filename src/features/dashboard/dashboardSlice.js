import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { dashboardApi } from "./dashboardApi";
import { toast } from "react-toastify";

// Async thunk to change password
export const changePassword = createAsyncThunk(
  "dashboard/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      return await dashboardApi.ChangePassword(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    userProfile: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      .addMatcher(isAnyOf(changePassword.pending), (state) => {
        state.loading = true;
      });
  },
});

export default dashboardSlice.reducer;
