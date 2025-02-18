import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Alert, ToastAndroid, TouchableOpacity, Platform  } from "react-native";
import { Button, Headline, Subheading } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getProfile } from '@/storage';
import { getAllByThongTinCaNhanNguoiHienMauId, capNhatGiayChungNhanHienMau } from '@/api';
import { router } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import * as DocumentPicker from "expo-document-picker";

const TaoYeuCauCapNhatHienMauScreen = () => {
    const [ngayCap, setNgayCap] = useState("");
    const [diaDiem, setDiaDiem] = useState("");
    const [trangThai, setTrangThai] = useState("");
    const [hoVaTen, setHoVaTen] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

    const getDataByThongTinCaNhanNguoiHienMauId = async () => {
        try {
            setIsLoading(true);
            const profile = await getProfile();

            if (!profile) {
                console.error("Profile is null or undefined");
                return;
            }

            const response = await getAllByThongTinCaNhanNguoiHienMauId(profile.id);

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data;

            if (res.isSuccessed == false) {
                throw { message: res.message, res: res };
            }

            const data = res.data.data[0];

            setHoVaTen(data.hoVaTen);
            setNgayCap(data.ngayCap);
            setDiaDiem(data.diaDiem);
            setTrangThai(data!.tenTrangThaiYeuCauCapNhatGiayChungNhanHienMau);

            setData(data);
        } catch (error) {
            console.error('Lỗi:', error);
            router.replace("/(login)");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDataByThongTinCaNhanNguoiHienMauId();
    }, [])

    const handlePickFiles = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                multiple: true, // Cho phép chọn nhiều file
                type: "*/*", // Cho phép chọn tất cả các loại file
            });
    
            if (!result.canceled && result.assets) {
                setSelectedFiles(prevFiles => [...prevFiles, ...result.assets]);
            }
        } catch (error) {
            console.error("Lỗi chọn file:", error);
            Alert.alert("Lỗi", "Không thể chọn file.");
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const profile = await getProfile();
            if (!profile) throw new Error("Không tìm thấy thông tin tài khoản");

            const formData = new FormData();
            formData.append("Id", ""); // Nếu tạo mới, có thể bỏ trống
            formData.append("ThongTinCaNhanNguoiHienMauId", profile.id.toString());
            formData.append("NgayCap", ngayCap);
            formData.append("DiaDiem", diaDiem);
            formData.append("TrangThaiYeuCauCapNhatGiayChungNhanHienMauId", "1"); // Mặc định trạng thái yêu cầu

            selectedFiles.forEach((file, index) => {
                formData.append(`files`, {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType || "application/octet-stream",
                } as any);
            });

            const response = await capNhatGiayChungNhanHienMau(formData);

            if (!response.data.isSuccessed) {
                throw new Error("Có lỗi xảy ra khi gửi yêu cầu");
            }

            router.push("./");
            ToastAndroid.show("Yêu cầu cập nhật đã được gửi!", ToastAndroid.SHORT);
        } catch (error) {
            console.error("Lỗi gửi yêu cầu:", error);
            ToastAndroid.show("Không thể gửi yêu cầu.", ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <View style={{ padding: 20 }}>
            {/* <Text>Họ và tên:</Text>
            <TextInput value={hoVaTen} onChangeText={setHoVaTen} placeholder="Nhập họ và tên" style={{ borderBottomWidth: 1, marginBottom: 10 }} /> */}

            <Text>Ngày cấp:</Text>
            <TextInput onChangeText={setNgayCap} placeholder="Nhập ngày cấp" style={{ borderBottomWidth: 1, marginBottom: 10 }} />

            <Text>Địa điểm:</Text>
            <TextInput onChangeText={setDiaDiem} placeholder="Nhập địa điểm" style={{ borderBottomWidth: 1, marginBottom: 10 }} />

            <TouchableOpacity onPress={handlePickFiles} style={styles.buttonUpload}>
                <Text style={styles.buttonUploadText}>Chọn file</Text>
            </TouchableOpacity>

            {selectedFiles.length > 0 && (
                <View>
                    <Text>Các file đã chọn:</Text>
                    {selectedFiles.map((file, index) => (
                        <Text key={index}>{file.name}</Text>
                    ))}
                </View>
            )}

            <Button style={styles.buttonSubmit} labelStyle={styles.buttonSubmitLabel} onPress={handleSubmit}>Gửi yêu cầu</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.WHITE },
    header: { backgroundColor: COLORS.PRIMARY, padding: 20, alignItems: 'center' },
    headerTitle: { fontSize: 18, color: COLORS.WHITE, fontWeight: 'bold' },
    cameraIcon: { position: 'absolute', bottom: 0, right: 120, backgroundColor: COLORS.PRIMARY, padding: 5, borderRadius: 20 },
    sectionHeader: {
        padding: 10,
        backgroundColor: COLORS.LITE_GRAY
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.LITE_GRAY
    },
    settingText: {
        marginLeft: 10,
        fontSize: 14
    },


    card: {
        backgroundColor: COLORS.WHITE,
        padding: 10,
        marginBottom: 10
    },
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSubmit: {
        marginTop: 15,
        backgroundColor: COLORS.PRIMARY,
    },
    buttonSubmitLabel: {
        color: COLORS.WHITE
    },

    buttonUpload: {
        backgroundColor: COLORS.PRIMARY,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonUploadText: {
        color: COLORS.WHITE,
        fontWeight: "bold",
    },
});

export default TaoYeuCauCapNhatHienMauScreen;
