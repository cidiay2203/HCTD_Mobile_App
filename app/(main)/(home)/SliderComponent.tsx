import React from 'react';
import { Text, Dimensions, StyleSheet, View, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {COLORS, IMAGES} from '@/constants'

const Slider = () => (
    <View style={styles.main}>
       <View style={styles.container}>
            <SwiperFlatList
                paginationStyleItem={{width:10, height:10}}
                paginationActiveColor={COLORS.PRIMARY}
                paginationDefaultColor="gray"
                autoplay autoplayDelay={2} 
                autoplayLoop index={2} showPagination
            >
                <View style={[styles.child, { backgroundColor: 'tomato' }]}>
                    <Image style={[styles.image, {resizeMode: 'contain'}]} source={IMAGES.slider1} />
                </View>
                <View style={[styles.child, { backgroundColor: 'thistle' }]}>
                    <Image style={[styles.image, {resizeMode: 'contain'}]} source={IMAGES.slider2} />
                </View>
                <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
                    <Image style={[styles.image, {resizeMode: 'contain'}]} source={IMAGES.slider3} />
                </View>
                <View style={[styles.child, { backgroundColor: 'teal' }]}>
                    <Image style={[styles.image, {resizeMode: 'contain'}]} source={IMAGES.slider4} />
                </View>
            </SwiperFlatList>
        </View>
  </View>
);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    main:{ height:height*0.2, width:width,  borderRadius:20 },
    container: { flex: 1, backgroundColor: 'white'  },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.1, textAlign: 'center' },
    image: {height:height*0.2, width:width,  borderRadius:20}
});

export default Slider;