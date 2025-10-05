// components/coin/PriceInfo.tsx
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { formatCurrency } from "@/lib/utils";
import { useAppTheme } from "@/hooks/use-app-theme";

interface PriceInfoProps {
  price: number;
  percentChange24h: number;
}

export function PriceInfo({ price, percentChange24h }: PriceInfoProps) {
  const { isDark } = useAppTheme();
  const isPositive = percentChange24h > 0;

  return (
    <View className="items-end">
      <Text
        className={
          isDark
            ? "font-semibold text-indigo-100 mb-1"
            : "font-semibold text-indigo-900 mb-1"
        }
      >
        {formatCurrency(price)}
      </Text>
      <Text
        className={`text-xs font-medium ${
          isPositive
            ? isDark
              ? "text-green-400"
              : "text-green-600"
            : isDark
            ? "text-red-400"
            : "text-red-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {percentChange24h?.toFixed(2)}%
      </Text>
    </View>
  );
}
