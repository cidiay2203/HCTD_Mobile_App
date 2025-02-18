import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
  ImageSourcePropType,
  Pressable
} from 'react-native';
import {COLORS, FONTS} from '@/constants';
import {commonStyle} from '@/shared/CommoStyle/CommonStyle';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import { router } from "expo-router";

const Body = () => {
  return (
    <FlatList
      data={ItemArray}
      numColumns={3}
      renderItem={({item}) => <Card item={item} />}
    />
  );
};

export default Body;

interface CardItem {
  id: number;
  title: string;
  icon: string;
  image: ImageSourcePropType;    
}

interface CardProps {
    item: CardItem;  
}

const Card: React.FC<CardProps> = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.subCard}>
        <View style={styles.body}>
          <Pressable onPress={() => router.push(item.redirect)}>
              <View style={{alignItems: 'center', justifyContent: 'center',}}>
                {item.icon && <FontAwesome name={item.icon} size={26} color="#ec3237"/>} 
                {item.image && <Image source={item.image} />} 
                
                <Text
                  style={
                    commonStyle({fontSize: 11}).text
                  }>
                  {item.title}
                </Text>
              </View>              
          </Pressable>
        </View>
      </View>
    </View>
  );
};



const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: width * 0.333,
    height: 100,
    marginBottom: 10,
  },
  subCard: {
    margin: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    height: '100%',
  },
  body: {
    alignItems: 'center',
    marginTop: '20%',
  },
});

const ItemArray = [
  {
    id: 1,
    title: 'Lịch HM',
    icon: "calendar",
    redirect: "/(lich-to-chuc-hien-mau)"
  },
  // {
  //   id: 2,
  //   title: 'Hiến máu',
  //   icon: "search",
  //   redirect: "/(search)"
  // },
  {
    id: 3,
    title: 'Văn bản',
    icon: "newspaper-o",
    redirect: "/van-ban"
  },
  {
    id: 4,
    title: 'Khen thưởng hiến máu',
    icon: "trophy",
    redirect: "/khen-thuong-hien-mau"
  },
  {
    id: 5,
    title: 'Câu hỏi thường gặp',
    icon: "comments",
    redirect: "/(cau-hoi-thuong-gap)"
  },
  {
    id: 6,
    title: 'Tiêu chuẩn khen thưởng',
    icon: "clipboard",
    redirect: "/(tieu-chuan-khen-thuong)"
  },
  {
    id: 7,
    title: 'Gia đình',
    icon: "group",
    redirect: ""
  },
  {
    id: 8,
    title: 'Yêu cầu cập nhật giấy chứng nhận hiến máu',
    icon: "file",
    redirect: "/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)"
  },
  {
    id: 9,
    title: 'Yêu cầu cấp lại giấy chứng nhận hiến máu',
    icon: "file",
    redirect: "/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)"
  },
    // {
    //   id: 2,
    //   title: 'Donates',
    //   image: require('../../../assets/images/openmoji_blood-transfusion.png'),
    // },
    // {
    //   id: 3,
    //   title: 'Order',
    //   image: require('../../../assets/images/si-glyph_blood-bag.png'),
    // },
    // {
    //   id: 4,
    //   title: 'Assistant',
    //   image: require('../../../assets/images/maki_doctor-11.png'),
    // },
    // {
    //   id: 5,
    //   title: 'Report',
    //   image: require('../../../assets/images/la_file-medical-alt.png'),
    // },
    // {
    //   id: 6,
    //   title: 'Campains',
    //   image: require('../../../assets/images/grommet-icons_announce.png'),
    // },
  ]