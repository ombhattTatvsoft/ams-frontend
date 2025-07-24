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

// Async thunk for add or update department
export const saveDepartment = createAsyncThunk(
  "department/saveDepartment",
  async (data,{ rejectWithValue }) => {
    try {
      return await departmentApi.SaveDepartment(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to delete department
export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (id,{ rejectWithValue }) => {
    try {
      return await departmentApi.DeleteDepartment(id);
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
      .addMatcher(isAnyOf(saveDepartment.fulfilled,deleteDepartment.fulfilled), (state,action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addMatcher(isAnyOf(getDepartments.pending,saveDepartment.pending,deleteDepartment.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getDepartments.rejected,saveDepartment.rejected,deleteDepartment.rejected), (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

export default departmentSlice.reducer;
