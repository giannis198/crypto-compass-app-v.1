import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { useAppTheme } from "@/hooks/use-app-theme";
import { BackgroundProvider } from "@/provider/BackgroundProvider";
import { ThemeLoading } from "@/components/ThemeLoading";
import { useHasHydrated } from "@/store/themeStore";

const IndigoDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#818CF8",
    background: "#111827",
    card: "#1F2937",
    text: "#F3F4F6",
    border: "#4F46E5",
    notification: "#818CF8",
  },
};

const IndigoLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4F46E5",
    background: "#F9FAFB",
    card: "#FFFFFF",
    text: "#1F2937",
    border: "#A5B4FC",
    notification: "#4F46E5",
  },
};

export default function RootLayout() {
  const { isDark } = useAppTheme();
  const hasHydrated = useHasHydrated();

  const currentTheme = isDark ? IndigoDarkTheme : IndigoLightTheme;

  if (!hasHydrated) {
    return (
      <SafeAreaProvider>
        <ThemeLoading />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <BackgroundProvider>
        <ThemeProvider value={currentTheme}>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: currentTheme.colors.background,
              },
              headerStyle: {
                backgroundColor: currentTheme.colors.card,
              },
              headerTintColor: currentTheme.colors.primary,
              headerTitleStyle: {
                color: currentTheme.colors.text,
                fontWeight: "600",
              },
              headerShadowVisible: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, animation: "fade" }}
            />
            <Stack.Screen
              name="coin"
              options={{ headerShown: false, presentation: "modal" }}
            />
          </Stack>
        </ThemeProvider>
      </BackgroundProvider>
    </SafeAreaProvider>
  );
}
