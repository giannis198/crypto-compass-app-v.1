// components/TableRow.tsx
import { useAppTheme } from "@/hooks/use-app-theme";
import { Coin } from "@/types/crypto";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { CoinImage } from "./CoinImage";
import { getNameTextSize } from "@/lib/utils";

interface TableRowProps {
  item: Coin;
}

export function TableRow({ item }: TableRowProps) {
  const { isDark } = useAppTheme();
  const router = useRouter();

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(4);
    if (price < 10) return price.toFixed(3);
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/coin/${item.id}`)}
      className={`
        flex-row border-b
        ${isDark ? "border-gray-800" : "border-gray-200"}
        ${isDark ? "bg-gray-800" : "bg-white"}
        active:opacity-70
      `}
    >
      {/* Rank */}
      <View className="w-8 justify-center items-center p-1">
        <Text
          className={`
          text-xs
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
        >
          {item.rank}
        </Text>
      </View>

      {/* Name */}
      <View className="flex-1 justify-center p-2">
        <View className="flex-row items-center">
          <CoinImage coinId={item.id} />
          <View className="ml-2 flex-1">
            <Text
              className={`
              font-medium ${getNameTextSize(item.name)}
              ${isDark ? "text-indigo-100" : "text-indigo-900"}
              ${item.name.length > 15 ? "leading-4" : "leading-5"}
            `}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <Text
              className={`
              text-xs mt-0.5
              ${isDark ? "text-indigo-300" : "text-indigo-600"}
            `}
            >
              {item.symbol}
            </Text>
          </View>
        </View>
      </View>

      {/* Price */}
      <View className="w-20 justify-center p-1">
        <Text
          className={`
          ${isDark ? "text-indigo-100 font-bold" : "text-indigo-900 font-bold"}
        `}
          numberOfLines={1}
        >
          ${formatPrice(item.quotes.USD.price)}
        </Text>
      </View>

      {/* Market Cap */}
      <View className="w-20 justify-center p-1">
        <Text
          className={`
          text-xs
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
          numberOfLines={1}
        >
          ${(item.quotes.USD.market_cap / 1_000_000_000).toFixed(2)}B
        </Text>
      </View>

      {/* 24h % */}
      <View className="w-12 justify-center items-center p-1">
        <Text
          className={`
          text-xs font-medium
          ${
            item.quotes.USD.percent_change_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }
        `}
        >
          {item.quotes.USD.percent_change_24h > 0 ? "+" : ""}
          {item.quotes.USD.percent_change_24h.toFixed(1)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}
