import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";

import Loading from "@/components/Loading";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Coin, CoinDetailParams } from "@/types/crypto";
import {
  AboutCoinCard,
  AllTimeHighCard,
  CoinHeaderCard,
  MarketStatsCard,
  PerformanceCard,
  PriceCard,
  SupplyInfoCard,
} from "../../components/coin-detail-screen";
import { ThemeLoading } from "../../components/ThemeLoading";

export default function CoinDetailScreen() {
  const { isDark } = useAppTheme();
  const { id } = useLocalSearchParams<CoinDetailParams>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.coinpaprika.com/v1/tickers/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coin data: ${response.status}`);
        }
        const coinData = await response.json();
        setCoin(coinData);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCoin();
    }
  }, [id, fadeAnim, slideAnim]);

  if (loading) {
    return <Loading />;
  }

  if (loading) {
    return <ThemeLoading message="Loading coin data..." />;
  }

  if (error) {
    return (
      <View
        className={`flex-1 p-4 justify-center items-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Text className={isDark ? "text-red-400" : "text-red-600"}>
          Error: {error}
        </Text>
      </View>
    );
  }

  if (!coin) {
    return (
      <View
        className={`flex-1 p-4 justify-center items-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Text className={isDark ? "text-indigo-100" : "text-indigo-900"}>
          No coin data found.
        </Text>
      </View>
    );
  }

  return (
    <Animated.ScrollView
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}
      showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        <CoinHeaderCard coin={coin} isDark={isDark} delay={0} />
        <PriceCard coin={coin} isDark={isDark} delay={100} />
        <MarketStatsCard coin={coin} isDark={isDark} delay={200} />
        <SupplyInfoCard coin={coin} isDark={isDark} delay={300} />
        <AllTimeHighCard coin={coin} isDark={isDark} delay={400} />
        <PerformanceCard coin={coin} isDark={isDark} delay={500} />
        <AboutCoinCard coin={coin} isDark={isDark} delay={600} />
      </View>
    </Animated.ScrollView>
  );
}
