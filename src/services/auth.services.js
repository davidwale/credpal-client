import axios from 'axios';
import { API_PATH } from '../hooks/config';


export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${API_PATH}/auth/login`, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'An error occurred. Please try again.';
    }
};

export const RegisterUser = async (formData) => {
    try {
        const response = await axios.post(`${API_PATH}/auth/register`, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'An error occurred. Please try again.';
    }
};

export const Logout = async () => {
    try {
        window.localStorage.clear();
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export const googleAuthRequest = async () => {
    try {
        const response = await axios.get(`${API_PATH}/auth/google/url`);
        return response.data;
    } catch (error) {
        console.error('Error with Google Authentication:', error);
        throw error;
    }
};

export const forgotPasswordService = async (email) => {
    try {
        const response = await axios.post(`${API_PATH}/auth/forget-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Something went wrong. Please try again.';
    }
};

export const ResetPasswordService = async (email, otp, newPassword) => {
    try {
        const response = await axios.post(`${API_PATH}/auth/reset-password`,
            {
                email,
                newPassword,
                otp
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Something went wrong. Please try again.';
    }
};


export const emailVerification = async (otp) => {
    try {
        const response = await axios.get(`${API_PATH}/auth/verify-email`,
            {
                passwordConfirmation,
                password,
                otp
            });
        console.log(response);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Something went wrong. Please try again.';
    }
};
