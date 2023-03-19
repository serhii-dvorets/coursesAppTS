import { createInstance } from "./axiosInstance"

export const getCourses = async (token: string) => {
    try {
        const axiosInstance = createInstance(token)
        const response = await axiosInstance.get('/core/preview-courses');
        return response.data
    } catch (error) {
        console.log('GET COURSES ERROR', error);
    }
}