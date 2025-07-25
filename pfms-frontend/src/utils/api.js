import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const fetchPigs = async () => {
    const response = await axios.get(`${API_BASE_URL}/pigs`);
    return response.data;
};

export const fetchFarms = async () => {
    const response = await axios.get(`${API_BASE_URL}/farms`);
    return response.data;
};

export const fetchFeedingLogs = async () => {
    const response = await axios.get(`${API_BASE_URL}/feeding`);
    return response.data;
};
