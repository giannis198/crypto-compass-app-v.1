// components/coin/CoinInfo.tsx
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { formatMarketCapPrecise } from "@/lib/utils";
import { useAppTheme } from "@/hooks/use-app-theme";

interface CoinInfoProps {
  name: string;
  symbol: string;
  marketCap: number;
}

export function CoinInfo({ name, symbol, marketCap }: CoinInfoProps) {
  const { isDark } = useAppTheme();
  return (
    <View className="flex-1">
      <Text
        className={
          isDark
            ? "font-semibold text-indigo-100"
            : "font-semibold text-indigo-900"
        }
      >
        {name}
      </Text>
      <Text
        className={
          isDark ? "text-indigo-400 text-sm" : "text-indigo-600 text-sm"
        }
      >
        {symbol}
      </Text>
      <Text
        className={
          isDark
            ? "text-indigo-300 text-xs mb-1"
            : "text-indigo-700 text-xs mb-1"
        }
      >
        {formatMarketCapPrecise(marketCap)}
      </Text>
    </View>
  );
}
