import apiClient from './apiClient';

export const getAllByThongTinCaNhanNguoiHienMauId = async (id: number) => {
    return apiClient.get('/api/YeuCauCapNhatGiayChungNhanHienMaus/mobile-app/get-all-by-thong-tin-ca-nhan-nguoi-hien-mau-id?thongTinCaNhanNguoiHienMauId=' + id);
};

export const capNhatGiayChungNhanHienMau = async (
    data: FormData | null,
) => {
    return await apiClient.post('/api/YeuCauCapNhatGiayChungNhanHienMaus/mobile-app/add-or-update', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};