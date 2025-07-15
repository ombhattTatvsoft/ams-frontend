import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { departmentApi } from "./departmentApi";
import { toast } from "react-toastify";

// Async thunk for department list
export const getDepartments = createAsyncThunk(
  "department/getDepartments",
  async (_,{ rejectWithValue }) => {
    try {
      return await departmentApi.GetDepartments();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    loading: false,
    departments:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.data
      })
      .addMatcher(isAnyOf(getDepartments.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getDepartments.rejected), (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

export default departmentSlice.reducer;
