import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  token: localStorage.getItem("accessToken") || "",
  loading: false,
  error: "",
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {
        role: "",
      },
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

const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/token/login`, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const handleTgLogin = createAsyncThunk(
  "user/handleTgLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/telegram`, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const handleRegister = createAsyncThunk("user/handleRegister", async (data) => {
  try {
    const response = await axiosInstance.post(`/users/`, data, {
      headers: { Authorization: null },
    });
    return response;
  } catch (error) {
    return error;
  }
});

const getMe = createAsyncThunk("user/getMe", () => {
  return axiosInstance.get(`/users/me`).then((res) => res.data);
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
    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
      state.error = "";
    });
    builder.addCase(getMe.rejected, (state) => {
      state.loading = false;
      state.token = "";
      state.error = "";
    });
  },
});

export const { setToken } = userSlice.actions;
export { getToken, getMe, handleLogin, handleRegister, handleTgLogin };

export default userSlice.reducer;
