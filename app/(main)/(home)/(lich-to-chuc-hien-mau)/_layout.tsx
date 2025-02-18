import { Stack } from "expo-router";
import "react-native-reanimated";
import { TouchableOpacity} from 'react-native';
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "@/constants";

export default function LichToChucHienMauLayout() {
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
        options={{ headerTitle: "Lịch tổ chức hiến máu", headerShown: false }}
      />
      <Stack.Screen 
        name="cau-hoi-dang-ky-hien-mau"
        options ={{ 
          headerTitle: "Câu hỏi"
        }}
      />
    </Stack>
    
  );
}
