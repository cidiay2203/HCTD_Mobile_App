import React from 'react';
import { Text, Dimensions, StyleSheet, View, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { COLORS, IMAGES } from '@/constants';

const Slider = () => (
  <View style={styles.main}>
    <View style={styles.container}>
      <SwiperFlatList
        paginationStyleItem={{ width: 10, height: 10 }}
        paginationActiveColor={COLORS.PRIMARY}
        paginationDefaultColor="gray"
        autoplay autoplayDelay={2} 
        autoplayLoop showPagination
      >
        {[IMAGES.slider1, IMAGES.slider2, IMAGES.slider3, IMAGES.slider4].map((image, index) => (
          <View key={index} style={styles.child}>
            <Image style={styles.image} source={image} />
          </View>
        ))}
      </SwiperFlatList>
    </View>
  </View>
);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  main: { height: height * 0.25, width, borderRadius: 15, overflow: 'hidden' },
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  child: { width, alignItems: 'center', justifyContent: 'center' },
  image: { width: '90%', height: '100%', resizeMode: 'contain', borderRadius: 15 },
});

export default Slider;
