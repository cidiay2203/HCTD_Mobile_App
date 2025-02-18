import { Stack } from "expo-router";
import "react-native-reanimated";

export default function LichSuHienMauLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Khen thưởng", headerShown: false }}
      />
      <Stack.Screen
        name="khen-thuong-chi-tiet"
        options={{ headerTitle: "Chi tiết", headerShown: false }}
      />
    </Stack>
  );
}