import { Stack } from "expo-router";
import "react-native-reanimated";

export default function LichSuHienMauLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Lịch sử hiến máu", headerShown: false }}
      />
      <Stack.Screen
        name="lich-su-hien-mau-chi-tiet"
        options={{ headerTitle: "Chi tiết", headerShown: false }}
      />
    </Stack>
  );
}