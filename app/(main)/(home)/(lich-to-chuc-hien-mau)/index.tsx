import React, { useState, useEffect } from 'react';
import {Alert, Linking, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-paper";
import {getProfile} from '@/storage';
import {
    getLichToChucHienMauCoTheDangKy,
    dangKyThamGiaHienMauTheoLichToChucHienMau, 
    huyDangKyThamGiaHienMauTheoLichToChucHienMau
} from '@/api';
import ItemDetailHorizontal from '@/components/ItemDetailHorizontal';
import { COLORS } from "@/constants";
import { router } from "expo-router";
import handleError from '@/shared/errorHandler';

export default function LichHienMauScreen(){
    const [isLoading, setIsLoading] = useState(false);
    const [lichToChucHienMauCoTheDangKy, setLichToChucHienMauCoTheDangKy] = useState([]);

    const getLichToChucHienMau = async () => {    
        setIsLoading(true); // Bật trạng thái loading

        try {
            const profile = await getProfile(); 
            
            const response = await getLichToChucHienMauCoTheDangKy(profile.id);

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }
    
            const res = response.data;
    
            if(res.isSuccessed == false ){
                throw { message: res.message, res: res };
            }

            setLichToChucHienMauCoTheDangKy(res.data.data);

        } catch (error) {
            handleError(error); 
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    }

    useEffect(() => {
        getLichToChucHienMau();
    }, [])

    const dangKyHienMau = async (lichToChucHienMauId: number) => {
        setIsLoading(true); // Bật trạng thái loading

        try {
            const profile = await getProfile(); 
            const response = await dangKyThamGiaHienMauTheoLichToChucHienMau(profile.id, lichToChucHienMauId);
      
            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data; // Lấy dữ liệu JSON từ phản hồi
            
            if(res.isSuccessed == true ){
                if(res.data && res.data.lichToChucHienMau_ThongTinCaNhanNguoiHienMauId){
                    router.push({
                        pathname: "/(main)/(home)/(lich-to-chuc-hien-mau)/cau-hoi-dang-ky-hien-mau",
                        params: {lichToChucHienMau_ThongTinCaNhanNguoiHienMauId: res.data.lichToChucHienMau_ThongTinCaNhanNguoiHienMauId}
                    });
                } else{
                    throw { message: "Không trả về giá trị lichToChucHienMau_ThongTinCaNhanNguoiHienMauId", res: res };
                }
            }
            else {
                Alert.alert('Đăng ký không thành công', res.message);
            }
        } catch (error) {
            handleError(error); 
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    }
    const handleHuyDangKyHienMau = async (lichToChucHienMauId: number) => {
        setIsLoading(true); // Bật trạng thái loading

        try {
            const profile = await getProfile(); 
            const response = await huyDangKyThamGiaHienMauTheoLichToChucHienMau(profile.id, lichToChucHienMauId);
       
            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data; // Lấy dữ liệu JSON từ phản hồi
            
            if(res.isSuccessed == true ){
                Alert.alert('Thông báo', "Hủy đăng ký thành công");    
                getLichToChucHienMau();
            } else {
                Alert.alert('Hủy đăng ký không thành công', res.message);
            }
        } catch (error) {
            handleError(error); 
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    }
    const handleXemDanhSachCauHoi = async (lichToChucHienMau_ThongTinCaNhanNguoiHienMauId: number) => {
        if(lichToChucHienMau_ThongTinCaNhanNguoiHienMauId && lichToChucHienMau_ThongTinCaNhanNguoiHienMauId != -1){
            router.push({
                pathname: "/(main)/(home)/(lich-to-chuc-hien-mau)/cau-hoi-dang-ky-hien-mau",
                params: {lichToChucHienMau_ThongTinCaNhanNguoiHienMauId: lichToChucHienMau_ThongTinCaNhanNguoiHienMauId}
            });
        }
    }
    const registerButton = (item: any) => {
        if (item.daDangKy === 0) {
            return <Button 
                        mode="contained" 
                        onPress={() => dangKyHienMau(item.id)}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                        loading={isLoading} 
                    >
                        {isLoading ? 'đang thực hiện...' : 'ĐĂNG KÝ'}
                    </Button>
        }

        return (
            <View>
                <Button 
                    mode="elevated"
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    onPress={() => handleXemDanhSachCauHoi(item.lichToChucHienMau_ThongTinCaNhanNguoiHienMauId)}
                >
                    XEM CÂU HỎI
                </Button>
                <Button 
                    mode="elevated"
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    onPress={() => handleHuyDangKyHienMau(item.id)}
                    loading={isLoading} 
                >
                    {isLoading ? 'đang thực hiện...' : 'HỦY ĐĂNG KÝ'}
                </Button>
            </View>
            )
    }

    return <ScrollView>
            {lichToChucHienMauCoTheDangKy.map((item: any) => <View key={item.id} style={styles.itemWrapper}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.ngayToChuc}</Text>
                </View>
                <ItemDetailHorizontal title="Ngày tổ chức" value={item.ngayToChuc}/>
                <ItemDetailHorizontal title="Thời gian" value={item.thoiGian}/>
                <ItemDetailHorizontal title="Số lượng người hiến máu" value={item.soLuongNguoiHienMau}/>
                <ItemDetailHorizontal title="Địa điểm" value={item.diaDiem}/>
                <ItemDetailHorizontal title="Thời gian" value={item.thoiGian}/>
                <ItemDetailHorizontal title="Khẩn cấp" value={item.khanCap ? 'Khẩn cấp' : 'Không khẩn cấp'}/>
                <ItemDetailHorizontal title="Đăng ký tham gia" value={item.daDangKy == true ? 'Bạn đã đăng ký' : 'Bạn chưa đăng ký'}/>
                <View style={styles.buttonWrapper}>
                    <Button onPress={() => Linking.openURL(item.linkDiaDiemGoogleMap)} style={{marginBottom: 5}}>Link
                        google map</Button>
                    {registerButton(item)}
                </View>
            </View>)}
        </ScrollView>
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemWrapper: {
        marginBottom: 10,
        backgroundColor: 'white',
    },
    header: {
        padding: 10,
    },
    title: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 18
    },
    buttonWrapper: {
        padding: 10,
    },
    button: {
        backgroundColor: COLORS.PRIMARY,
        marginTop: 10
    },
    buttonLabel:{
        color: COLORS.WHITE
    }
})