import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ToastAndroid } from "react-native";
import { Avatar, ListItem } from '@rneui/themed';
import { COLORS, FONTS } from "@/constants";
import { Icon } from "@rneui/base";
import { commonJustify } from "@/shared/CommoStyle/CommonJustify";
import { commonStyle } from "@/shared/CommoStyle/CommonStyle";
import { router } from "expo-router";
import { getThongTinCaNhanNguoiHienMauById, logout, uploadAvatar } from '@/api';
import { getProfile } from '@/storage';
import { Button, Headline, Subheading } from "react-native-paper";
import ItemDetail from "@/components/ItemDetail";
import { API } from '@/constants';
import moment from "moment";


type ProfileInformationProps = {
    data: any;
};


const getBloodDonationStatusColor = (
    ngayHienMauCuoi: string,
    duocPhepHienMau: Boolean
) => {
    if (duocPhepHienMau === false) return COLORS.RED;

    if (!ngayHienMauCuoi && duocPhepHienMau === true) return COLORS.GREEN;

    const lastDonationDate = moment(ngayHienMauCuoi, "DD-MM-YYYY");
    const currentDate = moment();
    const daysDiff = currentDate.diff(lastDonationDate, "days");

    if (daysDiff >= 84) {
        return COLORS.GREEN;
    } else if (daysDiff >= 70) {
        return COLORS.YELLOW;
    } else {
        return COLORS.RED;
    }
};

const ProfileInformation = ({ data }: ProfileInformationProps) => {
    const avatar = data?.hinhAnh ? API.BASE_URL + data.hinhAnh : null;
    const bloodDonationColor = getBloodDonationStatusColor(
        data.ngayHienMauCuoi,
        data.duocPhepHienMau
    );

    return (
        <View style={styles.container}>
            <View style={[styles.rowContainer]}>
                <View style={styles.infoColumn}>
                    <View style={styles.card}>
                        <Text style={styles.infoLabel}>Nhóm máu</Text>
                        <Text style={styles.infoValue}>{data?.nhomMau || '_'}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.infoLabel}>Số lần hiến</Text>
                        <Text style={styles.infoValue}>{data?.soLanHienMau || '_'}</Text>
                    </View>
                </View>

                <View style={styles.avatarContainer}>
                    <Avatar
                        size={100}
                        rounded
                        source={avatar ? { uri: avatar } : undefined}
                        icon={{ name: 'user', type: 'font-awesome' }}
                        containerStyle={{ backgroundColor: COLORS.PRIMARY }}
                    />
                </View>

                <View style={styles.infoColumn}>
                    <View style={styles.card}>
                        <Text style={styles.infoLabel}>Cân nặng</Text>
                        <Text style={styles.infoValue}>{data?.canNang || '_'}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.infoLabel}>Ngày hiến máu gần nhất</Text>
                        <View style={[styles.statusBar, { backgroundColor: bloodDonationColor }]} />
                        <Text style={styles.infoValue}>{data?.ngayHienMauCuoi || '_'}</Text>
                    </View>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.WHITE },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },

    avatarContainer: {
        alignItems: 'center',
        flex: 1,
    },

    infoColumn: {
        flex: 1,
        justifyContent: 'space-evenly',
    },

    card: {
        backgroundColor: COLORS.WHITE,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },

    infoValue: {
        fontSize: 24,
        fontFamily: FONTS.POPPINS_BOLD,
        textAlign: 'center',
    },

    infoLabel: {
        fontSize: 14,
        fontFamily: FONTS.POPPINS_REGULAR,
        textAlign: 'center',
    },

    name: {
        fontSize: 16,
        color: COLORS.LITE_DARK3,
        textAlign: 'center',
        marginTop: 5,
    },

    sectionHeader: {
        padding: 10,
        backgroundColor: COLORS.LITE_GRAY,
    },

    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    statusBar: {
        height: 8, // Độ dày của thanh màu
        width: "100%", // Chiều rộng toàn bộ
        borderRadius: 4,
        marginTop: 5,
    },
});


export default ProfileInformation;