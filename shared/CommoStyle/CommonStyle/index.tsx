import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants/fonts';

// Định nghĩa kiểu cho các tham số
interface CommonStyleParams {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string; // Sử dụng kiểu có sẵn của TextStyle
}

export const commonStyle = ({
  fontSize = 14, 
  fontFamily = FONTS.POPPINS_REGULAR,
  color = "#7E7E7E", 
  backgroundColor = "#FF2156"}: CommonStyleParams) => {
  
  return StyleSheet.create({
    text: {
      fontSize: fontSize, 
      fontFamily: fontFamily,
    },
    color: {
      color: color,
    },
    background: {
      backgroundColor: backgroundColor
    }    
  });
};

