import React, { useState, useEffect } from 'react';
import {Linking, StyleSheet, Text, View, ScrollView} from "react-native";
import {Button} from "react-native-paper";
import {getProfile} from '@/storage';
import ItemDetailHorizontal from "@/components/ItemDetailHorizontal";
import {getDanhSachLoaiKhenThuongDuDieuKienByThongTinCaNhanNguoiHienMauId} from '@/api';
import { router } from "expo-router";

export default function KhenThuongHienMauScreen(){
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const getKhenThuongHienMau = async () => {    
        try {
            setIsLoading(true); // Bật trạng thái loading
            const profile = await getProfile(); 
            const response = await getDanhSachLoaiKhenThuongDuDieuKienByThongTinCaNhanNguoiHienMauId(profile.id);

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }
    
            const res = response.data;
    
            if(res.isSuccessed == false ){
                throw { message: res.message, res: res };
            }

            setData(res.data);

        } catch (error) {
            console.error('Lỗi:', error);
            router.replace("/(login)");
        } finally {
            setIsLoading(false);
        }
      }
    
      useEffect(() => {
        getKhenThuongHienMau();
      }, [])

    if (isLoading) {
        return <View style={styles.wrapper}><Text>Đang tải dữ liệu</Text></View>
    }

    if (data && data.length > 0) {
        return <ScrollView>
                    {
                        data.map((item: any) =>
                            <View key={item.id} style={styles.itemWrapper}>
                            <ItemDetailHorizontal title="Tên cấp khen thưởng" value={item.Ten}/>
                            <View style={styles.buttonWrapper}>
                                <Button onPress={() => Linking.openURL(item.LinkApi)} style={{marginBottom: 5}}>Link giấy chứng nhận</Button>
                            </View>
                        </View>)
                    }
                </ScrollView>
    }
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
    }
})