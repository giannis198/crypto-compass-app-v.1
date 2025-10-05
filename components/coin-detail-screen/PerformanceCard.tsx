import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatPercentage } from "@/lib/utils";

import { View } from "react-native";
import { CardProps } from "../../types/crypto";

export function PerformanceCard({ coin, isDark, delay }: CardProps) {
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
    <AnimatedCard isDark={isDark} delay={delay}>
      <CardHeader>
        <CardTitle className={isDark ? "text-indigo-100" : "text-indigo-900"}>
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatRow
          label="1h Change"
          value={performance1h.value}
          valueColor={performance1h.color}
          isDark={isDark}
        />

        <StatRow
          label="6h Change"
          value={performance6h.value}
          valueColor={performance6h.color}
          isDark={isDark}
        />

        <StatRow
          label="12h Change"
          value={performance12h.value}
          valueColor={performance12h.color}
          isDark={isDark}
        />

        <StatRow
          label="1y Change"
          value={performance1y.value}
          valueColor={performance1y.color}
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
