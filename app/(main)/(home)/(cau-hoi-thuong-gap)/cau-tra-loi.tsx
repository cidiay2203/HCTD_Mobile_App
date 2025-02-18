import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Linking, ScrollView } from "react-native";
import { SearchBar,  } from '@rneui/themed';
import { COLORS } from "@/constants";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { commonJustify } from "@/shared/CommoStyle/CommonJustify";
import {getCauTraLoiByCauHoiId} from '@/api';
import { router, useRouter, useLocalSearchParams } from "expo-router";
import {Button, Headline, Text} from "react-native-paper";
import ItemDetail from "@/components/ItemDetail";
import ItemDetailHorizontal from "@/components/ItemDetailHorizontal";
import {globalColors} from "@/shared/styles";


export default function CauTraLoiScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getCauTraLoi();
  }, [])

  const getCauTraLoi = async () => {    
    try {
        setIsLoading(true); // Bật trạng thái loading
                
        const response = await getCauTraLoiByCauHoiId(params.id);
        if (response.status != 200) {
          throw { responseStatus: response.status };
        }

        const res = response.data;

        if(res.isSuccessed == false ){
          throw { message: res.message, res: res };
        }
        
        if(res.data){                
            setData(res.data);
          } else {
            setData(null);
          }

    } catch (error) {
      handleError(error); 
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  }

  if (data) {
    return <View style={styles.questionWrapper}>
        <Text>{data.cauTraLoi}</Text>
        <Button style={styles.buttonBack} labelStyle={styles.buttonLabel} onPress={() => router.back()}>Trở về danh sách câu hỏi</Button>
    </View>
  }

  return <View style={styles.wrapper}>
      <Text>Chưa có dữ liệu</Text>
      <Button style={styles.buttonBack} labelStyle={styles.buttonLabel} onPress={() => router.back()}>Trở về danh sách câu hỏi</Button>
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
      flex: 1
  },
  title: {
    backgroundColor: COLORS.PRIMARY,
    textAlign: "center",
    color: COLORS.WHITE,
    fontWeight: 'bold',
    padding: 10
  },
  buttonWrapper: {
    padding: 10,
  },
  buttonBack: {
    marginTop: 15,
    backgroundColor: COLORS.PRIMARY,
  },
  buttonLabel:{
    color: COLORS.WHITE
  },
  uestionWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.gray['200']
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