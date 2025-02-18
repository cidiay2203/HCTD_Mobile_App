import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, ToastAndroid, TouchableOpacity, Platform, ScrollView } from "react-native";
import { getProfile } from '@/storage';
import { getAllYeuCauCapLaiByThongTinCaNhanNguoiHienMauId, capNhatYeuCauCapLaiGiayChungNhanHienMau, getAllDonVis } from '@/api';
import { router } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import CustomDropdownList from '@/components/CustomDropdownList';
import { Button, HelperText, TextInput, Provider as PaperProvider, Headline } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { globalThemes } from '@/shared/styles';

const TaoYeuCauCapLaiHienMauScreen = () => {
    const [donVis, setDonVis] = useState([]);
    const [hoVaTen, setHoVaTen] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    type UpdateFormData = {
        ngayCap: string;
        diaDiem: string;
        donViId: string;
        thongTinCaNhanNguoiHienMauId: string;
    };

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UpdateFormData>({
        defaultValues: {
            ngayCap: '',
            diaDiem: '',
            donViId: '',
            thongTinCaNhanNguoiHienMauId: '',
        }
    });

    const loadDonViData = async () => {
        try {
            const response = await getAllDonVis();

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data;
            if (res.isSuccessed == false) {
                throw { message: res.message, res: res };
            }

            if (!res.data) {
                throw { message: "Không tìm thấy data trả về" };
            }

            if (res.data) {
                const donVis = res.data.map((item: any) => ({ label: item.ten, value: item.id }));
                setDonVis(donVis);
            }
        } catch (error) {
            console.error('Lỗi:', error);
            router.replace("/(login)");
        }
    }

    const getDataByThongTinCaNhanNguoiHienMauId = async () => {
        try {
            setIsLoading(true);
            const profile = await getProfile();

            if (!profile) {
                console.error("Profile is null or undefined");
                return;
            }

            const response = await getAllYeuCauCapLaiByThongTinCaNhanNguoiHienMauId(profile.id);

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data;

            if (res.isSuccessed == false) {
                throw { message: res.message, res: res };
            }

            const data = res.data.data[0];

            setHoVaTen(data.hoVaTen);

            setData(data);
        } catch (error) {
            console.error('Lỗi:', error);
            router.replace("/(login)");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadDonViData();
        getDataByThongTinCaNhanNguoiHienMauId();
    }, [])

    const onSubmit = async (data: UpdateFormData) => {
        try {
            setIsLoading(true);
            const profile = await getProfile();
            if (!profile) throw new Error("Không tìm thấy thông tin tài khoản");

            const response = await capNhatYeuCauCapLaiGiayChungNhanHienMau(
                data.ngayCap, 
                data.diaDiem, 
                data.donViId, 
                profile.id.toString()
            );

            if (!response.data.isSuccessed) {
                throw new Error("Có lỗi xảy ra khi gửi yêu cầu");
            }
            router.push("./");
            ToastAndroid.show("Yêu cầu cấp lại đã được gửi!", ToastAndroid.SHORT);
        } catch (error) {
            console.error("Lỗi gửi yêu cầu:", error);
            ToastAndroid.show("Không thể gửi yêu cầu.", ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
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
                                            render={({ field: { onChange, onBlur, value } }) => <TextInput
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                theme={globalThemes.colorsPrimary}
                                                selectionColor="red"
                                                style={styles.input}
                                                label="Ngày cấp"
                                                mode="flat"
                                            />
                                            }
                                            name="ngayCap"
                                        />
                                        {errors.ngayCap && <HelperText padding="none" type="error" visible={true}>
                                            Ngày cấp là bắt buộc
                                        </HelperText>}
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => <TextInput
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                theme={globalThemes.colorsPrimary}
                                                selectionColor="red"
                                                style={styles.input}
                                                label="Địa điểm"
                                                mode="flat"
                                            />
                                            }
                                            name="diaDiem"
                                        />
                                        {errors.diaDiem && <HelperText padding="none" type="error" visible={true}>
                                            Địa điểm là bắt buộc
                                        </HelperText>}
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <CustomDropdownList
                                            control={control}
                                            name="donViId"
                                            label="Đơn vị"
                                            items={donVis}
                                            textInputStyle={styles.input}
                                            errorMessage={errors.donViId?.message}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={[styles.buttonWrapper, styles.buttonWrapper]}>
                            <Button style={styles.buttonSubmit} labelStyle={styles.buttonSubmitLabel} onPress={handleSubmit(onSubmit)}>
                                {isLoading ? 'đang thực hiện...' : 'GỬI YÊU CẦU'}
                            </Button>

                        </View>
                    </SafeAreaView>
                </PaperProvider>
            </ThemedView>
        </SafeAreaProvider>
    );
};

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
    buttonWrapper: {
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

    buttonSubmit: {
        marginTop: 15,
        backgroundColor: COLORS.PRIMARY,
    },
    buttonSubmitLabel: {
        color: COLORS.WHITE
    },
});

export default TaoYeuCauCapLaiHienMauScreen;
