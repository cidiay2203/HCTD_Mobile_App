import apiClient from './apiClient';

export const getAllYeuCauCapLaiByThongTinCaNhanNguoiHienMauId = async (id: number) => {
    return apiClient.get('/api/YeuCauCapLaiGiayChungNhanHienMaus/mobile-app/get-all-by-thong-tin-ca-nhan-nguoi-hien-mau-id?thongTinCaNhanNguoiHienMauId=' + id);
};

export const capNhatYeuCauCapLaiGiayChungNhanHienMau = async (
    ngayCap: string,
    diaDiem: string,
    donViId: string,
    thongTinCaNhanNguoiHienMauId: string
) => {
    let data = {
        "Id": "",
        "ThongTinCaNhanNguoiHienMauId": thongTinCaNhanNguoiHienMauId,
        "NgayCap": ngayCap,
        "DiaDiem": diaDiem,
        "DonViId": donViId,
        "TrangThaiYeuCauCapLaiGiayChungNhanHienMauId": "1",
    };

    return apiClient.post('/api/YeuCauCapLaiGiayChungNhanHienMaus/mobile-app/add-or-update', data);
};