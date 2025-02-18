import apiClient from './apiClient';

export const getAllDonVis = async () => {
  return apiClient.get('/api/DonVis/mobile-app/get-all');
};