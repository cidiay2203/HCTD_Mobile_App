import apiClient from './apiClient';

export const getAllNgheNghieps = async () => {
  return apiClient.get('/api/NgheNghieps/mobile-app/get-all');
};