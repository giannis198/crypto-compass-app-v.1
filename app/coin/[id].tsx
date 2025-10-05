import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

import { getCoinImageUrl } from "@/actions/get-coin-image-url";
import Loading from "@/components/Loading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/hooks/use-app-theme";
import {
  formatCurrency,
  formatDate,
  formatLargeNumber,
  formatNumber,
  formatPercentage,
} from "@/lib/utils";
import { Coin } from "@/types/crypto";

type CoinDetailParams = {
  id: string;
};

export default function CoinDetailScreen() {
  const { isDark } = useAppTheme();
  const { id } = useLocalSearchParams<CoinDetailParams>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Animation values for the main container
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

        // Start main container animations when data is loaded
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

  const priceChange24h = formatPercentage(
    coin.quotes.USD.percent_change_24h,
    isDark
  );
  const priceChange7d = formatPercentage(
    coin.quotes.USD.percent_change_7d,
    isDark
  );
  const priceChange30d = formatPercentage(
    coin.quotes.USD.percent_change_30d,
    isDark
  );
  const athChange = formatPercentage(
    coin.quotes.USD.percent_from_price_ath,
    isDark
  );

  // Performance metrics variables
  const performance1h = formatPercentage(
    coin.quotes.USD.percent_change_1h,
    isDark
  );
  const performance6h = formatPercentage(
    coin.quotes.USD.percent_change_6h,
    isDark
  );
  const performance12h = formatPercentage(
    coin.quotes.USD.percent_change_12h,
    isDark
  );
  const performance1y = formatPercentage(
    coin.quotes.USD.percent_change_1y,
    isDark
  );

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
        {/* Header Card with Coin Image */}
        <AnimatedCard isDark={isDark} delay={0}>
          <CardHeader className="items-center">
            <Image
              source={{ uri: getCoinImageUrl(coin.id, "128x128") }}
              style={styles.coinImage}
              resizeMode="contain"
            />
            <CardTitle
              className={`text-2xl text-center mt-2 ${
                isDark ? "text-indigo-100" : "text-indigo-900"
              }`}
            >
              {coin.name}
            </CardTitle>
            <CardDescription
              className={`text-lg ${
                isDark ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              {coin.symbol}
            </CardDescription>
          </CardHeader>
        </AnimatedCard>

        {/* Price Card */}
        <AnimatedCard isDark={isDark} delay={100}>
          <CardHeader>
            <CardTitle
              className={isDark ? "text-indigo-100" : "text-indigo-900"}
            >
              Price
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Text
              className={`text-3xl font-bold ${
                isDark ? "text-indigo-100" : "text-indigo-900"
              }`}
            >
              {formatCurrency(coin.quotes.USD.price)}
            </Text>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                24h Change
              </Text>
              <Text className={priceChange24h.color}>
                {priceChange24h.value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                7d Change
              </Text>
              <Text className={priceChange7d.color}>{priceChange7d.value}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                30d Change
              </Text>
              <Text className={priceChange30d.color}>
                {priceChange30d.value}
              </Text>
            </View>
          </CardContent>
        </AnimatedCard>

        {/* Market Stats Card */}
        <AnimatedCard isDark={isDark} delay={200}>
          <CardHeader>
            <CardTitle
              className={isDark ? "text-indigo-100" : "text-indigo-900"}
            >
              Market Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                Rank
              </Text>
              <Text
                className={
                  isDark
                    ? "font-semibold text-indigo-100"
                    : "font-semibold text-indigo-900"
                }
              >
                #{coin.rank}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                Market Cap
              </Text>
              <Text
                className={
                  isDark
                    ? "font-semibold text-indigo-100"
                    : "font-semibold text-indigo-900"
                }
              >
                {formatLargeNumber(coin.quotes.USD.market_cap)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                24h Volume
              </Text>
              <Text
                className={
                  isDark
                    ? "font-semibold text-indigo-100"
                    : "font-semibold text-indigo-900"
                }
              >
                {formatLargeNumber(coin.quotes.USD.volume_24h)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                Market Cap Change (24h)
              </Text>
              <Text
                className={
                  coin.quotes.USD.market_cap_change_24h > 0
                    ? isDark
                      ? "text-green-400"
                      : "text-green-600"
                    : isDark
                    ? "text-red-400"
                    : "text-red-600"
                }
              >
                {formatPercentage(coin.quotes.USD.market_cap_change_24h).value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                Volume Change (24h)
              </Text>
              <Text
                className={
                  coin.quotes.USD.volume_24h_change_24h > 0
                    ? isDark
                      ? "text-green-400"
                      : "text-green-600"
                    : isDark
                    ? "text-red-400"
                    : "text-red-600"
                }
              >
                {formatPercentage(coin.quotes.USD.volume_24h_change_24h).value}
              </Text>
            </View>
          </CardContent>
        </AnimatedCard>

        {/* Supply Information */}
        <AnimatedCard isDark={isDark} delay={300}>
          <CardHeader>
            <CardTitle
              className={isDark ? "text-indigo-100" : "text-indigo-900"}
            >
              Supply Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                Circulating Supply
              </Text>
              <Text
                className={
                  isDark
                    ? "font-semibold text-indigo-100"
                    : "font-semibold text-indigo-900"
                }
              >
                {formatNumber(coin.circulating_supply)} {coin.symbol}
              </Text>
            </View>

            {coin.total_supply > 0 && (
              <View className="flex-row justify-between">
                <Text
                  className={isDark ? "text-indigo-300" : "text-indigo-600"}
                >
                  Total Supply
                </Text>
                <Text
                  className={
                    isDark
                      ? "font-semibold text-indigo-100"
                      : "font-semibold text-indigo-900"
                  }
                >
                  {formatNumber(coin.total_supply)} {coin.symbol}
                </Text>
              </View>
            )}

            {coin.max_supply > 0 && (
              <View className="flex-row justify-between">
                <Text
                  className={isDark ? "text-indigo-300" : "text-indigo-600"}
                >
                  Max Supply
                </Text>
                <Text
                  className={
                    isDark
                      ? "font-semibold text-indigo-100"
                      : "font-semibold text-indigo-900"
                  }
                >
                  {formatNumber(coin.max_supply)} {coin.symbol}
                </Text>
              </View>
            )}

            {coin.max_supply > 0 && (
              <View className="flex-row justify-between">
                <Text
                  className={isDark ? "text-indigo-300" : "text-indigo-600"}
                >
                  Circulation %
                </Text>
                <Text
                  className={
                    isDark
                      ? "font-semibold text-indigo-100"
                      : "font-semibold text-indigo-900"
                  }
                >
                  {((coin.circulating_supply / coin.max_supply) * 100).toFixed(
                    1
                  )}
                  %
                </Text>
              </View>
            )}
          </CardContent>
        </AnimatedCard>

        {/* All-Time High Information */}
        <AnimatedCard isDark={isDark} delay={400}>
          <CardHeader>
            <CardTitle
              className={isDark ? "text-indigo-100" : "text-indigo-900"}
            >
              All-Time High
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                ATH Price
              </Text>
              <Text
                className={
                  isDark
                    ? "font-semibold text-indigo-100"
                    : "font-semibold text-indigo-900"
                }
              >
                {formatCurrency(coin.quotes.USD.ath_price)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                ATH Date
              </Text>
              <Text
                className={
                  isDark
                    ? "font-semibold text-indigo-100"
                    : "font-semibold text-indigo-900"
                }
              >
                {formatDate(coin.quotes.USD.ath_date)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                From ATH
              </Text>
              <Text className={athChange.color}>{athChange.value}</Text>
            </View>
          </CardContent>
        </AnimatedCard>

        {/* Additional Performance Metrics */}
        <AnimatedCard isDark={isDark} delay={500}>
          <CardHeader>
            <CardTitle
              className={isDark ? "text-indigo-100" : "text-indigo-900"}
            >
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                1h Change
              </Text>
              <Text className={performance1h.color}>{performance1h.value}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                6h Change
              </Text>
              <Text className={performance6h.color}>{performance6h.value}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                12h Change
              </Text>
              <Text className={performance12h.color}>
                {performance12h.value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
                1y Change
              </Text>
              <Text className={performance1y.color}>{performance1y.value}</Text>
            </View>
          </CardContent>
        </AnimatedCard>

        {/* Additional Coin Info */}
        <AnimatedCard isDark={isDark} delay={600}>
          <CardHeader>
            <CardTitle
              className={isDark ? "text-indigo-100" : "text-indigo-900"}
            >
              About {coin.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text
              className={`mb-3 ${
                isDark ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              {coin.name} ({coin.symbol}) is currently ranked #{coin.rank} by
              market capitalization with a circulating supply of{" "}
              {formatNumber(coin.circulating_supply)} {coin.symbol}.
            </Text>
            <Text
              className={`mb-3 ${
                isDark ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              The current price is {formatCurrency(coin.quotes.USD.price)} with
              a{priceChange24h.isPositive ? " gain" : " loss"} of{" "}
              {coin.quotes.USD.percent_change_24h.toFixed(2)}% in the last 24
              hours.
            </Text>
            <Text
              className={`text-xs ${
                isDark ? "text-indigo-400" : "text-indigo-500"
              }`}
            >
              Last updated: {formatDate(coin.last_updated)}
            </Text>
          </CardContent>
        </AnimatedCard>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  coinImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
