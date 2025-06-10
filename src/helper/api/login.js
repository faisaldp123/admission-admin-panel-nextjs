import axiosInstance from '@/utils/axios.js';

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
