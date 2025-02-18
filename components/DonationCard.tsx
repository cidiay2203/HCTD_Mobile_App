import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import {COLORS, FONTS} from '@/constants'
import {commonStyle} from '@/shared/CommoStyle/CommonStyle';
import {commonJustify} from '@/shared/CommoStyle/CommonJustify'

interface DonationCardItem{
    name: string;
    location: string;    
    time: string;    
}

interface DonationCardProps{
    item: DonationCardItem
}

const DonationCard: React.FC<DonationCardProps> = ({item}) => {    
    return (
        <View style={[styles.main, commonJustify.rowSpaceBetween]}> 
            <View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text}>Name</Text>
                    <Text style={commonStyle({fontSize:14, fontFamily:FONTS.POPPINS_BOLD,color:COLORS.LITE_DARK2}).text}>{item.name}</Text>
                </View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text}>Location</Text>
                    <Text style={commonStyle({fontSize:14, fontFamily:FONTS.POPPINS_BOLD,color:COLORS.LITE_DARK2}).text}>{item.location}</Text>
                </View>
                <View style={[styles.margin]}>
                    <Text style={commonStyle({fontSize:13, fontFamily:FONTS.POPPINS_REGULAR}).text} >{item.time}</Text>
                </View>
           </View>

           <View  style={{paddingTop:20}} >
               <Image style={{width:100}} resizeMode="contain" source={require("../assets/images/BloodGroup.png")}/>
               <Button titleStyle={{color:COLORS.PRIMARY}} type="clear" title="Donate" />
           </View>
        </View>
    )
}

export default DonationCard

const styles = StyleSheet.create({
    main:{
        backgroundColor:'white',
        marginTop:10
    },
    margin:{
        marginLeft:10, 
        padding:5
    }
})