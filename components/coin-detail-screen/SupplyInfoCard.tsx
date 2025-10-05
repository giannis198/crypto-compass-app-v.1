import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatNumber } from "@/lib/utils";
import { CardProps } from "../../types/crypto";
import { View } from "react-native";

export function SupplyInfoCard({ coin, isDark, delay }: CardProps) {
  const circulationPercent =
    coin.max_supply > 0
      ? ((coin.circulating_supply / coin.max_supply) * 100).toFixed(1)
      : null;

  return (
    <AnimatedCard isDark={isDark} delay={delay}>
      <CardHeader>
        <CardTitle className={isDark ? "text-indigo-100" : "text-indigo-900"}>
          Supply Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatRow
          label="Circulating Supply"
          value={`${formatNumber(coin.circulating_supply)} ${coin.symbol}`}
          isDark={isDark}
        />

        {coin.total_supply > 0 && (
          <StatRow
            label="Total Supply"
            value={`${formatNumber(coin.total_supply)} ${coin.symbol}`}
            isDark={isDark}
          />
        )}

        {coin.max_supply > 0 && (
          <StatRow
            label="Max Supply"
            value={`${formatNumber(coin.max_supply)} ${coin.symbol}`}
            isDark={isDark}
          />
        )}

        {circulationPercent && (
          <StatRow
            label="Circulation %"
            value={`${circulationPercent}%`}
            isDark={isDark}
          />
        )}
      </CardContent>
    </AnimatedCard>
  );
}

function StatRow({ label, value, isDark }: any) {
  return (
    <View className="flex-row justify-between">
      <Text className={isDark ? "text-indigo-300" : "text-indigo-600"}>
        {label}
      </Text>
      <Text
        className={
          isDark
            ? "font-semibold text-indigo-100"
            : "font-semibold text-indigo-900"
        }
      >
        {value}
      </Text>
    </View>
  );
}
