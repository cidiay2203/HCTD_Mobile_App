import apiClient from './apiClient';

export const getListCauHois = async () => {
  return apiClient.get('/api/HoiDaps/mobile-app/get-list');
};

export const getCauTraLoiByCauHoiId = async (cauHoiId: number) => {
  return apiClient.get('/api/HoiDaps/mobile-app/get-cau-tra-loi-by-cau-hoi-id?cauHoiId=' + cauHoiId);
};