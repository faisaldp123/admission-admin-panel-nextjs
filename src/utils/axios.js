import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${Cookies.get("access_token") || ''}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Token refresh logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Optional: only enable this if refresh token logic is implemented
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // const access_token = await refreshAccessToken(); 
      // Cookies.set("access_token", access_token);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      // return axiosInstance(originalRequest);

      // If no refresh logic yet, redirect or logout here
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
