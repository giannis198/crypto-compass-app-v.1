import { View, ActivityIndicator } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Text } from "./ui/text";

export function ThemeLoading() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundColor = isDark ? "#111827" : "#F9FAFB";
  const textColor = isDark ? "#F3F4F6" : "#1F2937";
  const primaryColor = isDark ? "#818CF8" : "#4F46E5";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={primaryColor} />
      <Text
        style={{
          color: textColor,
          marginTop: 16,
          fontSize: 16,
        }}
      >
        Loading...
      </Text>
    </View>
  );
}
