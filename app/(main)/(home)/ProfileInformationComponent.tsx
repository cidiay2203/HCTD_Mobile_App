import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@rneui/themed";
import { COLORS, FONTS } from "@/constants";
import { API } from "@/constants";
import moment from "moment";

const getBloodDonationStatusColor = (ngayHienMauCuoi, duocPhepHienMau) => {
  if (!duocPhepHienMau) return COLORS.RED;
  if (!ngayHienMauCuoi) return COLORS.GREEN;

  const daysDiff = moment().diff(moment(ngayHienMauCuoi, "DD-MM-YYYY"), "days");
  return daysDiff >= 84 ? COLORS.GREEN : daysDiff >= 70 ? COLORS.YELLOW : COLORS.RED;
};

const ProfileInformation = ({ data }) => {
  const avatar = data?.hinhAnh ? { uri: API.BASE_URL + data.hinhAnh } : undefined;
  const bloodDonationColor = getBloodDonationStatusColor(data.ngayHienMauCuoi, data.duocPhepHienMau);

  return (
    <View style={styles.container}>
      {/* Header Profile */}
      <View style={styles.profileHeader}>
        <Avatar
          size={110}
          rounded
          source={avatar}
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={styles.avatar}
        />
        <Text style={styles.name}>{data?.hoVaTen || ""}</Text>
      </View>

      {/* Thông tin chia thành 2 cột */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <InfoCard label="Nhóm máu" value={data?.nhomMau} />
          <InfoCard label="Số lần hiến" value={data?.soLanHienMau} />
        </View>
        <View style={[styles.row, { marginBottom: 0 }]}>
          <InfoCard label="Cân nặng" value={data?.canNang} />
          <InfoCard
            label="Ngày hiến gần nhất"
            value={data?.ngayHienMauCuoi}
            statusColor={bloodDonationColor}
          />
        </View>
      </View>
    </View>
  );
};

const InfoCard = ({ label, value, statusColor }) => (
  <View style={styles.card}>
    <Text style={styles.infoLabel}>{label}</Text>
    {statusColor && <View style={[styles.statusBar, { backgroundColor: statusColor }]} />}
    <Text style={styles.infoValue}>{value || "_"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RED,
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    elevation: 5,
  },
  name: {
    fontSize: 22, // tăng kích thước chữ
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DARK_GRAY,
    marginTop: 10,
  },
  infoContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14, // tăng kích thước chữ
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.GRAY,
  },
  infoValue: {
    fontSize: 20, // tăng kích thước chữ
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DARK_GRAY,
    marginTop: 5,
  },
  statusBar: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    marginTop: 5,
  },
});

export default ProfileInformation;
