import { Image, StyleSheet, View } from "react-native";
import { Text } from "./ui/text";
import { useAppTheme } from "@/hooks/use-app-theme";

const Logo = () => {
  const { isDark } = useAppTheme();

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text
          className={
            isDark
              ? "text-indigo-200 text-xl font-bold ml-2"
              : "text-indigo-700 text-xl font-bold ml-2"
          }
        >
          Crypto Compass
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
});

export default Logo;
