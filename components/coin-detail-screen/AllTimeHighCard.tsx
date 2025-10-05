import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatCurrency, formatDate, formatPercentage } from "@/lib/utils";

import { View } from "react-native";
import { CardProps } from "../../types/crypto";

export function AllTimeHighCard({ coin, isDark, delay }: CardProps) {
  const athChange = formatPercentage(
    coin.quotes.USD.percent_from_price_ath,
    isDark
  );

  return (
    <AnimatedCard isDark={isDark} delay={delay}>
      <CardHeader>
        <CardTitle className={isDark ? "text-indigo-100" : "text-indigo-900"}>
          All-Time High
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatRow
          label="ATH Price"
          value={formatCurrency(coin.quotes.USD.ath_price)}
          isDark={isDark}
        />

        <StatRow
          label="ATH Date"
          value={formatDate(coin.quotes.USD.ath_date)}
          isDark={isDark}
        />

        <StatRow
          label="From ATH"
          value={athChange.value}
          valueColor={athChange.color}
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
