import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ActivityIndicator, 
  FlatList
} from 'react-native';
import { Text } from "react-native-paper";
import { COLORS } from '@/constants';
import { getProfile } from '@/storage';
import { getThongTinCaNhanNguoiHienMauById } from '@/api';
import handleError from '@/shared/errorHandler';

import Slider from '@/app/(main)/(home)/SliderComponent';
import ProfileInformation from './ProfileInformationComponent';
import Body from './BodyComponent';
import Donation from './DonationComponent';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [thongTinCaNhanNguoiHienMau, setThongTinCaNhanNguoiHienMau] = useState(null);

  const getThongTinCaNhanNguoiHienMau = async () => {    
    try {
      setIsLoading(true);
      const profile = await getProfile(); 
      const response = await getThongTinCaNhanNguoiHienMauById(profile!.id);

      if (response.status !== 200) {
        throw { responseStatus: response.status };
      }

      const res = response.data;

      if (!res.isSuccessed) {
        throw { message: res.message, res: res };
      }

      setThongTinCaNhanNguoiHienMau(res.data);
    } catch (error) {
      handleError(error); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getThongTinCaNhanNguoiHienMau();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!thongTinCaNhanNguoiHienMau) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Không có dữ liệu</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[thongTinCaNhanNguoiHienMau]} // Dummy data để FlatList render
      keyExtractor={() => "profile-data"}
      ListHeaderComponent={() => (
        <>
          <ProfileInformation data={thongTinCaNhanNguoiHienMau} />
          <View style={styles.spacing} />
          <Slider />
          <View style={styles.spacing} />
          <Body />
        </>
      )}
      renderItem={({ item }) => (
        <>
          <Donation item={item} />
          <View style={styles.spacing} />
        </>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.LITE_DARK,
    marginTop: 20,
  },
});