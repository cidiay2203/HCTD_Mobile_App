import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable
} from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const Body = () => {
  return (
    <FlatList
      data={ItemArray}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Card item={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const Card = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={() => item.redirect && router.push(item.redirect)} style={styles.card}>
        {item.icon && <FontAwesome name={item.icon} size={28} color={COLORS.PRIMARY} style={styles.icon} />}
        {item.image && <Image source={item.image} style={styles.image} />}
        <Text style={styles.text}>{item.title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  cardContainer: {
    width: width * 0.333,
    alignItems: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    elevation: 3,
    width: '90%',
    aspectRatio: 1,
  },
  icon: {
    marginBottom: 8,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 12,
    fontFamily: FONTS.POPPINS_BOLD,
    textAlign: 'center',
    color: COLORS.BLACK,
  },
});

const ItemArray = [
  { id: 1, title: 'Lịch HM', icon: 'calendar', redirect: '/(lich-to-chuc-hien-mau)' },
  { id: 3, title: 'Văn bản', icon: 'newspaper-o', redirect: '/van-ban' },
  { id: 4, title: 'Khen thưởng hiến máu', icon: 'trophy', redirect: '/khen-thuong-hien-mau' },
  { id: 5, title: 'Câu hỏi thường gặp', icon: 'comments', redirect: '/(cau-hoi-thuong-gap)' },
  { id: 6, title: 'Tiêu chuẩn khen thưởng', icon: 'clipboard', redirect: '/(tieu-chuan-khen-thuong)' },
  { id: 7, title: 'Gia đình', icon: 'group', redirect: '' },
  { id: 8, title: 'Yêu cầu cập nhật giấy chứng nhận hiến máu', icon: 'file', redirect: '/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)' },
  { id: 9, title: 'Yêu cầu cấp lại giấy chứng nhận hiến máu', icon: 'file', redirect: '/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)' },
];

export default Body;
