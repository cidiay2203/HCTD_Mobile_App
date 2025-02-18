import React, { useState, useEffect } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  ScrollView, 
  Image, 
  Pressable,
  Linking,
  Alert
} from 'react-native';
import Slider from '@/app/(main)/(home)/SliderComponent';
import Body from './BodyComponent';
import Donation from './DonationComponent';
import {Button, Text} from "react-native-paper";
import { IMAGES, FONTS, COLORS } from '@/constants';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {getProfile} from '@/storage';
import {getThongTinCaNhanNguoiHienMauById} from '@/api';
import { router } from "expo-router";
import handleError from '@/shared/errorHandler';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [thongTinCaNhanNguoiHienMau, setThongTinCaNhanNguoiHienMau] = useState(null);
  const gotoWebsite =  async () => {
    await Linking.openURL(`https://hoichuthapdokhanhhoa.org.vn/TinTuc`);
  }

  const getThongTinCaNhanNguoiHienMau = async () => {    
    try {
      setIsLoading(true); // Bật trạng thái loading
      const profile = await getProfile(); 
      const response = await getThongTinCaNhanNguoiHienMauById(profile.id);

      if (response.status != 200) {
        throw { responseStatus: response.status };
      }

      const res = response.data;

      if(res.isSuccessed == false ){
        throw { message: res.message, res: res };
      }

      setThongTinCaNhanNguoiHienMau(res.data);

    } catch (error) {
      handleError(error); 
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getThongTinCaNhanNguoiHienMau();
  }, [])

  if(thongTinCaNhanNguoiHienMau){
    return (
      <View style={{width: '100%', height: '100%'}}>
        <FlatList
          data={[thongTinCaNhanNguoiHienMau]}
          ListHeaderComponent={() => (
            <View>
              <Slider />
              <Body />
            </View>
          )}
          renderItem={({item}) => <Donation item={item} />}
        />
      </View> 
      
    );
  }
  else{
    return <Text>Không có dữ liệu</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
  main:{
    backgroundColor:'white',
    marginTop:10
  },
  margin:{
      marginLeft:10, 
      padding:5
  }
});


// export const donationRequest = [
//   {
//       id:1,
//       name:"Nguyễn Khắc Huy",
//       location:"233/5 Lê Hồng Phong",
//       time:"5 Min Ago",

//   },
  // {
  //     id:2,
  //     name:"Habib",
  //     location:"Shylet, Bangladesh",
  //     time:"5 Min Ago",

  // },
  // {
  //     id:3,
  //     name:"Kobir",
  //     location:"Dhaka, Bangladesh",
  //     time:"20 Min Ago",

  // },
  // {
  //     id:4,
  //     name:"Asik",
  //     location:"Dhaka, Bangladesh",
  //     time:"50 Min Ago",

  // },
// ]