import { TabsHeader } from "@/components/TabsHeader";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeStore } from "@/store/themeStore";
import { Check, Bell, DollarSign, Info } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type ThemePreference = "system" | "light" | "dark";

interface SettingsSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

export default function Settings() {
  const systemColorScheme = useColorScheme();
  const { themePreference, setThemePreference } = useThemeStore();

  const isDark =
    themePreference === "system"
      ? systemColorScheme === "dark"
      : themePreference === "dark";

  const ThemeOption = ({
    value,
    label,
    description,
  }: {
    value: ThemePreference;
    label: string;
    description: string;
  }) => (
    <TouchableOpacity
      onPress={() => setThemePreference(value)}
      className={`
        flex-row items-center justify-between p-4 rounded-lg mb-2 border
        ${
          isDark
            ? "bg-gray-800 border-indigo-600"
            : "bg-white border-indigo-300"
        }
      `}
    >
      <View className="flex-1">
        <Text
          className={`
          font-medium
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
        >
          {label}
        </Text>
        <Text
          className={`
          text-sm mt-1
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
        >
          {description}
        </Text>
      </View>
      {themePreference === value && (
        <Check size={20} color={isDark ? "#818CF8" : "#4F46E5"} />
      )}
    </TouchableOpacity>
  );

  const SettingsCard = ({
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children: React.ReactNode;
  }) => (
    <View className="mx-4 my-2">
      {title && (
        <Text
          className={`
            text-lg font-semibold mb-3
            ${isDark ? "text-indigo-100" : "text-indigo-900"}
          `}
        >
          {title}
        </Text>
      )}
      <View
        className={`
          rounded-xl p-4 border
          ${
            isDark
              ? "bg-gray-800 border-indigo-600"
              : "bg-white border-indigo-300"
          }
        `}
      >
        {description && (
          <Text
            className={`
              text-sm mb-3
              ${isDark ? "text-indigo-300" : "text-indigo-600"}
            `}
          >
            {description}
          </Text>
        )}
        {children}
      </View>
    </View>
  );

  const getCurrentThemeText = () => {
    if (themePreference === "system") {
      return `System (${systemColorScheme === "dark" ? "Dark" : "Light"})`;
    }
    return themePreference === "dark" ? "Dark" : "Light";
  };

  const settingsSections: SettingsSection[] = [
    {
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: <Bell size={20} color={isDark ? "#818CF8" : "#4F46E5"} />,
    },
    {
      title: "Currency",
      description: "Set your preferred currency (USD, EUR, GBP)",
      icon: <DollarSign size={20} color={isDark ? "#818CF8" : "#4F46E5"} />,
    },
    {
      title: "About",
      description: "Crypto Compass v1.0.0",
      icon: <Info size={20} color={isDark ? "#818CF8" : "#4F46E5"} />,
    },
  ];

  return (
    <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
      <TabsHeader title="Settings" subtitle="Customize your app experience" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Current Theme Banner */}
        <View
          className={`
            mx-4 my-4 rounded-xl p-4 border
            ${
              isDark
                ? "bg-indigo-950 border-indigo-600"
                : "bg-indigo-50 border-indigo-300"
            }
          `}
        >
          <Text
            className={`
              text-sm font-medium
              ${isDark ? "text-indigo-300" : "text-indigo-700"}
            `}
          >
            Current theme: {getCurrentThemeText()}
          </Text>
        </View>

        {/* Appearance Settings */}
        <SettingsCard title="Appearance">
          <ThemeOption
            value="system"
            label="System Default"
            description="Follow your device theme settings"
          />
          <ThemeOption
            value="light"
            label="Light Mode"
            description="Always use light theme"
          />
          <ThemeOption
            value="dark"
            label="Dark Mode"
            description="Always use dark theme"
          />
        </SettingsCard>

        {/* Other Settings Sections */}
        <View className="mt-4">
          {settingsSections.map((section, index) => (
            <TouchableOpacity
              key={section.title}
              onPress={section.onPress}
              className={`
                mx-4 my-2 rounded-xl p-4 border flex-row items-center
                ${
                  isDark
                    ? "bg-gray-800 border-indigo-600"
                    : "bg-white border-indigo-300"
                }
              `}
            >
              <View className="mr-3">{section.icon}</View>
              <View className="flex-1">
                <Text
                  className={`
                    font-semibold
                    ${isDark ? "text-indigo-100" : "text-indigo-900"}
                  `}
                >
                  {section.title}
                </Text>
                <Text
                  className={`
                    text-sm mt-1
                    ${isDark ? "text-indigo-300" : "text-indigo-600"}
                  `}
                >
                  {section.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Additional Info Section */}
        <View
          className={`
          mx-4 my-6 p-6 rounded-xl border
          ${
            isDark
              ? "bg-indigo-950 border-indigo-600"
              : "bg-indigo-50 border-indigo-300"
          }
        `}
        >
          <Text
            className={`
              text-lg font-semibold text-center mb-3
              ${isDark ? "text-indigo-100" : "text-indigo-900"}
            `}
          >
            🧭 Crypto Compass
          </Text>
          <Text
            className={`
              text-sm text-center leading-5
              ${isDark ? "text-indigo-300" : "text-indigo-600"}
            `}
          >
            Your guide through the cryptocurrency landscape.{"\n"}
            Track markets, discover opportunities, and manage your investments.
          </Text>
        </View>

        {/* More spacing at the bottom */}
        <View className="h-10 mb-10" />
      </ScrollView>
    </View>
  );
}
