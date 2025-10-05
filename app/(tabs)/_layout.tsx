import Logo from "@/components/Logo";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Tabs } from "expo-router";
import {
  Compass,
  Home,
  Newspaper,
  Settings,
  Wallet,
} from "lucide-react-native";
import { Platform as RNPlatform, View } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function TabLayout() {
  const { isDark, backgroundColor } = useAppTheme();

  // Platform-specific styling
  const isMobile = RNPlatform.OS !== "web";
  const tabBarHeight = isMobile ? 85 : 60;
  const labelFontSize = isMobile ? 12 : 12;
  const iconSize = isMobile ? 24 : 20;

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: isDark ? "#A5B4FC" : "#3730A3",
          tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
          tabBarStyle: {
            backgroundColor: isDark ? "#111827" : "#F9FAFB",
            borderTopColor: isDark ? "#4F46E5" : "#C7D2FE",
            borderTopWidth: 1,
            height: tabBarHeight,
            paddingBottom: isMobile ? 12 : 0,
            paddingTop: isMobile ? 8 : 0,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarLabelStyle: {
            fontSize: labelFontSize,
            fontWeight: "600",
            marginBottom: isMobile ? 8 : 0,
          },
          header: () => <Logo />,
          tabBarBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: isDark ? "#111827" : "#F9FAFB",
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Markets",
            tabBarIcon: ({ color, size, focused }) => (
              <Home
                size={iconSize}
                color={color}
                fill={focused ? color : "transparent"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: "News",
            tabBarIcon: ({ color, size, focused }) => (
              <Newspaper
                size={iconSize}
                color={color}
                fill={focused ? color : "transparent"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            title: "Portfolio",
            tabBarIcon: ({ color, size, focused }) => (
              <Wallet
                size={iconSize}
                color={color}
                fill={focused ? color : "transparent"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="compass"
          options={{
            title: "Discover",
            tabBarIcon: ({ color, size, focused }) => (
              <Compass
                size={iconSize}
                color={color}
                fill={focused ? color : "transparent"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size, focused }) => (
              <Settings
                size={iconSize}
                color={color}
                fill={focused ? color : "transparent"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
