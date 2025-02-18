import { TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { COLORS } from "@/constants";
import { router } from "expo-router";

export default function ProfileLayout() {
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
        options={{ headerTitle: "Hồ sơ", headerShown: false }}
      />
      <Stack.Screen
        name="cap-nhat-profile"
        options={{ headerTitle: "Cập nhật Hồ sơ"}}
      />
    </Stack>
  );
}