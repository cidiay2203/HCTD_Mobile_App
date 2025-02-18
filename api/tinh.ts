import apiClient from './apiClient';

export const getAllTinhs = async () => {
  return apiClient.get('/api/Tinhs/mobile-app/get-all');
};