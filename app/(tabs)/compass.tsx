import { TabsHeader } from "@/components/TabsHeader";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Compass() {
  const { isDark } = useAppTheme();

  return (
    <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>

      <TabsHeader
        title="Discover"
        subtitle="Explore new cryptocurrencies and market insights"
      />

   
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
            🚧 Discover Coming Soon
          </Text>
          <Text
            className={`
              text-base text-center leading-6 mb-2
              ${isDark ? "text-indigo-300" : "text-indigo-600"}
            `}
          >
            We are building an amazing discovery experience for you!
          </Text>
          <Text
            className={`
              text-sm text-center leading-6
              ${isDark ? "text-indigo-400" : "text-indigo-500"}
            `}
          >
            Explore new cryptocurrencies, trending assets,{"\n"}
            and market insights all in one place.
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
              🔍 Coming Soon: Crypto Discovery
            </Text>
          </View>

   
          <View className="mt-12 w-full">
            <Text
              className={`
              text-lg font-semibold text-center mb-6
              ${isDark ? "text-indigo-100" : "text-indigo-900"}
            `}
            >
              Planned Features
            </Text>

            <View className="space-y-4">
              {[
                "📈 Trending cryptocurrencies",
                "🆕 New coin listings & launches",
                "📊 Market analysis tools",
                "💎 Hidden gem discoveries",
                "🌐 DeFi protocol exploration",
                "🚀 Upcoming projects",
                "📉 Market sentiment analysis",
                "🎯 Personalized recommendations",
                "🏆 Top gainers & losers",
                "🔮 Price prediction insights",
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

    
          <View
            className={`
            mt-8 p-6 rounded-xl border w-full
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
              Ready to Explore the Crypto World?
            </Text>
            <Text
              className={`
              text-sm text-center
              ${isDark ? "text-indigo-300" : "text-indigo-600"}
            `}
            >
              Our discovery tools will help you find the next big opportunity
              and stay ahead of market trends with comprehensive insights and
              analysis.
            </Text>
          </View>

        
          <View className="h-20" />
        </View>
      </ScrollView>
    </View>
  );
}
