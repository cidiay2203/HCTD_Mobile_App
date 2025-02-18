import React, { useState, useEffect } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from 'react-hook-form';
import {Button, HelperText, TextInput, Provider as PaperProvider, Surface} from "react-native-paper";
import { quenMatKhau, resendOTPQuenMatKhau, verifyOTPQuenMatKhau} from '@/api';
import {
  StatusBar, 
  StyleSheet, 
  Alert, 
  View, 
  Image, 
  ScrollView,
} from 'react-native';
import OTPVerificationModal from "@/components/OTPVerificationModal";
import { router } from "expo-router";
import {commonJustify} from '../../shared/CommoStyle/CommonJustify';
import { IMAGES } from '@/constants';
import { globalThemes } from '@/shared/styles';
import {COLORS, FONTS} from '@/constants';

type FormData = {
  email: string;
};

export default function QuenMatKhauScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [thongTinCaNhanNguoiHienMauId, setThongTinCaNhanNguoiHienMauId] = useState(null);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otpModalLoadingOverlayMessage, setOtpModalLoadingOverlayMessage] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: FormData) => {

    try {
      setIsLoading(true); // Bật trạng thái loading
      const response = await quenMatKhau(data.email);
      
      if (response.status != 200) {
          throw { responseStatus: response.status };
      }

      const res = response.data;         
      if(res.isSuccessed == false ){
          Alert.alert("Thông báo", res.message)
      } else if(!res.data){
        throw { message: "Không tìm thấy data trả về" };
      } else{
        if(!res.data.thongTinCaNhanNguoiHienMauId){
          throw { message: "Hệ thống không trả về Id của thông tin cá nhân người hiến máu" };
        }

        if(res.data && res.data.thongTinCaNhanNguoiHienMauId){
          setThongTinCaNhanNguoiHienMauId(res.data.thongTinCaNhanNguoiHienMauId);
          setOtpModalVisible(true);
        }
      }
  
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    } finally {
        setIsLoading(false); // Tắt trạng thái loading
    }
  };

  const handleResendOTP = async () => {
    try {
      if(!thongTinCaNhanNguoiHienMauId){
        throw { message: "Không tìm thấy Id của thông tin cá nhân người hiến máu" };
      }

      setOtpModalLoadingOverlayMessage("Đang gửi OTP");

      const response = await resendOTPQuenMatKhau(thongTinCaNhanNguoiHienMauId);
      
      if (response.status != 200) {
          throw { responseStatus: response.status };
      }

      const res = response.data;         
      if(res.isSuccessed == false ){
          throw { message: res.message, res: res };
      }

      if(!res.data){
        throw { message: "Không tìm thấy data trả về" };
      }

      if(res.data && res.data.thongTinCaNhanNguoiHienMauId){
        Alert.alert('Thông báo', 'Mã OTP mới đã được gửi đến email của bạn!');
      }          
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    }    
  };
  const handleVerifyOTP =  async(otp: string) => {
    try {
      if(!thongTinCaNhanNguoiHienMauId){
        throw { message: "Hệ thống không trả về Id của thông tin cá nhân người hiến máu" };
      }
      setOtpModalLoadingOverlayMessage("Đang xác thực");

      const response = await verifyOTPQuenMatKhau(thongTinCaNhanNguoiHienMauId, otp);
      
      if (response.status != 200) {
          throw { responseStatus: response.status };
      }

      const res = response.data;         
      if(res.isSuccessed == false ){
        Alert.alert('Lỗi', 'Mã OTP không hợp lệ. Vui lòng thử lại!');
      }

      if(!res.data){
        throw { message: "Không tìm thấy data trả về" };
      }

      if(res.data && res.data.thongTinCaNhanNguoiHienMauId){
        Alert.alert('Xác thực thành công!', 'Bạn vui lòng kiểm tra email để biết Thông tin đăng nhập hệ thống.');
        setOtpModalVisible(false);
        router.replace("/(login)");
      }          
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    }
  };

  return (
    <SafeAreaProvider>
      <ThemedView style={styles.container}>
        <PaperProvider>
          <SafeAreaView style={styles.innerContainer}>
            <ScrollView>
              <StatusBar backgroundColor="white" />
              <View style={styles.main}>
                <View style={[commonJustify.rowCenter, styles.imageWrapper]}>
                  <Image
                    style={[styles.image]}
                    source={IMAGES.logo}
                  />
                </View>
                <View>       
                  <View style={styles.inputWrapper}>
                    <Controller                      
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field: {onChange, onBlur, value}}) => <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          theme={globalThemes.colorsPrimary}
                          selectionColor="red"
                          style={styles.input} 
                          label="Email" 
                          mode="flat"
                        />
                      }
                      name="email"
                    />
                    {errors.email && <HelperText padding="none" type="error" visible={true}>
                        Email là bắt buộc
                    </HelperText>}
                  </View>
                  <View style={[styles.buttonWrapper, styles.buttonDangKyWrapper]}>
                    <Button 
                      onPress={handleSubmit(onSubmit)} 
                      loading={isLoading} 
                      labelStyle={styles.buttonText}
                      style={styles.button} 
                      mode="contained"
                    >
                        {isLoading ? 'đang thực hiện...' : 'GỬI OTP'}
                    </Button>
                  </View>
                </View>
              </View>
              <OTPVerificationModal
                visible={otpModalVisible}
                loadingOverlayMessage={otpModalLoadingOverlayMessage}
                onClose={() => setOtpModalVisible(false)}
                onResend={handleResendOTP}
                onVerify={handleVerifyOTP}
              />
            </ScrollView>
          </SafeAreaView>
        </PaperProvider>          
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
  },
  main: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 10
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  buttonWrapper:{
    marginBottom: 10
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    marginTop: 6,
    borderRadius: 999,
    paddingVertical: 4,
    fontSize: 20
  },    
  buttonText: {
    fontSize: 16,
  },
  buttonDangKyWrapper: {
    padding: 10,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent'
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});