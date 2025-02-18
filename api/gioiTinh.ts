import apiClient from './apiClient';

export const getAllGioiTinhs = async () => {
  return apiClient.get('/api/GioiTinhs/mobile-app/get-all');
};