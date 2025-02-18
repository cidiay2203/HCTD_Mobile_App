import { Stack } from "expo-router";
import "react-native-reanimated";
import { TouchableOpacity} from 'react-native';
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "@/constants";

export default function LoginLayout() {
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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="quen-mat-khau" options={{ headerTitle: "QUÊN MẬT KHẨU" }} />
      <Stack.Screen name="sign-up" options={{ headerTitle: "ĐĂNG KÝ" }} />
    </Stack>
  );
}