import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeStore } from "@/store/themeStore";

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const { themePreference } = useThemeStore();

  const isDark =
    themePreference === "system"
      ? colorScheme === "dark"
      : themePreference === "dark";

  return {
    isDark,
    themePreference,
    backgroundColor: isDark ? "#111827" : "#F9FAFB",
    textColor: isDark ? "#F3F4F6" : "#1F2937",
  };
}
