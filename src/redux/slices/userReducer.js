import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  token: localStorage.getItem("access_token") || "",
  loading: false,
  error: "",
};

const getToken = createAsyncThunk("user/getToken", () => {
  return axiosInstance
    .post(`/token/primary`, null, {
      headers: {
        token: localStorage.getItem("confirm_token"),
      },
    })
    .then((res) => res.data);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.loading = false;
      let token = action.payload.token;
      state.token = token;
      state.error = "";
    });
    builder.addCase(getToken.rejected, (state) => {
      state.loading = false;
      state.token = "";
      state.error = "";
    });
  },
});
export const { setToken } = userSlice.actions;
export { getToken };

export default userSlice.reducer;
