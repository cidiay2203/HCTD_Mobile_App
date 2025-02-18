import {login, logout, register, quenMatKhau} from './auth';
import {
    getThongTinCaNhanNguoiHienMauById,
    getLichSuHienMauByThongTinCaNhanNguoiHienMauId,
    getLichSuKhenThuongHienMauByThongTinCaNhanNguoiHienMauId,
    getDanhSachLoaiKhenThuongDuDieuKienByThongTinCaNhanNguoiHienMauId,
    capNhatThongTinCaNhanNguoiHienMauById,
    uploadAvatar
} from './thongTinCaNhanNguoiHienMau';
import {
    getLichToChucHienMauCoTheDangKy, 
    dangKyThamGiaHienMauTheoLichToChucHienMau, 
    huyDangKyThamGiaHienMauTheoLichToChucHienMau,
    getListCauHoiDangKyHienMauByLichToChucHienMau_ThongTinCaNhanNguoiHienMauId,
    nguoiHienMauTraLoiCauHoiDangKyHienMau
} from './lichToChucHienMau';

import {
    getListCauHois, 
    getCauTraLoiByCauHoiId
} from './hoiDap';

import {
    getListThuMucTapTin
} from './ThuMucTapTins';

import {
    resendOTPRegister,
    verifyOTPRegister,
    resendOTPQuenMatKhau,
    verifyOTPQuenMatKhau
} from '././otp';

import {
    getAllGioiTinhs
} from '././gioiTinh';

import {
    getAllTinhs
} from '././tinh';

import {
    getAllNgheNghieps
} from '././ngheNghiep';

import {
    getAllNganHangs
} from '././nganHang';

import downloadAndOpenFile from '././downloadAndOpenFile';

import {
    getAllByThongTinCaNhanNguoiHienMauId,
    capNhatGiayChungNhanHienMau
} from './yeuCauCapNhatGiayChungNhanHienMau';

import {
    getAllYeuCauCapLaiByThongTinCaNhanNguoiHienMauId,
    capNhatYeuCauCapLaiGiayChungNhanHienMau
} from './yeuCauCapLaiGiayChungNhanHienMau';

import {
    getAllDonVis
} from './donVi';
export {
    login, 
    logout,
    register,
    quenMatKhau,
    resendOTPQuenMatKhau,
    verifyOTPQuenMatKhau,
    getThongTinCaNhanNguoiHienMauById,
    getLichSuHienMauByThongTinCaNhanNguoiHienMauId,
    getLichSuKhenThuongHienMauByThongTinCaNhanNguoiHienMauId,
    getDanhSachLoaiKhenThuongDuDieuKienByThongTinCaNhanNguoiHienMauId,
    capNhatThongTinCaNhanNguoiHienMauById,
    uploadAvatar,
    getLichToChucHienMauCoTheDangKy,
    getListCauHoiDangKyHienMauByLichToChucHienMau_ThongTinCaNhanNguoiHienMauId,
    nguoiHienMauTraLoiCauHoiDangKyHienMau,
    dangKyThamGiaHienMauTheoLichToChucHienMau,
    huyDangKyThamGiaHienMauTheoLichToChucHienMau,
    getListCauHois,
    getCauTraLoiByCauHoiId,
    getListThuMucTapTin,
    resendOTPRegister,
    verifyOTPRegister,
    getAllGioiTinhs,
    getAllTinhs,
    getAllNgheNghieps,
    getAllNganHangs,
    downloadAndOpenFile,
    getAllByThongTinCaNhanNguoiHienMauId,
    capNhatGiayChungNhanHienMau,
    getAllYeuCauCapLaiByThongTinCaNhanNguoiHienMauId,
    capNhatYeuCauCapLaiGiayChungNhanHienMau,
    getAllDonVis
}