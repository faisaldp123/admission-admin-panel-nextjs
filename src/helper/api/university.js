// api/university.js

import axiosInstance from '@/utils/axios.js';

// Base URL is automatically set in axiosInstance, so no need to repeat here
// unless you want to override it for specific cases

export const addUniversity = async (credentials) => {
  try {
    const response = await axiosInstance.post(`/universities`, credentials);
    return response.data;
  } catch (error) {
    console.error("University Error:", error);
    throw new Error(
      error.response?.data?.message || "University creation failed. Please try again."
    );
  }
};

export const getUniversities = async (params = {}) => {
  try {
    const response = await axiosInstance.get(`/universities`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};

export const updateUniversityById = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/universities/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating university:", error);
    throw new Error("Failed to update university");
  }
};

export const deleteUniversityById = async (id) => {
  try {
    const res = await axiosInstance.delete(`/universities/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting university:", error);
    throw error;
  }
};
