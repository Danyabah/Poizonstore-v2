import axios from "axios";
import { DevUrl } from "./utils/env";

const axiosInstance = axios.create({
  baseURL: DevUrl,
});

let accessToken = localStorage.getItem("accessToken") || "";

function setAccessToken(newToken) {
  if (newToken) {
    localStorage.setItem("accessToken", newToken);
    accessToken = newToken;
  }
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization && accessToken) {
    config.headers.Authorization = `Token ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      // const response = await axios("/api/tokens/refresh");
      // accessToken = response.data.accessToken;
      // prevRequest.sent = true;
      // prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      // return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);

export { setAccessToken };

export default axiosInstance;
