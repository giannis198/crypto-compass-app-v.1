import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";
import { TabsHeader } from "@/components/TabsHeader";

const { width, height } = Dimensions.get("window");

export default function News() {
  const { isDark } = useAppTheme();

  return (
    <ScrollView
      className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TabsHeader
        title="Crypto News"
        subtitle="Stay updated with the latest cryptocurrency news"
      />

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-6 py-8">
        <Image
          source={require("@/assets/images/under-construction.avif")}
          style={{
            width: width * 0.8,
            height: height * 0.4,
            maxHeight: 400,
          }}
          resizeMode="contain"
          className="mb-8"
        />
        <Text
          className={`
            text-2xl font-bold text-center mb-4
            ${isDark ? "text-indigo-100" : "text-indigo-900"}
          `}
        >
          🚧 Under Construction
        </Text>
        <Text
          className={`
            text-base text-center leading-6 mb-2
            ${isDark ? "text-indigo-300" : "text-indigo-600"}
          `}
        >
          We are working hard to bring you the latest crypto news!
        </Text>
        <Text
          className={`
            text-sm text-center leading-6
            ${isDark ? "text-indigo-400" : "text-indigo-500"}
          `}
        >
          Stay tuned for real-time market updates,{"\n"}
          analysis, and breaking news.
        </Text>

        <View
          className={`
          mt-8 px-4 py-3 rounded-lg border
          ${
            isDark
              ? "bg-indigo-950 border-indigo-600"
              : "bg-indigo-50 border-indigo-300"
          }
        `}
        >
          <Text
            className={`
            text-sm text-center
            ${isDark ? "text-indigo-200" : "text-indigo-700"}
          `}
          >
            📰 Coming Soon: Live News Feed
          </Text>
        </View>

        <View className="mt-12 w-full">
          <Text
            className={`
            text-lg font-semibold text-center mb-6
            ${isDark ? "text-indigo-100" : "text-indigo-900"}
          `}
          >
            Features Coming Soon
          </Text>

          <View className="space-y-4">
            {[
              "📊 Real-time market analysis",
              "🔔 Personalized news alerts",
              "🌐 Global crypto coverage",
              "📈 Technical analysis insights",
              "🎯 Expert opinions and forecasts",
            ].map((feature, index) => (
              <View
                key={index}
                className={`
                  flex-row items-center p-3 rounded-lg border
                  ${
                    isDark
                      ? "bg-gray-800 border-indigo-600"
                      : "bg-white border-indigo-300"
                  }
                `}
              >
                <Text
                  className={`
                  text-sm ml-2
                  ${isDark ? "text-indigo-200" : "text-indigo-700"}
                `}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="h-20" />
      </View>
    </ScrollView>
  );
}
