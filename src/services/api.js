import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rest.coincap.io/v3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: import.meta.env.VITE_COINCAP_API_KEY,
  },
});
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('CoinCap API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
