import React, { useState, useEffect } from 'react';
import { ThemedView } from "@/components/ThemedView";
import {
  StatusBar, 
  StyleSheet, 
  Alert, 
  View, 
  Image, 
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {commonJustify} from '../../shared/CommoStyle/CommonJustify';
import {COLORS, FONTS} from '@/constants';
import { router } from "expo-router";
import { useForm, Controller } from 'react-hook-form';
import { 
  register, 
  resendOTPRegister, 
  verifyOTPRegister, 
  getAllGioiTinhs,
  getAllTinhs,
  getAllNgheNghieps,
  getAllNganHangs
} from '@/api';
import { IMAGES } from '@/constants';
import { globalThemes } from '@/shared/styles';
import {Button, HelperText, TextInput, Provider as PaperProvider, Surface} from "react-native-paper";
import OTPVerificationModal from "@/components/OTPVerificationModal";
import CustomDropdownList from '@/components/CustomDropdownList';

type SignUpFormData = {
  username: string;
  matKhau: string;
  hoVaTen: string;
  gioiTinhId: string;
  ngaySinh: string;
  soChungMinhNhanDan: string;
  noiCapCMNDId: string;
  dienThoaiDiDong: string;
  email: string;
  coQuanTruongLop: string;
  diaChiThuongTru: string;
  diaChiLienLac: string;
  ngheNghiepId: string;
  nganHangId: string;
  soTaiKhoanNganHang: string;
  tenChuTaiKhoanNganHang: string  
};

export default function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [thongTinCaNhanNguoiHienMauId, setThongTinCaNhanNguoiHienMauId] = useState(null);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otpModalLoadingOverlayMessage, setOtpModalLoadingOverlayMessage] = useState('');
  const [gioiTinhs, setGioiTinhs] = useState([]);
  const [tinhs, setTinhs] = useState([]);
  const [ngheNghieps, setNgheNghieps] = useState([]);
  const [nganHangs, setNganHangs] = useState([]);
  
  const loadGioiTinhData = async () => {
    try {
      const response = await getAllGioiTinhs();
      
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

      if(res.data){
        const gioiTinhs = res.data.map((item: any) => ({ label: item.ten, value: item.id }));
        setGioiTinhs(gioiTinhs);
      }          
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    }    
  }
  const loadTinhData = async () => {
    try {
      const response = await getAllTinhs();
      
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

      if(res.data){
        const tinhs = res.data.map((item: any) => ({ label: item.ten, value: item.id }));
        setTinhs(tinhs);
      }          
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    }    
  }
  const loadNgheNghiepData = async () => {
    try {
      const response = await getAllNgheNghieps();
      
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

      if(res.data){
        const ngheNghieps = res.data.map((item: any) => ({ label: item.ten, value: item.id }));
        setNgheNghieps(ngheNghieps);
      }          
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    }    
  }
  const loadNganHangData = async () => {
    try {
      const response = await getAllNganHangs();
      
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

      if(res.data){
        const nganHangs = res.data.map((item: any) => ({ label: item.ten, value: item.id }));
        setNganHangs(nganHangs);
      }          
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    }    
  }
  const handleResendOTP = async () => {
    try {
      if(!thongTinCaNhanNguoiHienMauId){
        throw { message: "Không tìm thấy Id của thông tin cá nhân người hiến máu" };
      }

      setOtpModalLoadingOverlayMessage("Đang gửi OTP");

      const response = await resendOTPRegister(thongTinCaNhanNguoiHienMauId);
      
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

      const response = await verifyOTPRegister(thongTinCaNhanNguoiHienMauId, otp);
      
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

  const {
    control: dangKyControl,
    handleSubmit: handleDangKySubmit,
    reset: resetDangKyForm,
    formState: { errors: dangKyErrors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      username: '',
      matKhau: '',
      hoVaTen: '',
      ngaySinh: '',
      soChungMinhNhanDan: '',
      noiCapCMNDId: '',
      gioiTinhId: '',
      dienThoaiDiDong: '',
      email: '',
      coQuanTruongLop: '',
      diaChiThuongTru: '',
      diaChiLienLac: '',
      ngheNghiepId: '',
      nganHangId: '',
      soTaiKhoanNganHang: '',
      tenChuTaiKhoanNganHang: ''
    }
  });
  
  const onSubmitDangKy = async (data: SignUpFormData) => {    
    try {
        setIsLoading(true); // Bật trạng thái loading
        const response = await register(
          data.username,
          data.matKhau,
          data.hoVaTen,
          data.ngaySinh, 
          data.soChungMinhNhanDan,
          data.noiCapCMNDId,
          data.gioiTinhId,
          data.dienThoaiDiDong,
          data.email,
          data.coQuanTruongLop,
          data.diaChiThuongTru,
          data.diaChiLienLac,
          data.ngheNghiepId, 
          data.nganHangId, 
          data.soTaiKhoanNganHang,
          data.tenChuTaiKhoanNganHang
        );
        
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
  }

  useEffect(() => {
    loadGioiTinhData();
    loadTinhData();
    loadNgheNghiepData();
    loadNganHangData();
  }, []);

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
                      rules={{
                        required: true,
                      }}
                      control={dangKyControl}
                      render={({field: {onChange, onBlur, value}, fieldState: { error }}) => <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          autoCapitalize="characters"
                          theme={globalThemes.colorsPrimary}
                          selectionColor="red"
                          style={styles.input} 
                          label="Tên đăng nhập" 
                          autoCorrect={false} 
                          mode="flat"
                        />
                      }
                      name="username"
                    />
                    {dangKyErrors.username && <HelperText padding={"none"} type="error" visible={true}>
                      Tên đăng nhập là bắt buộc
                    </HelperText>}
                  </View>
                  <View style={styles.inputWrapper}>
                    <Controller
                        control={dangKyControl}
                        rules={{
                          required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            theme={globalThemes.colorsPrimary}
                            style={styles.input}
                            label="Mật khẩu" 
                            secureTextEntry={true}
                            autoCorrect={false} 
                            mode="flat"
                          />
                        }
                        name="matKhau"
                      />

                    {dangKyErrors.matKhau && <HelperText padding="none" type="error" visible={true}>
                        Mật khẩu là bắt buộc
                    </HelperText>}
                  </View>
                  <View style={styles.inputWrapper}>
                    <Controller
                        control={dangKyControl}
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
                            label="Họ và tên" 
                            mode="flat"
                          />
                        }
                        name="hoVaTen"
                    />

                      {dangKyErrors.hoVaTen && <HelperText padding="none" type="error" visible={true}>
                        Họ và tên là bắt buộc
                    </HelperText>}
                  </View>
                  <View style={styles.inputWrapper}>
                    <CustomDropdownList
                      control={dangKyControl}
                      name="gioiTinhId"
                      label="Chọn giới tính"
                      items={gioiTinhs}
                      textInputStyle={styles.input} 
                      errorMessage={dangKyErrors.gioiTinhId?.message}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Controller                      
                        control={dangKyControl}
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
                            label="Ngày sinh" 
                            mode="flat"
                          />
                        }
                        name="ngaySinh"
                      />
                      {dangKyErrors.ngaySinh && <HelperText padding="none" type="error" visible={true}>
                        Ngày sinh là bắt buộc
                    </HelperText>}
                  </View>      
                <View style={styles.inputWrapper}>
                  <Controller                        
                      control={dangKyControl}
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
                          label="CCCD/CMND" 
                          mode="flat"
                        />
                      }
                      name="soChungMinhNhanDan"
                    />
                    {dangKyErrors.soChungMinhNhanDan && <HelperText padding="none" type="error" visible={true}>
                      CCCD/CMND là bắt buộc
                  </HelperText>}
                </View>
                <View style={styles.inputWrapper}>
                    <CustomDropdownList
                    control={dangKyControl}
                    name="noiCapCMNDId"
                    label="Chọn nơi cấp"
                    items={tinhs}
                    textInputStyle={styles.input} 
                    errorMessage={dangKyErrors.noiCapCMNDId?.message}
                  />
                </View>               
                <View style={styles.inputWrapper}>
                  <Controller
                      control={dangKyControl}
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
                          label="Điện thoại" 
                          mode="flat"
                        />
                      }
                      name="dienThoaiDiDong"
                    />
                    {dangKyErrors.dienThoaiDiDong && <HelperText padding="none" type="error" visible={true}>
                      Số điện thoại là bắt buộc
                  </HelperText>}
                </View>                
                <View style={styles.inputWrapper}>
                  <Controller                      
                    control={dangKyControl}
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
                  {dangKyErrors.email && <HelperText padding="none" type="error" visible={true}>
                      Email là bắt buộc
                  </HelperText>}
                </View>              
                <View style={styles.inputWrapper}>
                  <Controller                      
                    control={dangKyControl}
                    render={({field: {onChange, onBlur, value}}) => <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        theme={globalThemes.colorsPrimary}
                        selectionColor="red"
                        style={styles.input} 
                        label="Cơ quan trường lớp" 
                        mode="flat"
                      />
                    }
                    name="coQuanTruongLop"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Controller                      
                    control={dangKyControl}
                    render={({field: {onChange, onBlur, value}}) => <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        theme={globalThemes.colorsPrimary}
                        selectionColor="red"
                        style={styles.input} 
                        label="Địa chỉ thường trú" 
                        mode="flat"
                      />
                    }
                    name="diaChiThuongTru"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Controller                      
                    control={dangKyControl}
                    render={({field: {onChange, onBlur, value}}) => <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        theme={globalThemes.colorsPrimary}
                        selectionColor="red"
                        style={styles.input} 
                        label="Địa chỉ liên lạc" 
                        mode="flat"
                      />
                    }
                    name="diaChiLienLac"
                  />
                </View>
                <View style={styles.inputWrapper}>
                    <CustomDropdownList
                    control={dangKyControl}
                    name="ngheNghiepId"
                    label="Chọn nghề nghiệp"
                    items={ngheNghieps}
                    textInputStyle={styles.input} 
                    errorMessage={dangKyErrors.ngheNghiepId?.message}
                  />
                </View>
                <View style={styles.inputWrapper}>
                    <CustomDropdownList
                    control={dangKyControl}
                    name="nganHangId"
                    label="Chọn ngân hàng"
                    items={nganHangs}
                    textInputStyle={styles.input} 
                    errorMessage={dangKyErrors.nganHangId?.message}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Controller                      
                    control={dangKyControl}
                    render={({field: {onChange, onBlur, value}}) => <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        theme={globalThemes.colorsPrimary}
                        selectionColor="red"
                        style={styles.input} 
                        label="Số tài khoản ngân hàng" 
                        mode="flat"
                      />
                    }
                    name="soTaiKhoanNganHang"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Controller                      
                    control={dangKyControl}
                    render={({field: {onChange, onBlur, value}}) => <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        theme={globalThemes.colorsPrimary}
                        selectionColor="red"
                        style={styles.input} 
                        label="Tên chủ tài khoản ngân hàng" 
                        mode="flat"
                      />
                    }
                    name="tenChuTaiKhoanNganHang"
                  />
                </View>
              </View>
            </View>
              <PaperProvider>
                <OTPVerificationModal
                  visible={otpModalVisible}
                  loadingOverlayMessage={otpModalLoadingOverlayMessage}
                  onClose={() => setOtpModalVisible(false)}
                  onResend={handleResendOTP}
                  onVerify={handleVerifyOTP}
                />
              </PaperProvider>
            </ScrollView>
            <View style={[styles.buttonWrapper, styles.buttonDangKyWrapper]}>
              <Button 
                onPress={handleDangKySubmit(onSubmitDangKy)} 
                loading={isLoading} 
                labelStyle={styles.buttonText}
                style={styles.button} 
                mode="contained"
              >
                  {isLoading ? 'đang thực hiện...' : 'ĐĂNG KÝ'}
              </Button>
            </View>
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
    width: 100,
    height: 100,
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

