import apiClient from './apiClient';

export const resendOTPRegister = async (thongTinCaNhanNguoiHienMauId: number) => {
  let data = {
    "thongTinCaNhanNguoiHienMauId": thongTinCaNhanNguoiHienMauId
  };

  return apiClient.post('/api/ThongTinCaNhanNguoiHienMaus/mobile-app/resend-otp-dang-ky', data);
};

export const verifyOTPRegister = async (thongTinCaNhanNguoiHienMauId: number, otp: string) => {
  let data = {
    "thongTinCaNhanNguoiHienMauId": thongTinCaNhanNguoiHienMauId,
    "otp": otp
  };

  return apiClient.post('/api/ThongTinCaNhanNguoiHienMaus/mobile-app/verify-otp-dang-ky', data);
};

export const resendOTPQuenMatKhau = async (thongTinCaNhanNguoiHienMauId: number) => {
  let data = {
    "thongTinCaNhanNguoiHienMauId": thongTinCaNhanNguoiHienMauId
  };

  return apiClient.post('/api/authentications/mobile-app/resend-otp-quen-mat-khau', data);
};

export const verifyOTPQuenMatKhau = async (thongTinCaNhanNguoiHienMauId: number, otp: string) => {
  let data = {
    "thongTinCaNhanNguoiHienMauId": thongTinCaNhanNguoiHienMauId,
    "otp": otp
  };

  return apiClient.post('/api/authentications/mobile-app/verify-otp-quen-mat-khau', data);
};