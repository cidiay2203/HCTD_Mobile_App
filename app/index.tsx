import { ThemedView } from "../components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {getMyStringValue, setStringValue} from '../shared/AsyncStorage';
import {commonStyle} from '../shared/CommoStyle/CommonStyle';
import {FONTS} from "../constants/fonts";
import { IMAGES } from "@/constants";
import { getProfile } from "@/storage";

export default function OnBoardingScreen() {
    const onBoardingDone = async () => {
        try {
            
            await setStringValue('alreadyLaunched', 'true');
            
            const profile = await getProfile(); 
            if(profile == null){
                router.replace("/(login)");
            } else {
                router.replace("/(main)");
            }
            
        } catch (err) {
            console.warn(err);
        }
    };

    const loadData = async () => {
        try {
          const value = await getMyStringValue('alreadyLaunched');
            
          if (value === 'true') {

            const profile = await getProfile(); 
            
            if(profile == null){
                router.replace("/(login)");
            } else {
                router.replace("/(main)");
            }
          }
        } catch (err) {
          console.warn(err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <SafeAreaProvider>
            <ThemedView style={styles.container}>
                <SafeAreaView style={styles.innerContainer}>
                    <StatusBar backgroundColor="white" barStyle="dark-content" />
                    <View style={styles.main}>
                        <Onboarding
                            skipLabel={<Text style={commonStyle({fontSize: 16}).text}>Bỏ qua</Text>}
                            nextLabel={<Text style={commonStyle({fontSize: 16}).text}>Tiếp theo</Text>}
                            pages={Array}
                            onSkip={() => onBoardingDone()}
                            onDone={() => onBoardingDone()}
                            DotComponent={({selected}) => {
                                let backgroundColor = selected ? "#ff2156": "#808080";
                            
                                return (
                                    <View
                                        style={{
                                            height: 5,
                                            width: 5,
                                            marginHorizontal: 3,
                                            backgroundColor
                                        }}
                                    />
                                )
                            }}
                            bottomBarColor="#ffffff"
                            titleStyles={
                                commonStyle({fontSize: 25, fontFamily: FONTS.POPPINS_MEDIUM}).text
                            }
                            subTitleStyles={
                                commonStyle({fontSize: 16}).text
                            }
                        />
                    </View>
                </SafeAreaView>
            </ThemedView>
        </SafeAreaProvider>
    );
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
    main: {
        width: '100%',
        height: '100%',
    }
});

const Array = [
    {
        backgroundColor: '#fff',
        image: <Image source={IMAGES.onboarding1} />,
        title: 'Chào bạn!',
        subtitle: 'Cảm ơn bạn đã tham gia cùng chúng tôi! Hãy bắt đầu hành trình hiến máu và cứu người ngay hôm nay',
    },
    {
        backgroundColor: '#fff',
        image: <Image source={IMAGES.onboarding2} />,
        title: 'Đăng ký hiến máu',
        subtitle: 'Đăng ký hiến máu nhanh chóng và dễ dàng. Hành động nhỏ của bạn sẽ tạo ra sự thay đổi lớn cho cộng đồng.',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={IMAGES.onboarding3} />,
      title: 'Thông tin cá nhân',
      subtitle: 'Xem và chỉnh sửa thông tin cá nhân để đảm bảo hồ sơ của bạn luôn được cập nhật.',
    },    
    {
        backgroundColor: '#fff',
        image: <Image source={IMAGES.onboarding4} />,
        title: 'Dễ sử dụng',
        subtitle: 'Chúng tôi làm mọi thứ thật đơn giản',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={IMAGES.onboarding5} />,
        title: 'Bắt đầu thôi!',
        subtitle: 'Bắt đầu trải nghiệm ứng dụng ngay bây giờ!',
      },
];
