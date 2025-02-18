import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Linking, ScrollView } from "react-native";
import { SearchBar,  } from '@rneui/themed';
import { COLORS } from "@/constants";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { commonJustify } from "@/shared/CommoStyle/CommonJustify";
import {getLichSuKhenThuongHienMauByThongTinCaNhanNguoiHienMauId} from '@/api';
import { router, useRouter, useLocalSearchParams } from "expo-router";
import {Button, Headline, Text} from "react-native-paper";
import ItemDetail from "@/components/ItemDetail";
import ItemDetailHorizontal from "@/components/ItemDetailHorizontal";
import {getProfile} from '@/storage';

export default function KhenThuongChiTietScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const getLichSuHienMauChiTiet = async () => {    
    try {
      setIsLoading(true); // Bật trạng thái loading
      const profile = await getProfile(); 
      
      const response = await getLichSuKhenThuongHienMauByThongTinCaNhanNguoiHienMauId(profile.id, params.id);
      if (response.status != 200) {
        throw { responseStatus: response.status };
      }

      const res = response.data;

      if(res.isSuccessed == false ){
        throw { message: res.message, res: res };
      }

      if(res.data.data && res.data.data.length > 0){
        setData(res.data.data[0]);
      } else {
        setData(null);
      }

    } catch (error) {
      console.error('Lỗi:', error);
      router.replace("/(login)");
    } finally {
        setIsLoading(false); // Tắt trạng thái loading
    }
  }

  

  useEffect(() => {
    getLichSuHienMauChiTiet();
  }, [])

  if (data) {
    const gotoDocument = async () => {
      const profile = await getProfile(); 
      let url = `https://app.hoichuthapdokhanhhoa.org.vn/api/QuanLyHeThong/DownloadGiayChungNhanCaNhanDaKhenThuongMobile?nguoiHienMauId=${profile.id}&danhSachKhenThuongId=${data.danhSachKhenThuongId}`;
      await Linking.openURL(url);
    }
    return <ScrollView>
            <Headline style={styles.title}>Thông tin chi tiết</Headline>
            <ItemDetailHorizontal title="Họ và tên" value={data.hoVaTen}/>
            <ItemDetail title="Loại khen thưởng" value={data.loaiKhenThuong}/>
            <ItemDetail title="Đơn vị quyết định" value={data.donViQuyetDinh}/>
            <ItemDetailHorizontal title="Ngày khen thưởng" value={data.ngayKhenThuong}/>
            <ItemDetailHorizontal title="Ngày quyết định" value={data.ngayQuyetDinh}/>
            <ItemDetailHorizontal title="Số quyết định" value={data.soQuyetDinh}/>
            <ItemDetailHorizontal title="Thành tích đạt được" value={data.thanhTichDatDuoc}/>
            <View style={styles.buttonWrapper}>
                <Button 
                  mode="outlined" 
                  labelStyle={styles.buttonLabel} 
                  style={styles.buttonBack} 
                  onPress={gotoDocument}>Tải giấy chứng nhận</Button>
                <Button
                  mode="elevated" 
                  labelStyle={styles.buttonLabel}
                  style={styles.buttonBack} onPress={() => router.back()}>Trở về danh sách</Button>
            </View>
            
        </ScrollView>
  }

  return <ScrollView style={styles.wrapper}
            contentContainerStyle={{
              alignItems: 'center', // Sử dụng contentContainerStyle
              justifyContent: 'center', // Sử dụng contentContainerStyle
            }}
          >
            <Text>Chưa có dữ liệu</Text>
            <View style={styles.buttonWrapper}>
              <Button
                mode="elevated" 
                labelStyle={styles.buttonLabel}
                style={styles.buttonBack} onPress={() => router.back()}
              >
                Trở về danh sách
              </Button>
            </View>
        </ScrollView>
}

const styles = StyleSheet.create({
  wrapper: {
      flex: 1
  },
  title: {
    backgroundColor: COLORS.PRIMARY,
    textAlign: "center",
    color: COLORS.WHITE,
    fontWeight: 'bold',
    padding: 10
  },
  buttonWrapper: {
    padding: 10,
  },
  buttonBack: {
    marginTop: 15,
    backgroundColor: COLORS.PRIMARY,
  },
  buttonLabel:{
    color: COLORS.WHITE
  }
})