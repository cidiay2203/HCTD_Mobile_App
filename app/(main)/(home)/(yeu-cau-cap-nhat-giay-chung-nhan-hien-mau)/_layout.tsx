import { Stack } from "expo-router";
import "react-native-reanimated";
import { TouchableOpacity} from 'react-native';
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "@/constants";

export default function YeuCauCapNhatGiayChungNhanHienMauLayout() {
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
        options={{ headerTitle: "Yêu cầu cập nhật giấy chứng nhận hiến máu", headerShown: false }}
      />
      <Stack.Screen 
        name="yeu-cau-cap-nhat-giay-chung-nhan-hien-mau"
        options ={{ 
          headerTitle: "Tạo Yêu cầu"
        }}
      />
    </Stack>
    
  );
}
