import apiClient from './apiClient';

export const getLichToChucHienMauCoTheDangKy = async (thongTinCaNhanNguoiHienMauId: number) => {
  return apiClient.get('/api/LichToChucHienMaus/mobile-app/get-list-co-the-dang-ky?thongTinCaNhanNguoiHienMauId=' + thongTinCaNhanNguoiHienMauId);
};

export const dangKyThamGiaHienMauTheoLichToChucHienMau = async (thongTinCaNhanNguoiHienMauId: number, lichToChucHienMauId: number) => {
  return apiClient.post('/api/LichToChucHienMaus/mobile-app/dang-ky-tham-gia-hien-mau-theo-lich-to-chuc-hien-mau', { thongTinCaNhanNguoiHienMauId, lichToChucHienMauId });
};

export const huyDangKyThamGiaHienMauTheoLichToChucHienMau = async (thongTinCaNhanNguoiHienMauId: number, lichToChucHienMauId: number) => {
  return apiClient.post('/api/LichToChucHienMaus/mobile-app/huy-dang-ky-tham-gia-hien-mau-theo-lich-to-chuc-hien-mau', { thongTinCaNhanNguoiHienMauId, lichToChucHienMauId });
};

export const getListCauHoiDangKyHienMauByLichToChucHienMau_ThongTinCaNhanNguoiHienMauId = async (lichToChucHienMau_ThongTinCaNhanNguoiHienMauId: number) => {
  return apiClient.get('/api/LichToChucHienMaus/mobile-app/get-by-lichToChucHienMau_ThongTinCaNhanNguoiHienMauId?lichToChucHienMau_ThongTinCaNhanNguoiHienMauId=' + lichToChucHienMau_ThongTinCaNhanNguoiHienMauId);
};

export const nguoiHienMauTraLoiCauHoiDangKyHienMau = async (data: any) => {
  return apiClient.post('/api/LichToChucHienMaus/mobile-app/nguoi-hien-mau-tra-loi-cau-hoi-dang-ky-hien-mau', data);
};