import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "@/constants";
import {getLichSuHienMauByThongTinCaNhanNguoiHienMauId} from '@/api';
import { router, useLocalSearchParams } from "expo-router";
import {Button, Headline, Text} from "react-native-paper";
import ItemDetail from "@/components/ItemDetail";
import {getProfile} from '@/storage';
import handleError from '@/shared/errorHandler';

export default function LichSuHienMauChiTietScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const getLichSuHienMauChiTiet = async () => {    
    try {
        setIsLoading(true); // Bật trạng thái loading
        const profile = await getProfile(); 
        
        const response = await getLichSuHienMauByThongTinCaNhanNguoiHienMauId(profile.id, params.id);
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
      handleError(error); 
    } finally {
        setIsLoading(false); // Tắt trạng thái loading
    }
  }

  useEffect(() => {
    getLichSuHienMauChiTiet();
  }, [])

  if (data) {
    
    return <ScrollView>
              <Headline style={styles.title}>Thông tin chi tiết</Headline>
              <ItemDetail title="Họ và tên" value={data.hoVaTen} />
              <ItemDetail title="Ngày hiến máu" value={data.ngayHienMau} />
              <ItemDetail title="Địa điểm hiến máu" value={data.diaDiemHienMau} />
              <ItemDetail title="Nhóm máu" value={data.nhomMau} />
              <ItemDetail title="Thể tích" value={data.theTich} />
              <ItemDetail title="Cơ quan đơn vị" value={data.coQuanDonVi} />
              <ItemDetail title="Mã chứng nhận" value={data.maGiayChungNhanHMTN} />
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