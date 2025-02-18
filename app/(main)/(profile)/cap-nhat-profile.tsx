import React, { useState, useEffect } from 'react';
import { ThemedView } from "@/components/ThemedView";
import {
  StatusBar, 
  StyleSheet, 
  Alert, 
  View, 
  Image, 
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {commonJustify} from '@/shared/CommoStyle/CommonJustify';
import {COLORS, FONTS} from '@/constants';
import { router } from "expo-router";
import { useForm, Controller } from 'react-hook-form';
import { 
  getThongTinCaNhanNguoiHienMauById, 
  capNhatThongTinCaNhanNguoiHienMauById,
  getAllGioiTinhs,
  getAllTinhs,
  getAllNgheNghieps,
  getAllNganHangs
} from '@/api';
import { IMAGES } from '@/constants';
import { globalThemes } from '@/shared/styles';
import {Button, HelperText, TextInput, Provider as PaperProvider, Headline} from "react-native-paper";
import CustomDropdownList from '@/components/CustomDropdownList';
import {getProfile} from '@/storage';

type UpdateFormData = {
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

export default function UpdateProfileScreen() {  
  const [isLoading, setIsLoading] = useState(false);
  const [gioiTinhs, setGioiTinhs] = useState([]);
  const [tinhs, setTinhs] = useState([]);
  const [ngheNghieps, setNgheNghieps] = useState([]);
  const [nganHangs, setNganHangs] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateFormData>({
    defaultValues: {
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

  const getThongTinCaNhanNguoiHienMau = async () => {    
    try {
        setIsLoading(true); // Bật trạng thái loading
        const profile = await getProfile(); 
        const response = await getThongTinCaNhanNguoiHienMauById(profile.id);
        if (response.status != 200) {
          throw { responseStatus: response.status };
        }
  
        const res = response.data;
  
        if(res.isSuccessed == false ){
          throw { message: res.message, res: res };
        }

        const thongTinCaNhanNguoiHienMau = res.data;
        
        setValue('hoVaTen', thongTinCaNhanNguoiHienMau.hoVaTen);
        setValue('ngaySinh', thongTinCaNhanNguoiHienMau.ngaySinh);
        setValue('soChungMinhNhanDan', thongTinCaNhanNguoiHienMau.CMND);
        setValue('noiCapCMNDId', thongTinCaNhanNguoiHienMau.noiCapCMNDId);
        setValue('gioiTinhId', thongTinCaNhanNguoiHienMau.gioiTinhId);
        setValue('dienThoaiDiDong', thongTinCaNhanNguoiHienMau.dienThoaiDiDong);
        setValue('email', thongTinCaNhanNguoiHienMau.email);
        setValue('coQuanTruongLop', thongTinCaNhanNguoiHienMau.coQuanTruongLop);
        setValue('diaChiThuongTru', thongTinCaNhanNguoiHienMau.diaChiThuongTru);
        setValue('diaChiLienLac', thongTinCaNhanNguoiHienMau.diaChiLienLac);
        setValue('ngheNghiepId', thongTinCaNhanNguoiHienMau.ngheNghiepId);
        setValue('nganHangId', thongTinCaNhanNguoiHienMau.nganHangId);
        setValue('soTaiKhoanNganHang', thongTinCaNhanNguoiHienMau.soTaiKhoanNganHang);
        setValue('tenChuTaiKhoanNganHang', thongTinCaNhanNguoiHienMau.tenChuTaiKhoanNganHang);

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
    getThongTinCaNhanNguoiHienMau();
  }, [])

  const onSubmit = async (data: UpdateFormData) => {
    try {
      console.log("running...");
      setIsLoading(true); // Bật trạng thái loading
      const profile = await getProfile(); 
      const response = await capNhatThongTinCaNhanNguoiHienMauById(
        profile.id,
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
      console.log("res: " + JSON.stringify(res));     
      if(res.isSuccessed == false ){
          Alert.alert("Thông báo", res.message)
      } else {
        Alert.alert("Thông báo", "Cập nhật hồ sơ thành công")
      }
  
    } catch (error) {
        console.error('Lỗi:', error);
        router.replace("/(login)");
    } finally {
        setIsLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <SafeAreaProvider>
      <ThemedView style={styles.container}>
        <PaperProvider>
          <SafeAreaView style={styles.innerContainer}>
            <ScrollView style={styles.container}>
              <View style={styles.main}>
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
                            label="Họ và tên" 
                            mode="flat"
                          />
                        }
                        name="hoVaTen"
                    />

                      {errors.hoVaTen && <HelperText padding="none" type="error" visible={true}>
                        Họ và tên là bắt buộc
                    </HelperText>}
                  </View>
                  <View style={styles.inputWrapper}>
                    <CustomDropdownList
                      control={control}
                      name="gioiTinhId"
                      label="Giới tính"
                      items={gioiTinhs}
                      textInputStyle={styles.input} 
                      errorMessage={errors.gioiTinhId?.message}
                    />
                  </View>
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
                            label="Ngày sinh" 
                            mode="flat"
                          />
                        }
                        name="ngaySinh"
                      />
                      {errors.ngaySinh && <HelperText padding="none" type="error" visible={true}>
                        Ngày sinh là bắt buộc
                    </HelperText>}
                  </View>      
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
                            label="CCCD/CMND" 
                            mode="flat"
                          />
                        }
                        name="soChungMinhNhanDan"
                      />
                      {errors.soChungMinhNhanDan && <HelperText padding="none" type="error" visible={true}>
                        CCCD/CMND là bắt buộc
                    </HelperText>}
                  </View>
                  <View style={styles.inputWrapper}>
                    <CustomDropdownList
                      control={control}
                      name="noiCapCMNDId"
                      label="Nơi cấp"
                      items={tinhs}
                      textInputStyle={styles.input} 
                      errorMessage={errors.noiCapCMNDId?.message}
                    />
                  </View>               
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
                            label="Điện thoại" 
                            mode="flat"
                          />
                        }
                        name="dienThoaiDiDong"
                      />
                      {errors.dienThoaiDiDong && <HelperText padding="none" type="error" visible={true}>
                        Số điện thoại là bắt buộc
                    </HelperText>}
                  </View>                
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
                  <View style={styles.inputWrapper}>
                    <Controller                      
                      control={control}
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
                      control={control}
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
                      control={control}
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
                      control={control}
                      name="ngheNghiepId"
                      label="Nghề nghiệp"
                      items={ngheNghieps}
                      textInputStyle={styles.input} 
                      errorMessage={errors.ngheNghiepId?.message}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <CustomDropdownList
                      control={control}
                      name="nganHangId"
                      label="Ngân hàng"
                      items={nganHangs}
                      textInputStyle={styles.input} 
                      errorMessage={errors.nganHangId?.message}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Controller                      
                      control={control}
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
                      control={control}
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
            </ScrollView>
            <View style={[styles.buttonWrapper, styles.buttonWrapper]}>
              <Button 
                onPress={handleSubmit(onSubmit)} 
                loading={isLoading} 
                labelStyle={styles.buttonText}
                style={styles.button} 
                mode="contained"
              >
                  {isLoading ? 'đang thực hiện...' : 'CẬP NHẬT'}
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
    marginBottom: 10,
    padding: 10,
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

