import React, { useState, useEffect } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { getProfile } from '@/storage';
import {
    getAllYeuCauCapLaiByThongTinCaNhanNguoiHienMauId
} from '@/api';
import ItemDetailHorizontal from '@/components/ItemDetailHorizontal';
import { COLORS } from "@/constants";
import { router } from "expo-router";
import handleError from '@/shared/errorHandler';
import { API } from '@/constants';

export default function DanhSachYeuCauCapLaiHienMauScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [danhSachYeuCauCapLaiHienMau, setDanhSachYeuCauCapLaiHienMau] = useState([]);
    const [profileId, setProfileId] = useState(Number);
    const [profileHoVaTen, setProfileHoVaTen] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

    const getDanhSachYeuCauCapLaiHienMau = async () => {
        try {
            setIsLoading(true); // Bật trạng thái loading

            const profile = await getProfile();

            if (!profile) {
                console.error("Profile is null or undefined");
                return;
            }

            setProfileId(profile.id);
            setProfileHoVaTen(profile.hoVaTen);
            const response = await getAllYeuCauCapLaiByThongTinCaNhanNguoiHienMauId(profile.id);

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data;

            if (res.isSuccessed == false) {
                throw { message: res.message, res: res };
            }

            setDanhSachYeuCauCapLaiHienMau(res.data.data.sort((a: any, b: any) => b.id - a.id));
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    }

    useEffect(() => {
        getDanhSachYeuCauCapLaiHienMau();
    }, [])

    const handleTaoYeuCau = async () => {
        router.push("/yeu-cau-cap-lai-giay-chung-nhan-hien-mau");
    }

    const handleOpenFile = (fileUrl: string) => {
        const fullUrl = `${API.BASE_URL}${fileUrl}`; // Thêm domain vào đường dẫn file
        Linking.openURL(fullUrl).catch(err => console.error("Không thể mở file:", err));
    };


    return (
        <View>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>{profileHoVaTen}</Text>
                </View>
                {danhSachYeuCauCapLaiHienMau.map((item: any) =>
                    <View key={item.id} style={styles.itemWrapper}>
                        <ItemDetailHorizontal title="Ngày cấp" value={item.ngayCap} />
                        <ItemDetailHorizontal title="Địa điểm" value={item.diaDiem} />
                        <ItemDetailHorizontal title="Đơn vị" value={item.tenDonVi} />
                        <ItemDetailHorizontal title="Trạng thái" value={item.tenTrangThaiYeuCauCapLaiGiayChungNhanHienMau} />
                    </View>)}
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <View>
                    <Button
                        mode="elevated"
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                        onPress={() => handleTaoYeuCau()}
                        loading={isLoading}
                    >
                        {isLoading ? 'đang thực hiện...' : 'TẠO YÊU CẦU'}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemWrapper: {
        marginBottom: 10,
        backgroundColor: 'white',
    },
    header: {
        padding: 10,
    },
    title: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 18
    },
    buttonWrapper: {
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        backgroundColor: COLORS.PRIMARY,
        marginTop: 10
    },
    buttonLabel: {
        color: COLORS.WHITE
    },
    fileListWrapper: {
        padding: 10,
        alignItems: 'center',  // Căn giữa theo chiều dọc
    },
    fileTitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    fileItem: {
        paddingVertical: 5,
        width: '100%',  // Đảm bảo mỗi file chiếm toàn bộ chiều ngang để xuống dòng
        alignItems: 'center',  // Căn giữa nội dung trong mỗi file
    },
    fileName: {
        color: "blue",
        textDecorationLine: "underline",
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', // Để file tự động xuống dòng khi quá dài
        marginTop: 8,
    },
})