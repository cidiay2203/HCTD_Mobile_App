import {StyleSheet} from 'react-native';

export const commonJustify = StyleSheet.create({
    rowCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowFlexEnd: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    rowFlexStart: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    rowSpaceAround: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    rowSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowSpaceEvenly: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    center: {
      justifyContent: 'center',
    },
    textCenter: {
      textAlign: 'center',
    },
  });