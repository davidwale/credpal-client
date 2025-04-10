import axios from 'axios';
import { API_PATH } from '../hooks/config';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
};

export const getTransactions = async (page, limit, status, sortBy, sortOrder) => {
    try {
        const params = {
            page,
            limit
        };
        
        if (status) params.status = status;
        if (sortBy) params.sortBy = sortBy;
        if (sortOrder) params.sortOrder = sortOrder;

        const response = await axios.get(
            `${API_PATH}/transactions`,
            { 
                headers: getAuthHeaders(),
                params 
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error.response?.data?.error || 'Failed to fetch transactions';
    }
};

export const getTransactionById = async (id) => {
    try {
        const response = await axios.get(
            `${API_PATH}/transactions/${id}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        throw error.response?.data?.error || 'Failed to fetch transaction';
    }
};

export const getWallet = async () => {
    try {
        const response = await axios.get(
            `${API_PATH}/wallet/balance`,
            { headers: getAuthHeaders() }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching wallet:', error);
        throw error.response?.data?.error || 'Failed to fetch wallet';
    }
};

export const GetUserService = async () => {
    try {
        const response = await axios.get(
            `${API_PATH}/auth/user`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error.response?.data?.error || 'Failed to fetch users';
    }
};

export const AddFundService = async (formData) => {
    try {
        const response = await axios.post(`${API_PATH}/wallet/fund`, formData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
    catch (error) {
        console.error('Error adding fund:', error);
        throw error.response?.data?.error || 'Failed to add fund';
    }
};

export const TransferService = async (formData) => {
    try {
        const response = await axios.post(`${API_PATH}/wallet/transfer`, formData,
            { headers: getAuthHeaders() }
        );
    
        return response.data;
    }
    catch (error) {
        console.error('Error transfering fund:', error);
        throw error.response?.data?.error || 'Failed to transfer fund';
    }
};

export const WithdrawService = async (formData) => {
    try {
        const response = await axios.post(`${API_PATH}/wallet/withdraw`, formData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
    catch (error) {
        console.error('Error withdrawing fund:', error);
        throw error.response?.data?.error || 'Failed to withdraw fund';
    }
};