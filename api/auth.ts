import apiClient from './apiClient';
import {removeToken, removeProfile} from '@/storage';

export const login = async (username: string, password: string) => {
  const data = {
    "username": username,
    "password": password
  }
  return apiClient.post('/api/authentications/mobile-app/thong-tin-nguoi-hien-mau/login', data);
};

export const logout = async (): Promise<void> => {
  try {
    await removeToken();
    await removeProfile();
  } catch (error) {
    console.error('Error during logout:', error);
    throw error; // Ném lỗi để xử lý nếu cần
  }
};

export const register = async (username: string, matKhau: string, hoVaTen: string,
                                ngaySinh: string, soChungMinhNhanDan: string, noiCapCMNDId: string,
                                gioiTinhId: string, dienThoaiDiDong: string, email: string,
                                coQuanTruongLop: string, diaChiThuongTru: string, diaChiLienLac: string,
                                ngheNghiepId: string, nganHangId: string, soTaiKhoanNganHang: string,
                                tenChuTaiKhoanNganHang: string) => {
  let data = {
    "Username": username,
    "MatKhau": matKhau,
    "HoVaTen": hoVaTen,
    "NgaySinh": ngaySinh,
    "SoChungMinhNhanDan": soChungMinhNhanDan,
    "NoiCapCMNDId": noiCapCMNDId,
    "GioiTinhId": gioiTinhId,
    "DienThoaiDiDong": dienThoaiDiDong,
    "Email": email,
    "CoQuanTruongLop": coQuanTruongLop,
    "DiaChiThuongTru": diaChiThuongTru,
    "DiaChiLienLac": diaChiLienLac,
    "NgheNghiepId": ngheNghiepId,
    "NganHangId": nganHangId,
    "SoTaiKhoanNganHang": soTaiKhoanNganHang,
    "TenChuTaiKhoanNganHang": tenChuTaiKhoanNganHang
  };
  return apiClient.post('/api/ThongTinCaNhanNguoiHienMaus/mobile-app/dang-ky', data);
};

export const quenMatKhau = async (email: string) => {
  let data = {
    "email": email
  };
  return apiClient.post('/api/authentications/mobile-app/quen-mat-khau', data);
};

