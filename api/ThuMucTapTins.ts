import apiClient from './apiClient';

export const getListThuMucTapTin = async (thuMucTapTinIdCapTren?: number) => {
    let url = '/api/ThuMucTapTins/mobile-app/get-list';
    if(thuMucTapTinIdCapTren != null){
        url +="?thuMucTapTinIdCapTren=" + thuMucTapTinIdCapTren;
    }

    console.log("url: " + url);
    
    return apiClient.get(url);
};
