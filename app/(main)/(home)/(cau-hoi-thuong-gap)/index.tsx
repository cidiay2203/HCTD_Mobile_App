import React, { useState, useEffect } from 'react';
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import {getListCauHois} from '@/api';
import {globalColors} from '@/shared/styles';
import { router  } from "expo-router";

type QuestionProps = {
    question: any,
    onPress: Function
}

const Question = (props: QuestionProps) => {
    const {question} = props
    return (
        <Pressable onPress={() => props.onPress(question.id)}>
            <View style={styles.questionWrapper}>
                <Text style={styles.questionTitle} key={question.id}>{question.cauHoi}</Text>
                <Text style={styles.questionSubtitle}>Xem câu trả lời</Text>
            </View>
        </Pressable>
    )
}

export default function CauHoiThuongGapScreen(){
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const getCauHoi = async () => {    
        try {
            setIsLoading(true); // Bật trạng thái loading
            
            const response = await getListCauHois();
            if (response.status != 200) {
                throw { responseStatus: response.status };
            }
    
            const res = response.data;
    
            if(res.isSuccessed == false ){
                throw { message: res.message, res: res };
            }

            setData(res.data.data);
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
      }
    
    useEffect(() => {
        getCauHoi();
    }, [])

    const handleCauTraLoi = (itemId: string) => {
        router.push({
          pathname: "/cau-tra-loi",
          params: {id: itemId}
        });
      }

    if (isLoading) {
        return <View style={styles.wrapper}><Text>Đang tải dữ liệu</Text></View>
    }

    if (Array.isArray(data)) {
        return data.map((question: any) => <Question key={question.id} onPress={handleCauTraLoi} question={question}/>)
    }

    return <Text>Không tìm thấy</Text>
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
    },
    questionWrapper: {
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