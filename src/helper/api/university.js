import axiosInstance from '@/utils/axios.js';
const baseURL = process.env.NEXT_PUBLIC_API_URL; // Always use env var

export const addUniversity = async (credentials) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/universities`, credentials);
    return response.data; // This contains the token, user info, etc.
  } catch (error) {
    // Optional: log the actual error for debugging
    console.error("University Error:", error);

    // Throw a clean error message for UI
    throw new Error(
      error.response?.data?.message || "University failed. Please try again."
    );
  }
};

export const getUniversities = async (params = {}) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/universities`, {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching universities:", error);
      throw error;
    }
  };

  export const updateUniversityById = async (id, formData) => {
    const response = await fetch(`${baseURL}/universities/${id}`, {
      method: 'PUT',
      body: formData, // send as-is
      // ❌ DO NOT SET HEADERS HERE — browser sets correct 'Content-Type' for FormData
    });
  
    if (!response.ok) {
      throw new Error("Failed to update university");
    }
  
    return await response.json();
  };

  export const deleteUniversityById = async (id) => {
    const res = await axiosInstance.delete(`${baseURL}/universities/${id}`);
    return res.data;
  };
  
  