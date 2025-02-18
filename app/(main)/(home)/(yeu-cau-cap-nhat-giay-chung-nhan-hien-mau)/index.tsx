import React, { useState, useEffect } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { getProfile } from '@/storage';
import {
    getAllByThongTinCaNhanNguoiHienMauId
} from '@/api';
import ItemDetailHorizontal from '@/components/ItemDetailHorizontal';
import { COLORS } from "@/constants";
import { router } from "expo-router";
import handleError from '@/shared/errorHandler';
import { API } from '@/constants';
import {globalColors} from "@/shared/styles";

export default function DanhSachYeuCauCapNhatHienMauScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [danhSachYeuCauCapNhatHienMau, setDanhSachYeuCauCapNhatHienMau] = useState([]);
    const [profileId, setProfileId] = useState(Number);
    const [profileHoVaTen, setProfileHoVaTen] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

    const getDanhSachYeuCauCapNhatHienMau = async () => {
        try {
            setIsLoading(true); // Bật trạng thái loading

            const profile = await getProfile();

            if (!profile) {
                console.error("Profile is null or undefined");
                return;
            }

            setProfileId(profile.id);
            setProfileHoVaTen(profile.hoVaTen);
            const response = await getAllByThongTinCaNhanNguoiHienMauId(profile.id);

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }

            const res = response.data;

            if (res.isSuccessed == false) {
                throw { message: res.message, res: res };
            }

            setDanhSachYeuCauCapNhatHienMau(res.data.data.sort((a: any, b: any) => b.id - a.id));
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    }

    useEffect(() => {
        getDanhSachYeuCauCapNhatHienMau();
    }, [])

    const handleTaoYeuCau = async () => {
        router.push("/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau");
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
                {danhSachYeuCauCapNhatHienMau.map((item: any) =>
                    <View key={item.id} style={styles.itemWrapper}>
                        <ItemDetailHorizontal title="Ngày cấp" value={item.ngayCap} />
                        <ItemDetailHorizontal title="Địa điểm" value={item.diaDiem} />
                        <ItemDetailHorizontal title="Trạng thái" value={item.tenTrangThaiYeuCauCapNhatGiayChungNhanHienMau} />
                        <View style={styles.itemFileWrapper}>
                            <Text style={styles.titleFile}>Danh sách file:</Text>
                            <Text style={styles.subtitleFile}>{item.thuMucTapTins && item.thuMucTapTins.length > 0 ? "" : "Trống"}</Text>
                        </View>
                        {item.thuMucTapTins && item.thuMucTapTins.length > 0 && (
                            <View style={styles.fileListWrapper}>
                                {item.thuMucTapTins.map((file: any, index: number) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.fileItem}
                                        onPress={() => handleOpenFile(file.DownloadLink)}
                                    >
                                        <Text style={styles.fileName}>{file.TenFile}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
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
    fileItem: {
        paddingVertical: 5,
        width: '100%',  // Đảm bảo mỗi file chiếm toàn bộ chiều ngang để xuống dòng
        alignItems: 'center',  // Căn giữa nội dung trong mỗi file
    },
    fileName: {
        color: "blue",
        textDecorationLine: "underline",
    },

    itemFileWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderBottomColor: globalColors.gray['200']
    },
    titleFile: {
        fontWeight: "500",
        marginRight: 20,
    },
    subtitleFile: {
        fontSize: 13,
        color: globalColors.gray['500'],
        flexWrap: "wrap",
        flexShrink: 1,
        textAlign: "right",
    }
})