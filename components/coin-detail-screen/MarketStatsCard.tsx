import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatLargeNumber, formatPercentage } from "@/lib/utils";
import { CardProps } from "../../types/crypto";
import { View } from "react-native";


export function MarketStatsCard({ coin, isDark, delay }: CardProps) {
  const marketCapChangeColor =
    coin.quotes.USD.market_cap_change_24h > 0
      ? isDark
        ? "text-green-400"
        : "text-green-600"
      : isDark
      ? "text-red-400"
      : "text-red-600";

  const volumeChangeColor =
    coin.quotes.USD.volume_24h_change_24h > 0
      ? isDark
        ? "text-green-400"
        : "text-green-600"
      : isDark
      ? "text-red-400"
      : "text-red-600";

  return (
    <AnimatedCard isDark={isDark} delay={delay}>
      <CardHeader>
        <CardTitle className={isDark ? "text-indigo-100" : "text-indigo-900"}>
          Market Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatRow label="Rank" value={`#${coin.rank}`} isDark={isDark} />

        <StatRow
          label="Market Cap"
          value={formatLargeNumber(coin.quotes.USD.market_cap)}
          isDark={isDark}
        />

        <StatRow
          label="24h Volume"
          value={formatLargeNumber(coin.quotes.USD.volume_24h)}
          isDark={isDark}
        />

        <StatRow
          label="Market Cap Change (24h)"
          value={formatPercentage(coin.quotes.USD.market_cap_change_24h).value}
          valueColor={marketCapChangeColor}
          isDark={isDark}
        />

        <StatRow
          label="Volume Change (24h)"
          value={formatPercentage(coin.quotes.USD.volume_24h_change_24h).value}
          valueColor={volumeChangeColor}
          isDark={isDark}
        />
      </CardContent>
    </AnimatedCard>
  );
}

function StatRow({ label, value, valueColor, isDark }: any) {
  const valueStyle =
    valueColor ||
    (isDark
      ? "font-semibold text-indigo-100"
      : "font-semibold text-indigo-900");

  return (
    <View className="flex-row justify-between">
      <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
        {label}
      </Text>
      <Text className={valueStyle}>{value}</Text>
    </View>
  );
}
