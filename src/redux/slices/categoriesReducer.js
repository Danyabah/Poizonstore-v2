import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  categories: [],
  loading: false,
  error: "",
};

const getCategories = createAsyncThunk("categories/getCategories", () => {
  return axiosInstance.get(`/category/`).then((res) => res.data);
});

export const settingsSlice = createSlice({
  name: "categories",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = "";
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.loading = false;
      state.token = "";
      state.error = "";
    });
  },
});

export { getCategories };

export default settingsSlice.reducer;
