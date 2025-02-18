import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import {Button} from "react-native-paper";
import {
  getListCauHoiDangKyHienMauByLichToChucHienMau_ThongTinCaNhanNguoiHienMauId,
  nguoiHienMauTraLoiCauHoiDangKyHienMau
} from '@/api';
import ItemDetailHorizontal from '@/components/ItemDetailHorizontal';
import { COLORS } from "@/constants";
import handleError from '@/shared/errorHandler';
import { router, useLocalSearchParams } from "expo-router";
import LoadingOverlay from '@/components/LoadingOverlay';

const luaChon1 = "Có";
const luaChon2 = "Không";
const luaChon3 = "Khác";

interface Question {
  id: string;
  stt: number;
  text: string;
  optionType: string;
  selectedOption?: string;
  otherText?: string;
}

const QuestionItem = React.memo(({ item, index, selectedOption, onOptionSelect, onTextChange }: any) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{`${index + 1}. ${item.text}`}</Text>
      <View style={styles.optionsContainer}>
        {[luaChon1, luaChon2, luaChon3].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption == option && styles.selectedOptionButton,
            ]}
            onPress={() => onOptionSelect(item.id, option)}
          >
            <Text style={[
              styles.optionText,
              selectedOption == option && styles.selectedOptionText,
            ]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedOption == luaChon3 && (
        <TextInput
          style={styles.textInput}
          placeholder="Nhập ý kiến khác"
          value={item.otherText}
          onChangeText={(text) => onTextChange(item.id, text)}
        />
      )}
    </View>
  );
});

export default function CauHoiDangKyHienMauScreen(){
  const params = useLocalSearchParams();
  const { lichToChucHienMau_ThongTinCaNhanNguoiHienMauId } = params;
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOverLayLoading, setIsOverLayLoading] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: { option: string; otherText?: string } }>({});

  const getListCauHoiDangKyHienMau = async () => {    
    setIsOverLayLoading(true); // Bật trạng thái setIsLoading

    try {        
        const response = await getListCauHoiDangKyHienMauByLichToChucHienMau_ThongTinCaNhanNguoiHienMauId(params.lichToChucHienMau_ThongTinCaNhanNguoiHienMauId);

        if (response.status != 200) {
            throw { responseStatus: response.status };
        }

        const res = response.data;

        if(res.isSuccessed == false ){
            throw { message: res.message, res: res };
        }

        if(res.data){
          if(res.data.cauHoiDangKyHienMaus){
            const sortedData = res.data.cauHoiDangKyHienMaus.sort((a: any, b: any) => parseInt(a.stt, 10) - parseInt(b.stt, 10));
            setQuestions(sortedData.map((item: any) => { return {
                id: item.id.toString(),
                stt: item.stt,
                text: item.cauHoi,
                optionType: item.loaiCauTraLoi,
                selectedOption: (item.luaChon == 1 ? luaChon1: (item.luaChon == 2 ? luaChon2: luaChon3 )),
                otherText: item.luaChonKhac
              };
            }))
            
            const initialAnswers = sortedData.reduce((acc: any, question: any) => {
              acc[question.id] = {                
                otherText: question.otherText || '',
              };
              switch(question.luaChon){
                case 1:
                  acc[question.id]["option"] = luaChon1;
                  break;

                case 2:
                  acc[question.id]["option"] = luaChon2;
                  break;

                case 3:
                  acc[question.id]["option"] = luaChon3;
                  break;

                default:
                  acc[question.id]["option"] = '';
                  break;
              }
              
              return acc;
            }, {} as { [key: string]: { option: string; otherText?: string } });

            setAnswers(initialAnswers);
          } else{
            setQuestions([]);
          }
        } else {
          throw { message: "Không data trả về", res: res };
        }
    } catch (error) {
        handleError(error); 
    } finally {
      setIsOverLayLoading(false); // Tắt trạng thái setIsLoading
    }
  }

  useEffect(() => {
      getListCauHoiDangKyHienMau();
  }, []);
    
  const handleOptionSelect = (id: string, option: string) => {
      setAnswers((prev) => ({
        ...prev,
        [id]: { option, otherText: option === 'Khác' ? prev[id]?.otherText || '' : undefined },
      }));
  };
  
  const handleTextChange = (id: string, text: string) => {
      setAnswers((prev) => ({
        ...prev,
        [id]: { ...prev[id], otherText: text },
      }));
  };
    
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([id, { option, otherText }]) => ({
        id: parseInt(id, 10),
        luaChon: (option == luaChon1 ? 1 : (option == luaChon2 ? 2: 3)),
        luaChonKhac: otherText,
      }));

      const response = await nguoiHienMauTraLoiCauHoiDangKyHienMau(formattedAnswers);

      if (response.status != 200) {
        throw { responseStatus: response.status };
      }

      Alert.alert('Thành công', 'Kết quả đăng ký hiến máu đã được gửi thành công.');
      router.replace("/(main)/(home)/(lich-to-chuc-hien-mau)");

    } catch (error) {
      console.error('Error submitting answers:', error);
      Alert.alert('Lỗi', 'Không thể gửi kết quả.');
    } finally {
      setIsLoading(false); // Tắt trạng thái setIsLoading
    }
  };

  if (isLoading) {
    return (
      <View style={styles.setIsLoadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.setIsLoadingContainer}>
        <Text style={styles.errorText}>Không có câu hỏi nào để hiển thị</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <QuestionItem
            item={item}
            index={index}
            selectedOption={answers[item.id]?.option}
            onOptionSelect={handleOptionSelect}
            onTextChange={handleTextChange}
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        getItemLayout={(data, index) => ({
          length: 150, // Chiều cao cố định của mỗi item
          offset: 150 * index,
          index,
        })}
      />
      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        loading={isLoading} 
      >
        {isLoading ? 'đang thực hiện...' : 'GỬI KẾT QUẢ'}
      </Button>
    </View>
  );
};
    
const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f9f9f9',
  },
  setIsLoadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  questionContainer: {
      marginBottom: 24,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
  },
  questionText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
  },
  optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 8,
  },
  optionButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
  },
  selectedOptionButton: {
      backgroundColor: 'red',
      borderColor: 'red',
  },
  optionText: {
      color: '#333',
  },
  selectedOptionText: {
      color: 'white',
  },
  textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 8,
      marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    marginTop: 10
  },
  buttonLabel:{
      color: COLORS.WHITE
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});