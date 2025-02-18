import React, { useState, useEffect } from 'react';
import {StyleSheet, Image, View, Text, Dimensions} from 'react-native';
import {getProfile} from '@/storage';
import QRCode from 'react-native-qrcode-svg';

// Lấy kích thước màn hình
const { width, height } = Dimensions.get('window');

export default function QRCodeScreen() {
    const [profile, setProfile] = useState(null);

    const loadProfile = async () => {
        const profile = await getProfile();
        console.log("profile: " + JSON.stringify(profile));
        setProfile(profile);
    }
    useEffect(() => {
         loadProfile();        
    }, []);
    
    if (profile) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>MÃ QR</Text>
                <QRCode 
                    value={profile.id.toString()}  // Giá trị để mã hóa
                    size={width * 0.9}                   // Kích thước QR
                    color="black"                // Màu mã QR
                    backgroundColor="white"      // Màu nền
                />
      </View>
        )
    }
    
    return <Text>Không tìm thấy</Text>;    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    }
})