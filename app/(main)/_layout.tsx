import React from 'react';
import {StyleSheet, Text, View, Image, Pressable, Platform, TouchableOpacity} from 'react-native';
import { router, Tabs, usePathname } from "expo-router";
import { COLORS, FONTS, IMAGES } from "@/constants";
import {Icon, Badge} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { commonJustify } from '@/shared/CommoStyle/CommonJustify';
import { commonStyle } from '@/shared/CommoStyle/CommonStyle';

export default function MainLayout() {
      
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      /> */}
      <Tabs.Screen
        name="(home)"
        options={{
          title: "",
          tabBarIcon: ({color, size}) => (
            <Feather name="home" size={24} color={color} />
          ),
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Text style={[commonStyle({fontSize: 16}).text, {marginLeft: 10, fontWeight: 'bold'}]}>HỘI CHỮ THẬP ĐỎ TỈNH KH</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(lich-su-hien-mau)"
        options={{
          title: "",
          tabBarIcon: ({color}) => (
            <Fontisto name="history" size={24} color={color} />
          ),
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Text style={[commonStyle({fontSize: 16}).text, {marginLeft: 10, fontWeight: 'bold'}]}>LỊCH SỬ HIẾN MÁU</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="qr-code"
        options={{
          title: "",
          tabBarIcon: ({color}) => (
            <Fontisto name="qrcode" size={24} color={color} />
          ),
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Text style={[commonStyle({fontSize: 16}).text, {marginLeft: 10, fontWeight: 'bold'}]}>QR CODE</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(khen-thuong)"
        options={{
          title: "",
          tabBarIcon: ({color}) => (
            <Feather name="award" size={24} color={color} />
          ),          
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Text style={[commonStyle({fontSize: 16}).text, {marginLeft: 10, fontWeight: 'bold'}]}>KHEN THƯỞNG</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "",
          tabBarIcon: ({color}) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          headerLeft: () => (
            <View style={commonJustify.rowSpaceEvenly}>
              <Text style={[commonStyle({fontSize: 16}).text, {marginLeft: 10, fontWeight: 'bold'}]}>HỒ SƠ</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/(main)/(profile)/cap-nhat-profile")} style={{marginHorizontal:5}}>
              <Feather name="edit" size={25} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}