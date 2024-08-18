import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  settingsInfo: null,
  loading: false,
  error: "",
};

const getSettings = createAsyncThunk("settings/getSettings", () => {
  return axiosInstance
    .get(`/settings`)
    .then((res) => res.data);
});


export const settingsSlice = createSlice({
  name: "settings",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.settingsInfo = action.payload;
      state.error = "";
    });
    builder.addCase(getSettings.rejected, (state) => {
      state.loading = false;
      state.token = "";
      state.error = "";
    });
  },
});

export { getSettings };

export default settingsSlice.reducer;
