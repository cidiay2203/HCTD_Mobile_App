import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {
    KeyboardAvoidingView, 
    StyleSheet, 
    Text,
    Alert, 
    View, 
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import {commonJustify} from '../../shared/CommoStyle/CommonJustify';
import { router } from "expo-router";
import { login } from '@/api';
import { IMAGES, COLORS, FONTS } from '@/constants';
import { saveToken, saveProfile } from '@/storage';
import { useForm, Controller } from 'react-hook-form';
import {Button, HelperText, TextInput} from "react-native-paper";
import { globalStyles, globalThemes} from "@/shared/styles";
import {commonStyle} from "@/shared/CommoStyle/CommonStyle";

type LoginFormData = {
    username: string;
    password: string;
};


export default function LoginScreen() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isWrongLogin, setIsWrongLogin] = useState(false);
    
    const {control, handleSubmit, watch, formState: {errors}, getValues} = useForm<LoginFormData>({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const username = getValues('username')
    const password = getValues('password')

    useEffect(() => {
        setIsWrongLogin(false);
    }, [username, password])

    const onSubmit = async (data: LoginFormData) => {    
        try {
            setIsLoading(true); // Bật trạng thái loading
            const response = await login(data.username, data.password); // Gọi API login
            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data;      
            console.log("res: " + JSON.stringify(res));      
            if(res.isSuccessed == false ){
                setIsWrongLogin(true);
                throw { message: res.message, res: res };
            }

            const token = res.data.token;
            const profile = res.data.profile;

            await saveToken(token);
            await saveProfile(profile);

            router.replace("/(main)");
                
        } catch (error: any) {
            console.error('Lỗi:', error);
            Alert.alert('Đăng nhập thất bại', error.message);
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    }
      
    return (
        <SafeAreaView style={globalStyles.safeAreaView}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[globalStyles.contentWrapper, styles.container]}
            >
                <View style={[commonJustify.rowCenter, styles.imageWrapper]}>
                    <Image style={styles.image} source={IMAGES.logo}/>
                </View>

                <View style={styles.inputWrapper}>
                    <Controller
                        rules={{
                            required: true,
                        }}
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="characters"
                            theme={globalThemes.colorsPrimary}
                            selectionColor="red"
                            style={styles.input} 
                            label="Tên đăng nhập" 
                            autoCorrect={false} 
                            mode="flat"/>
                        }
                        name="username"
                    />
                    {errors.username && <HelperText padding={"none"} type="error" visible={true}>
                        Tên đăng nhập là bắt buộc
                    </HelperText>}
                </View>

                <View style={styles.inputWrapper}>
                    <Controller
                        rules={{
                            required: true,
                        }}
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            theme={globalThemes.colorsPrimary}
                            style={styles.input}
                            label="Mật khẩu" 
                            secureTextEntry={true}
                            autoCorrect={false} 
                            mode="flat"/>
                        }
                        name="password"
                    />
                    {errors.password && <HelperText padding="none" type="error" visible={true}>
                        Mật khẩu là bắt buộc
                    </HelperText>}
                </View>
                <Button 
                    onPress={handleSubmit(onSubmit)} 
                    loading={isLoading} 
                    labelStyle={styles.buttonText}
                    style={styles.button} 
                    mode="contained"
                >
                    {isLoading ? 'đang xác thực...' : 'ĐĂNG NHẬP'}
                </Button>

                {isWrongLogin && <HelperText style={styles.wrongLogin} padding="none" type="error" visible={true}>
                    Sai thông tin đăng nhập
                </HelperText>}
                <View style={commonJustify.rowCenter}>
                    <TouchableOpacity
                        onPress={() => router.push("/quen-mat-khau")}
                    >
                        <Text
                            style={[commonStyle({
                                    fontSize: 14,
                                }).text,
                                styles.quenMatKhauText
                            ]}
                        >
                            Quên mật khẩu ?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dangKyNgay}>
                    <View style={commonJustify.rowCenter}>
                        <Text>Bạn chưa có tài khoản ? </Text>
                        <TouchableOpacity
                            onPress={() => router.push("/sign-up")}
                        >
                            <Text
                                style={[
                                    commonStyle({
                                    fontSize: 14,
                                    }).text,
                                    styles.dangKyNgayText
                                ]}>
                                Đăng ký ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        alignItems: "center",
        height: '40%',
        marginTop: '10%',
        marginBottom: '10%'
    },
    input: {
        backgroundColor: 'transparent'
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
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
    wrongLogin: {
        marginTop: 15,
        textAlign: "center"
    },
    quenMatKhauText:{
        marginTop: 15,
        color: COLORS.PRIMARY
    },
    dangKyNgay: {
        marginTop: 20,
        position: 'absolute', 
        bottom: 40, 
        width:'100%'
    },
    dangKyNgayText:{
        fontWeight: "bold",
        color: COLORS.PRIMARY
    }
});