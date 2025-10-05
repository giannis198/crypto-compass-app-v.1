import { View, Text } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

interface TabsHeaderProps {
  title: string;
  subtitle?: string;
}

export function TabsHeader({ title, subtitle }: TabsHeaderProps) {
  const { isDark } = useAppTheme();

  return (
    <View
      className={
        isDark
          ? "bg-gray-800 px-4 py-4 border-b border-indigo-600"
          : "bg-gray-100 px-4 py-4 border-b border-t border-indigo-300"
      }
    >
      <Text
        className={`
          text-2xl font-bold
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          className={`
            mt-2
            ${isDark ? "text-indigo-300" : "text-indigo-600"}
          `}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
