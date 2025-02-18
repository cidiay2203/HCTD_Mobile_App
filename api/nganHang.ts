import apiClient from './apiClient';

export const getAllNganHangs = async () => {
  return apiClient.get('/api/NganHangs/mobile-app/get-all');
};