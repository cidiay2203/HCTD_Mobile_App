import React, { useState, useEffect } from 'react';
import {Button, Headline, Text} from "react-native-paper";
import { StyleSheet, View, Dimensions, FlatList, ScrollView } from "react-native";
import { SearchBar,  } from '@rneui/themed';
import { COLORS } from "@/constants";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { commonJustify } from "@/shared/CommoStyle/CommonJustify";
import Item from "@/components/Item";
import ItemDetail from "@/components/ItemDetail";
import ItemDetailHorizontal from "@/components/ItemDetailHorizontal";
import {getProfile} from '@/storage';
import {getLichSuKhenThuongHienMauByThongTinCaNhanNguoiHienMauId} from '@/api';
import { router  } from "expo-router";

export default function KhenThuongScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getListKhenThuong = async () => {    
    try {
      setIsLoading(true); // Bật trạng thái loading
      const profile = await getProfile(); 
      const response = await getLichSuKhenThuongHienMauByThongTinCaNhanNguoiHienMauId(profile.id);

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
    getListKhenThuong();
  }, [])

  const handleLichSuHienMauChiTiet = (itemId: string) => {
    router.push({
      pathname: "/(main)/(khen-thuong)/khen-thuong-chi-tiet",
      params: {id: itemId}
    });
  }

  if (Array.isArray(data)) {
    return data.map((item: any) => <Item key={item.id} onPress={handleLichSuHienMauChiTiet} item={{
      id: item.id,
      diaDiemHienMau: item.hoVaTen,
      ngayHienMau: item.ngayKhenThuong
    }}/>)
  }

  return <Text>Không tìm thấy</Text>;
}

const styles = StyleSheet.create({
 
});
