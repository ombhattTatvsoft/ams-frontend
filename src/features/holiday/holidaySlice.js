import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { holidayApi } from "./holidayApi";
import { toast } from "react-toastify";

// Async thunk for holiday list
export const getHolidays = createAsyncThunk(
  "holiday/getHolidays",
  async (_, { rejectWithValue }) => {
    try {
      return await holidayApi.GetHolidays();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk for add or update holiday
export const saveHoliday = createAsyncThunk(
  "holiday/saveHoliday",
  async (data, { rejectWithValue }) => {
    try {
      return await holidayApi.SaveHoliday(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to delete holiday
export const deleteHoliday = createAsyncThunk(
  "holiday/deleteHoliday",
  async (id, { rejectWithValue }) => {
    try {
      return await holidayApi.DeleteHoliday(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const holidaySlice = createSlice({
    name: "holiday",
    initialState: {
      loading: false,
      holidays:[],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getHolidays.fulfilled, (state, action) => {
          state.loading = false;
          state.holidays = action.payload.data
        })
        .addMatcher(isAnyOf(saveHoliday.fulfilled,deleteHoliday.fulfilled), (state,action) => {
          state.loading = false;
          toast.success(action.payload.message);
        })
        .addMatcher(isAnyOf(getHolidays.pending,saveHoliday.pending,deleteHoliday.pending), (state) => {
          state.loading = true;
        })
        .addMatcher(isAnyOf(getHolidays.rejected,saveHoliday.rejected,deleteHoliday.rejected), (state, action) => {
          state.loading = false;
          toast.error(action.payload.message);
        });
    },
  });
  
  export default holidaySlice.reducer;