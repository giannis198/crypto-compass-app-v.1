import { useAppTheme } from "@/hooks/use-app-theme";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { backgroundColor, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />
      {children}
    </View>
  );
}
