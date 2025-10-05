// components/Loading.tsx
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "./ui/text";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

const Loading = ({
  fullScreen = true,
  message = "Loading cryptocurrencies...",
}: LoadingProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className={
        fullScreen
          ? isDark
            ? "flex-1 bg-gray-900 absolute inset-0 z-50 justify-center items-center"
            : "flex-1 bg-gray-50 absolute inset-0 z-50 justify-center items-center"
          : isDark
          ? "flex-1 justify-center items-center py-20 bg-gray-900"
          : "flex-1 justify-center items-center py-20 bg-gray-50"
      }
    >
      <ActivityIndicator size="large" color={isDark ? "#818CF8" : "#4F46E5"} />
      <Text
        className={isDark ? "text-indigo-300 mt-4" : "text-indigo-600 mt-4"}
      >
        {message}
      </Text>
    </View>
  );
};

export default Loading;
