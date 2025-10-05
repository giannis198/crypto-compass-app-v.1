import { ActivityIndicator, View } from "react-native";
import { Text } from "./ui/text";
import { useAppTheme } from "../hooks/use-app-theme";

interface ThemeLoadingProps {
  message?: string;
  size?: "small" | "large";
  fullScreen?: boolean;
}

export function ThemeLoading({
  message = "Loading...",
  size = "large",
  fullScreen = true,
}: ThemeLoadingProps) {
  const { isDark } = useAppTheme();

  return (
    <View
      className={`flex-1 justify-center items-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <ActivityIndicator size={size} color={isDark ? "#818CF8" : "#4F46E5"} />
      <Text
        className={`mt-4 text-base ${
          isDark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {message}
      </Text>
    </View>
  );
}
