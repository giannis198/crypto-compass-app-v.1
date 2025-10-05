// components/EmptyState.tsx
import { useAppTheme } from "@/hooks/use-app-theme";
import { Text, View } from "react-native";

interface EmptyStateProps {
  search: string;
}

export function EmptyState({ search }: EmptyStateProps) {
  const { isDark } = useAppTheme();

  return (
    <View className="flex-1 justify-center items-center p-8">
      <Text
        className={`
        text-center text-lg
        ${isDark ? "text-indigo-300" : "text-indigo-600"}
      `}
      >
        {search ? "No coins found matching your search" : "No coins available"}
      </Text>
    </View>
  );
}
