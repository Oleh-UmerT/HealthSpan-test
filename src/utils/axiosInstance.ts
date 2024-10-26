import axios from "axios";
import { refreshAccessToken } from "../api/authApi";

const axiosInstance = axios.create({
  baseURL: "/",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");
      if (refreshToken && userId) {
        try {
          const { accessToken } = await refreshAccessToken(userId, refreshToken);

          localStorage.setItem("token", accessToken);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
