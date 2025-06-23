import axiosInstance from "@/utils/axios";

//fetched all register users (for admin dashboard)

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/auth/all-users');
        return response.data
    } catch (error) {
        console.error('Error fetching users :', error);
        throw new Error('Failed to fetch users')
    }
};