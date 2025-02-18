import {Linking, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-paper";
import {getProfile} from '@/storage';
import {API} from '@/constants';
import {downloadAndOpenFile} from '@/api';

export default function VanBanScreen(){
    const baseUrl = API.BASE_URL + '/api/VanBans/mobile-app/';
    const giayChungNhanHienMauHandle = async () => {
        const profile = await getProfile();         
        const url = baseUrl + `download-giay-chung-nhan-hien-mau-tinh-nguyen?nguoiHienMauId=${profile.id}`;
        
        console.log('url: ' + url);
        downloadAndOpenFile(url);
        // await Linking.openURL(url);
    }

    const giayChungNhanKhenThuong = async () => {
        const profile = await getProfile(); 
        await Linking.openURL(baseUrl + `download-giay-chung-nhan-de-khen-thuong?nguoiHienMauId=${profile.id}&idCauHinhKhenThuong=15`);
    }

    const bieuMauHienMau = async () => {
        await Linking.openURL(baseUrl + `download-bieu-mau?tenBieuMau=BieuMauDangKyHienMau`);
    }

    const bieuMauHienMauDienSan = async () => {
        const profile = await getProfile(); 
        await Linking.openURL(baseUrl + `download-bieu-mau-dang-ky-hien-mau-ca-nhan?nguoiHienMauId=${profile.id}`);
    }

    const baoCaoKhenThuongCaNhan = async () => {
        const profile = await getProfile(); 
        await Linking.openURL(baseUrl + `download-bao-cao-khen-thuong-hien-mau-tinh-nguyen-ca-nhan?nguoiHienMauId=${profile.id}&idCauHinhKhenThuong=27`);
    }

    const baoCaoKhenThuongGiaDinh = async () => {
        const profile = await getProfile(); 
        await Linking.openURL(baseUrl + `download-bao-cao-khen-thuong-hien-mau-tinh-nguyen-gia-dinh?nguoiHienMauId=${profile.id}&idCauHinhKhenThuong=27`);
    }

    return <View style={styles.wrapper}>
        <Text style={styles.title}>Báo cáo, chứng nhận</Text>
        <View style={styles.wrapperItem}>
            <Button onPress={giayChungNhanHienMauHandle} mode={"outlined"}>Giấy chứng nhận hiến máu</Button>
        </View>
        <View style={styles.wrapperItem}>
            <Button onPress={giayChungNhanKhenThuong} mode={"outlined"}>Giấy chứng nhận khen thưởng</Button>
        </View>
        <View style={styles.wrapperItem}>
            <Button onPress={bieuMauHienMau} mode={"outlined"}>Biểu mẫu hiến máu</Button>
        </View>
        <View style={styles.wrapperItem}>
            <Button onPress={bieuMauHienMauDienSan} mode={"outlined"}>Biểu mẫu hiến máu điền sẵn</Button>
        </View>
        <Text style={styles.title}>Biểu mẫu</Text>
        <View style={styles.wrapperItem}>
            <Button onPress={baoCaoKhenThuongCaNhan} mode={"outlined"}>Báo cáo khen thưởng cá nhân</Button>
        </View>
        <View style={styles.wrapperItem}>
            <Button onPress={baoCaoKhenThuongGiaDinh} mode={"outlined"}>Báo cáo khen thưởng gia đình</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 5,
    },
    wrapper: {
        flex: 1,
        paddingVertical: 10
    },
    wrapperItem: {
        padding: 5
    }

})
