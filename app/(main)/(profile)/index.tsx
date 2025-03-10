import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { Avatar } from '@rneui/themed';
import { Icon } from "@rneui/base";
import { Button, Subheading } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { COLORS, FONTS, API } from "@/constants";
import { getThongTinCaNhanNguoiHienMauById, logout, uploadAvatar } from '@/api';
import { getProfile } from '@/storage';
import ItemDetail from "@/components/ItemDetail";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const getThongTinCaNhanNguoiHienMau = async () => {
    try {
      setIsLoading(true);
      const profile = await getProfile();
      const response = await getThongTinCaNhanNguoiHienMauById(profile.id);

      if (response.status !== 200) {
        throw { responseStatus: response.status };
      }

      const res = response.data;
      if (!res.isSuccessed) {
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getThongTinCaNhanNguoiHienMau();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/(login)");
  };

  const handleEditProfile = () => {
    router.push("/cap-nhat-profile");
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      ToastAndroid.show(
        "Quyền bị từ chối. Vui lòng cấp quyền truy cập ảnh trong cài đặt.",
        ToastAndroid.SHORT
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      await uploadImage(selectedImage);
      setAvatar(selectedImage);
      ToastAndroid.show("Đã cập nhật ảnh!", ToastAndroid.SHORT);
    }
  };

  const uploadImage = async (imageUri: string) => {
    try {
      setIsLoading(true);
      const result = await uploadAvatar(imageUri, data?.id || null);
      ToastAndroid.show(result ?? "Cập nhật thành công", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Lỗi khi cập nhật ảnh", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.emptyWrapper}>
        <Subheading>Chưa có dữ liệu</Subheading>
        <Button style={styles.logoutButton} onPress={handleLogout} mode="contained">
          ĐĂNG XUẤT
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Phần Avatar */}
        <View style={styles.avatarContainer}>
          <Avatar
            size={100}
            rounded
            source={avatar ? { uri: avatar } : undefined}
            icon={{ name: 'user', type: 'font-awesome' }}
            containerStyle={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={handlePickImage}>
            <Icon name="camera" type="font-awesome" size={20} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
        <Text style={styles.fullName}>
          {data.hoVaTen ? data.hoVaTen : '_'}
        </Text>

        {/* Phần Cài đặt chung */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Cài đặt chung</Text>
        </View>
        <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
          <Icon name="edit" type="feather" size={20} color={COLORS.PRIMARY} />
          <Text style={styles.settingText}>Cập nhật thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="history" type="material" size={20} color={COLORS.PRIMARY} />
          <Text style={styles.settingText}>Lịch sử hiến máu</Text>
        </TouchableOpacity>

        {/* Phần Thông tin tổng quan */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Thông tin tổng quan</Text>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{data.nhomMau ? data.nhomMau : '_'}</Text>
            <Text style={styles.cardLabel}>Nhóm máu</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{data.soLanHienMau ? data.soLanHienMau : '_'}</Text>
            <Text style={styles.cardLabel}>Số lần hiến</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{data.canNang ? data.canNang : '_'}</Text>
            <Text style={styles.cardLabel}>Cân nặng</Text>
          </View>
        </View>

        {/* Phần Thông tin cá nhân */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Thông tin cá nhân</Text>
        </View>
        <ItemDetail title="CMND" value={data.CMND ? data.CMND : '_'} />
        <ItemDetail title="Địa chỉ liên lạc" value={data.diaChiLienLac ? data.diaChiLienLac : '_'} />
        <ItemDetail title="Điện thoại di động" value={data.dienThoaiDiDong ? data.dienThoaiDiDong : '_'} />
        <ItemDetail title="Giới tính" value={data.gioiTinh ? data.gioiTinh : '_'} />
        <ItemDetail title="Ngày hiến máu cuối" value={data.ngayHienMauCuoi ? data.ngayHienMauCuoi : '_'} />
        <ItemDetail title="Ngày sinh" value={data.ngaySinh ? data.ngaySinh : '_'} />
        <ItemDetail title="Tên cơ quan" value={data.tenCoQuanDonVi ? data.tenCoQuanDonVi : '_'} />

        {/* Nút Đăng xuất */}
        <Button style={styles.logoutButton} labelStyle={styles.logoutButtonLabel} onPress={handleLogout} mode="contained">
          ĐĂNG XUẤT
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  header: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, color: COLORS.WHITE, fontWeight: 'bold' },
  scrollContent: { padding: 15 },
  loadingWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: { alignItems: 'center', marginVertical: 20, position: 'relative' },
  avatar: { backgroundColor: COLORS.PRIMARY },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: (100 - 30) / 2,
    backgroundColor: COLORS.PRIMARY,
    padding: 5,
    borderRadius: 20,
  },
  fullName: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.DARK_GRAY,
    fontFamily: FONTS.POPPINS_MEDIUM,
  },
  sectionHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LITE_GRAY,
    marginVertical: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LITE_GRAY,
  },
  settingText: {
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.DARK_GRAY,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  card: {
    width: '30%',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.LITE_GRAY,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 22,
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.PRIMARY,
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.DARK_GRAY,
  },
  logoutButton: {
    marginTop: 25,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 25,
    paddingVertical: 8,
    marginBottom: 30,
    backgroundColor: COLORS.PRIMARY,
  },
  logoutButtonLabel: { color: COLORS.WHITE, fontWeight: 'bold', fontSize: 16 },
});
