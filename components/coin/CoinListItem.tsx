// components/coin/CoinListItem.tsx
import { useAppTheme } from "@/hooks/use-app-theme";
import { Coin } from "@/types/crypto";
import { Link } from "expo-router";
import { View } from "react-native";
import { PriceInfo } from "./PriceInfo";
import { CoinImage } from "./CoinImage";
import { CoinInfo } from "./CoinInfo";
import { CoinRank } from "./CoinRank";

interface CoinListItemProps {
  coin: Coin; // Use the shared Coin type
}
export function CoinListItem({ coin }: CoinListItemProps) {
  const { isDark } = useAppTheme();
  return (
    <Link href={`/coin/${coin.id}`} asChild>
      <View
        className={
          isDark
            ? "flex-row items-center p-4 bg-gray-900 border-b border-indigo-600 active:bg-gray-800"
            : "flex-row items-center p-4 bg-gray-50 border-b border-indigo-300 active:bg-gray-100"
        }
      >
        <CoinRank rank={coin.rank} />
        <CoinImage coinId={coin.id} />
        <CoinInfo
          name={coin.name}
          symbol={coin.symbol}
          marketCap={coin.quotes.USD.market_cap}
        />
        <PriceInfo
          price={coin.quotes.USD.price}
          percentChange24h={coin.quotes.USD.percent_change_24h}
        />
      </View>
    </Link>
  );
}
