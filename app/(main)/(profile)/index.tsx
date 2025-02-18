import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ToastAndroid } from "react-native";
import { Avatar, ListItem } from '@rneui/themed';
import { COLORS, FONTS } from "@/constants";
import { Icon } from "@rneui/base";
import { commonJustify } from "@/shared/CommoStyle/CommonJustify";
import { commonStyle } from "@/shared/CommoStyle/CommonStyle";
import { router } from "expo-router";
import { getThongTinCaNhanNguoiHienMauById, logout, uploadAvatar } from '@/api';
import { getProfile } from '@/storage';
import { Button, Headline, Subheading } from "react-native-paper";
import ItemDetail from "@/components/ItemDetail";
import * as ImagePicker from "expo-image-picker";
import {API} from '@/constants';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const getThongTinCaNhanNguoiHienMau = async () => {
    try {
      setIsLoading(true);
      const profile = await getProfile();
      const response = await getThongTinCaNhanNguoiHienMauById(profile.id);

      if (response.status != 200) {
        throw { responseStatus: response.status };
      }

      const res = response.data;

      if (res.isSuccessed == false) {
        throw { message: res.message, res: res };
      }

      setData(res.data);
      if (res.data.hinhAnh) {
        setAvatar(API.BASE_URL + res.data.hinhAnh);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      router.replace("/(login)");
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  }

  useEffect(() => {
    getThongTinCaNhanNguoiHienMau();
  }, [])

  const handleItemPress = async (item: string) => {
    switch (item) {
      case "Sign out":
        await logout();
        router.replace("/(login)");
        break;
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/(login)");
  };

  const handleEditProfile = async () => {
    router.push("/cap-nhat-profile");
  };

  const handlePickImage = async () => {
    // 1 Yêu cầu quyền truy cập ảnh
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      ToastAndroid.show("Quyền bị từ chối, Vui lòng cấp quyền truy cập ảnh trong cài đặt.", ToastAndroid.SHORT);
      return;
    }

    // 2 Mở thư viện ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      await uploadImage(selectedImage);
      setAvatar(selectedImage);
      ToastAndroid.show(selectedImage ?? "", ToastAndroid.SHORT);
    }
  };

  const uploadImage = async (imageUri: string) => {
    try {
      setIsLoading(true);

      const result = await uploadAvatar(imageUri, data.id ? data.id : null)

      ToastAndroid.show(result ?? "", ToastAndroid.SHORT);

    } catch (error) {
      ToastAndroid.show("Lỗi khi cập nhật ảnh", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    return <View style={styles.wrapper}>
      <Subheading>Chưa có dữ liệu</Subheading>
      <Button style={styles.buttonBack} onPress={handleLogout} >Đăng xuất</Button>
    </View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
      </View>
      <ScrollView>
        <View style={[commonJustify.rowCenter, { marginVertical: 20 }]}>
          <Avatar
            size={100}
            rounded
            source={avatar ? { uri: avatar } : undefined}
            icon={{ name: 'user', type: 'font-awesome' }}
            containerStyle={{ backgroundColor: COLORS.PRIMARY }}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={handlePickImage}>
            <Icon name="camera" type="font-awesome" size={20} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[commonStyle({ fontSize: 16, color: COLORS.LITE_DARK3 }).text, commonJustify.textCenter]}>{data.hoVaTen ? data.hoVaTen : '_'}</Text>
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionHeaderText}>Cài đặt chung</Text></View>
        <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
          <Icon name="edit" type="feather" size={20} />
          <Text style={styles.settingText}>Cập nhật thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="history" type="material" size={20} />
          <Text style={styles.settingText}>Lịch sử hiến máu</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}><Text style={styles.sectionHeaderText}>Thông tin tổng quan</Text></View>

        {/* <View style={[commonJustify.rowCenter, { marginVertical: 20 }]}>
          <Icon name="map" />
          <Text style={[commonStyle({ fontSize: 10, color: COLORS.LITE_DARK3 }).text, commonJustify.textCenter]}>{data.diaChiLienLac ? data.diaChiLienLac : '_'}</Text>
        </View> */}
        <View style={commonJustify.rowSpaceEvenly}>
          <View style={styles.card}>
            <Text style={[commonStyle({ fontSize: 24, fontFamily: FONTS.POPPINS_BOLD }).text, { textAlign: 'center' }]}>{data.nhomMau ? data.nhomMau : '_'}</Text>
            <Text style={[commonStyle({ fontSize: 14, fontFamily: FONTS.POPPINS_REGULAR }).text, { textAlign: 'center' }]}>Nhóm máu</Text>
          </View>
          <View style={styles.card}>
            <Text style={[commonStyle({ fontSize: 24, fontFamily: FONTS.POPPINS_BOLD }).text, { textAlign: 'center' }]}>{data.soLanHienMau ? data.soLanHienMau : '_'}</Text>
            <Text style={[commonStyle({ fontSize: 14, fontFamily: FONTS.POPPINS_REGULAR }).text, { textAlign: 'center' }]}>Số lần hiến</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionHeaderText}>Thông tin cá nhân</Text></View>

        <ItemDetail title="CMND" value={data.CMND ? data.CMND : '_'} />
        <ItemDetail title="Địa chỉ liên lạc" value={data.diaChiLienLac ? data.diaChiLienLac : '_'} />
        <ItemDetail title="Điện thoại di động" value={data.dienThoaiDiDong ? data.dienThoaiDiDong : '_'} />
        <ItemDetail title="Giới tính" value={data.gioiTinh ? data.gioiTinh : '_'} />
        <ItemDetail title="Ngày hiến máu cuối" value={data.ngayHienMauCuoi ? data.ngayHienMauCuoi : '_'} />
        <ItemDetail title="Ngày sinh" value={data.ngaySinh ? data.ngaySinh : '_'} />
        <ItemDetail title="Tên cơ quan" value={data.tenCoQuanDonVi ? data.tenCoQuanDonVi : '_'} />

        <Button style={styles.buttonBack} labelStyle={styles.buttonLabel} onPress={handleLogout}>ĐĂNG XUẤT</Button>
      </ScrollView>
    </View>

  )

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  header: { backgroundColor: COLORS.PRIMARY, padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 18, color: COLORS.WHITE, fontWeight: 'bold' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 120, backgroundColor: COLORS.PRIMARY, padding: 5, borderRadius: 20 },
  sectionHeader: {
    padding: 10,
    backgroundColor: COLORS.LITE_GRAY
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LITE_GRAY
  },
  settingText: {
    marginLeft: 10,
    fontSize: 14
  },


  card: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    marginBottom: 10
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonBack: {
    marginTop: 15,
    backgroundColor: COLORS.PRIMARY,
  },
  buttonLabel: {
    color: COLORS.WHITE
  }
});

import AntDesign from 'react-native-vector-icons/AntDesign';

const list = [
  {
    title: "Available for donate",
    icon: 'calendar',
    iconName: AntDesign
  },
  {
    title: "Invited Friend",
    icon: 'mail',
    iconName: AntDesign
  },
  {
    title: "Get help",
    icon: 'infocirlceo',
    iconName: AntDesign
  },
  {
    title: "Sign out",
    icon: 'logout',
    iconName: AntDesign
  }
];