import { useAppTheme } from "@/hooks/use-app-theme";
import { Stack } from "expo-router";

export default function CoinLayout() {
  const { isDark } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#111827" : "#F9FAFB", // gray-900 / gray-50
        },
        headerTintColor: isDark ? "#E0E7FF" : "#3730A3", // indigo-100 / indigo-800
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        headerBackTitle: "Back",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Coin Details",
        }}
      />
    </Stack>
  );
}
