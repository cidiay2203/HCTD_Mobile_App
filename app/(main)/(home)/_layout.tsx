import { Stack } from "expo-router";
import "react-native-reanimated";
import { TouchableOpacity} from 'react-native';
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "@/constants";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="chevron-left" size={36} color={COLORS.WHITE} />
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        headerTintColor: COLORS.WHITE
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Home", headerShown: false }}
      />
      <Stack.Screen name="notification" options={{ headerTitle: "THÔNG BÁO" }} />
      <Stack.Screen 
        name="(lich-to-chuc-hien-mau)"
        options ={{ 
          title: "Lịch hiến máu"
        }}
      />
      <Stack.Screen 
        name="van-ban"
        options ={{ 
          title: "Văn bản"
        }}
      />
      <Stack.Screen 
        name="khen-thuong-hien-mau"
        options ={{ 
          title: "Khen thưởng hiến máu"
        }}
      />
      <Stack.Screen 
        name="(cau-hoi-thuong-gap)"
        options ={{ 
          title: "Câu hỏi thường gặp"
        }}
      />
      <Stack.Screen 
        name="(tieu-chuan-khen-thuong)"
        options ={{ 
          title: "Tiêu chuẩn khen thưởng"
        }}
      />
      <Stack.Screen 
        name="(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)"
        options ={{ 
          title: "Yêu cầu cập nhật giấy chứng nhận hiến máu"
        }}
      />
      <Stack.Screen 
        name="(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)"
        options ={{ 
          title: "Yêu cầu cấp lại giấy chứng nhận hiến máu"
        }}
      />
    </Stack>
    
  );
}
