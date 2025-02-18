import React from 'react';
import { Image, StyleSheet, View, Linking } from 'react-native';
import {Button, Text} from "react-native-paper";
import {COLORS, FONTS, IMAGES} from '@/constants';
import {commonStyle} from '@/shared/CommoStyle/CommonStyle';
import {commonJustify} from '@/shared/CommoStyle/CommonJustify';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface DonationItem{
    hoVaTen: string;
    ngaySinh: string;    
    gioiTinh: string;    
}

interface DonationProps{
    item: DonationItem
}

const Donation: React.FC<DonationProps> = ({item}) => {    
    const gotoWebsite =  async () => {
        await Linking.openURL(`https://hoichuthapdokhanhhoa.org.vn/TinTuc`);
    }

    return (
        <View style={[styles.main, commonJustify.rowSpaceBetween]}> 
            <View style={styles.homeCover}>
                <Button 
                    onPress={gotoWebsite} 
                    style={styles.buttonWebsite} 
                    textColor={COLORS.PRIMARY} 
                    mode={"outlined"}
                >
                    Đi đến website
                </Button>
            </View>
            {/* <View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text}>Họ và tên</Text>
                    <Text style={commonStyle({fontSize:14, fontFamily:FONTS.POPPINS_BOLD,color:COLORS.LITE_DARK2}).text}>{item.hoVaTen ? item.hoVaTen : "_"}</Text>
                </View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text}>Ngày sinh</Text>
                    <Text style={commonStyle({fontSize:14, fontFamily:FONTS.POPPINS_BOLD,color:COLORS.LITE_DARK2}).text}>{item.ngaySinh ? item.ngaySinh : "_"}</Text>
                </View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text}>Giới tính</Text>
                    <Text style={commonStyle({fontSize:14, fontFamily:FONTS.POPPINS_BOLD,color:COLORS.LITE_DARK2}).text}>{item.gioiTinh ? item.gioiTinh : "_"}</Text>
                </View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text}>CMND/CCCD</Text>
                    <Text style={commonStyle({fontSize:14, fontFamily:FONTS.POPPINS_BOLD,color:COLORS.LITE_DARK2}).text}>{item.CMND ? item.CMND : "_"}</Text>
                </View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text}>Nơi cấp</Text>
                    <Text style={commonStyle({fontSize:14, fontFamily:FONTS.POPPINS_BOLD,color:COLORS.LITE_DARK2}).text}>{item.noiCap ? item.noiCap : "_"}</Text>
                </View>
            </View>

            <View  style={{paddingTop:20}} >
                <Image style={{width:100, }} resizeMode="contain" source={IMAGES.blood_group}/>
                <Button titleStyle={{color:COLORS.PRIMARY}} type="clear" title="Donate" />
            </View> */}
        </View>
    )
}

export default Donation

const styles = StyleSheet.create({
    main:{
        backgroundColor: 'transparent',
        marginTop:10
    },
    margin:{
        marginLeft:10, 
        padding:5
    },
    homeCover: {
        paddingHorizontal: 16,
        width: '100%',
        // marginTop: 30,
    },
    buttonWebsite:{
        backgroundColor: 'white'
    }
})