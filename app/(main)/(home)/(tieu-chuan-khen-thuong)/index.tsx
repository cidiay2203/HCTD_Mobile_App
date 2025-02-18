import React, { useState, useEffect } from 'react';
import {Pressable, ScrollView, StyleSheet, View, Linking} from "react-native";
import {Button, Text} from "react-native-paper";
import {getProfile} from '@/storage';
import ItemDetailHorizontal from "@/components/ItemDetailHorizontal";
import {getListThuMucTapTin} from '@/api';
import {COLORS} from '@/constants';
import {globalColors} from '@/shared/styles';
import { router, useRouter, useLocalSearchParams } from "expo-router";

type TapTinRowProps = {
    item: any,
    onPress: Function,
}

type ThuMucRowProps = {
    item: any,
    onPress: Function
}


const TapTinRow =  (props: TapTinRowProps) => {
    const {item} = props
    const openFile = async () => {
        await Linking.openURL(item.linkApi);
    }

    return <Pressable onPress={() => openFile()}><View style={styles.questionWrapper}>
        <Text style={styles.questionTitle} key={item.id}>{item.tenFile}</Text>
        <Text style={styles.questionSubtitle}>Xem tập tin</Text>
    </View></Pressable>
}

const ThuMucRow = (props: ThuMucRowProps) => {
    const {item} = props
    return <Pressable onPress={() => props.onPress(item.id)}><View style={styles.thumucWrapper}>
        <Text style={styles.questionTitle} key={item.id}>Thư mục: {item.tenThuMuc}</Text>
        <Text style={styles.questionSubtitle}>Xem thư mục</Text>
    </View></Pressable>
}

export default function TieuChuanKhenThuongScreen(){
    const params = useLocalSearchParams();
    const { itemId } = params;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const getListThuMucTapTin = async () => {    
        try {
            setIsLoading(true); // Bật trạng thái loading
            let response = null;
            
            if(params.itemId){
                response = await getListThuMucTapTin(params.itemId);
            } else {
                response = await getListThuMucTapTin();
            }            

            if (response.status != 200) {
                throw { responseStatus: response.status };
            }
    
            const res = response.data;
    
            if(res.isSuccessed == false ){
                throw { message: res.message, res: res };
            }

            setData(res.data.data);
        } catch (error) {
            console.error('Lỗi:', error);
            router.replace("/(login)");
        } finally {
            setIsLoading(false); 
        }
      }
    
    useEffect(() => {
        getListThuMucTapTin();
    }, [])

    const handleTapTin = (itemId: string) => {
        // navigation.push('file_detail', {
        //     questionId
        // })
    }

    const handleThuMuc = (itemId: string) => {
        router.push({
          pathname: "/(tieu-chuan-khen-thuong)",
          params: {itemId: itemId}
        });
      }

    if (isLoading) {
        return <View style={styles.wrapper}><Text>Đang tải dữ liệu</Text></View>
    }

    if (Array.isArray(data)) {
        return <View>
                    {data.map((item: any) => {
                        return item.loai == 'Tập tin' ?
                            <TapTinRow key={item.id} onPress={handleTapTin} item={item} /> :
                            <ThuMucRow key={item.id} onPress={handleThuMuc} item={item}/>
                    })}
                    {itemId == '901' ? null :
                        <Button style={styles.buttonBack} labelStyle={styles.buttonLabel} onPress={() => router.back()}>Trở về thự mục cha</Button>}
                </View>
            }

    return <View>
        <Text>Chưa có dữ liệu</Text>
        {itemId == '901' ? null :
            <Button style={styles.buttonBack} labelStyle={styles.buttonLabel} onPress={() => router.back()}>Trở về thự mục cha</Button>}
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginVertical: 10,
        textAlign: "center"
    },
    buttonBack: {
        marginTop: 15,
        backgroundColor: COLORS.PRIMARY,
    },
    buttonLabel:{
        color: COLORS.WHITE
    },
    questionWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: globalColors.gray['200']
    },
    thumucWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: globalColors.gray['200'],
        borderLeftWidth: 2,
        borderLeftColor: globalColors.brand
    },
    questionTitle: {
        fontWeight: "500"
    },
    questionSubtitle: {
        marginTop: 5,
        fontSize: 13,
        color: globalColors.gray['500']
    }
})