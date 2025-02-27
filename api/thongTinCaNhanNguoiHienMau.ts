import apiClient from './apiClient';

export const getThongTinCaNhanNguoiHienMauById = async (id: number) => {
  return apiClient.get('/api/ThongTinCaNhanNguoiHienMaus/mobile-app/get-by-id?id=' + id);
};

export const getLichSuHienMauByThongTinCaNhanNguoiHienMauId = async (thongTinCaNhanNguoiHienMauId: number, thongTinTuiMauId?: number) => {
  let url = '/api/ThongTinCaNhanNguoiHienMaus/mobile-app/get-list-lich-su-hien-mau-by-thong-tin-ca-nhan-nguoi-hien-mau-id?thongTinCaNhanNguoiHienMauId=' + thongTinCaNhanNguoiHienMauId;
  url += "&thongTinTuiMauId=" + (thongTinTuiMauId ? thongTinTuiMauId : null);
  
  return apiClient.get(url);
};

export const getLichSuKhenThuongHienMauByThongTinCaNhanNguoiHienMauId = async (thongTinCaNhanNguoiHienMauId: number, danhSachDaKhenThuongChiTietId?: number) => {
  let url = '/api/ThongTinCaNhanNguoiHienMaus/mobile-app/get-list-lich-su-khen-thuong-hien-mau-by-thong-tin-ca-nhan-nguoi-hien-mau-id?thongTinCaNhanNguoiHienMauId=' + thongTinCaNhanNguoiHienMauId;
  url += "&danhSachDaKhenThuongChiTietId=" + (danhSachDaKhenThuongChiTietId ? danhSachDaKhenThuongChiTietId : null);
  
  return apiClient.get(url);
};

export const getDanhSachLoaiKhenThuongDuDieuKienByThongTinCaNhanNguoiHienMauId = async (thongTinCaNhanNguoiHienMauId: number) => {
  let url = '/api/ThongTinCaNhanNguoiHienMaus/mobile-app/danh-sach-loai-khen-thuong-du-dieu-kien-by-thong-tin-ca-nhan-nguoi-hien-mau-id?thongTinCaNhanNguoiHienMauId=' + thongTinCaNhanNguoiHienMauId;
  
  return apiClient.get(url);
};

export const capNhatThongTinCaNhanNguoiHienMauById = async (id: number, hoVaTen: string,
  ngaySinh: string, canNang: number, soChungMinhNhanDan: string, noiCapCMNDId: string,
  gioiTinhId: string, dienThoaiDiDong: string, email: string,
  coQuanTruongLop: string, diaChiThuongTru: string, diaChiLienLac: string,
  ngheNghiepId: string, nganHangId: string, soTaiKhoanNganHang: string,
  tenChuTaiKhoanNganHang: string) => {
  let data = {
    "Id": id,
    "HoVaTen": hoVaTen,
    "NgaySinh": ngaySinh,
    "CanNang": canNang,
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
  return apiClient.post('/api/ThongTinCaNhanNguoiHienMaus/mobile-app/cap-nhat-by-id', data);
};

export const uploadAvatar = async (imageUri: string, id: string): Promise<string | null> => {
  try {
    const formData = new FormData();
    
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "avatar.jpg",
    } as any);
    formData.append("id", id);

    const response = await apiClient.post(
      "/api/ThongTinCaNhanNguoiHienMaus/mobile-app/upload-avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      return "Cập nhật ảnh thành công!"; 
    } else {
      return "Lỗi khi cập nhật ảnh.";
    }
  } catch (error) {
    return "Lỗi khi cập nhật ảnh.";
  }
};