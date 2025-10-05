import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { CardProps } from "../../types/crypto";
import { View } from "react-native";

export function PriceCard({ coin, isDark, delay }: CardProps) {
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

  return (
    <AnimatedCard isDark={isDark} delay={delay}>
      <CardHeader>
        <CardTitle className={isDark ? "text-indigo-100" : "text-indigo-900"}>
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

        <StatRow
          label="24h Change"
          value={priceChange24h.value}
          valueColor={priceChange24h.color}
          isDark={isDark}
        />

        <StatRow
          label="7d Change"
          value={priceChange7d.value}
          valueColor={priceChange7d.color}
          isDark={isDark}
        />

        <StatRow
          label="30d Change"
          value={priceChange30d.value}
          valueColor={priceChange30d.color}
          isDark={isDark}
        />
      </CardContent>
    </AnimatedCard>
  );
}

function StatRow({ label, value, valueColor, isDark }: any) {
  return (
    <View className="flex-row justify-between">
      <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
        {label}
      </Text>
      <Text className={valueColor}>{value}</Text>
    </View>
  );
}
