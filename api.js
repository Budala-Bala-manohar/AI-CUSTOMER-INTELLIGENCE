import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const getCustomers = (params) => api.get('/customers', { params });
export const getCustomer = (id) => api.get(`/customer/${id}`);
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getAIInsights = () => api.get('/ai/insights');
export const runNaturalLanguageQuery = (q) => api.get('/nlq', { params: { q } });
export const getChurnPrediction = (payload) => api.post('/predict-churn', payload);
export const getRecommendations = (segment) => api.get('/recommend', { params: { segment } });
export const downloadPdfReport = () => api.get('/reports/pdf', { responseType: 'blob' });
export const getSegmentation = () => api.get('/segment');
