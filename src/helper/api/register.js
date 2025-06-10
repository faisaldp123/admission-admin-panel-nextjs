import axiosInstance from '@/utils/axios.js';

export const registerUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", credentials);
    return response.data; // This contains the token, user info, etc.
  } catch (error) {
    // Optional: log the actual error for debugging
    console.error("Registration Error:", error);

    // Throw a clean error message for UI
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};
