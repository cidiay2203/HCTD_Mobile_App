import React, { useState, useEffect } from 'react';
import {Text} from "react-native-paper";
import { StyleSheet, ScrollView } from "react-native";
import Item from "@/components/Item";
import {getProfile} from '@/storage';
import {getLichSuHienMauByThongTinCaNhanNguoiHienMauId} from '@/api'
import { router  } from "expo-router";

export default function LichSuHienMauScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getLichSuHienMau = async () => {    
    try {
      setIsLoading(true); // Bật trạng thái loading
      const profile = await getProfile(); 
      const response = await getLichSuHienMauByThongTinCaNhanNguoiHienMauId(profile.id);
      if (response.status != 200) {
        throw { responseStatus: response.status };
      }

      const res = response.data;

      if(res.isSuccessed == false ){
        throw { message: res.message, res: res };
      }

      setData(res.data.data);

    } catch (error) {
      console.error('Lỗi:', error);
      router.replace("/(login)");
    } finally {
        setIsLoading(false); // Tắt trạng thái loading
    }
  }

  useEffect(() => {
    getLichSuHienMau();
  }, [])

  const handleLichSuHienMauChiTiet = (itemId: string) => {
    router.push({
      pathname: "/(main)/(lich-su-hien-mau)/lich-su-hien-mau-chi-tiet",
      params: {id: itemId}
    });
  }

  if (Array.isArray(data)) {
    return (
    <ScrollView>
        {data.map((item: any) => (
          <Item key={item.id} onPress={handleLichSuHienMauChiTiet} item={item} />
        ))}
    </ScrollView>
    );
  }

  return <Text>Không tìm thấy</Text>;
}

const styles = StyleSheet.create({
 
});
