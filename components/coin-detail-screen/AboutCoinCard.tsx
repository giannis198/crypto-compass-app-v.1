import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import { CardProps } from "../../types/crypto";


export function AboutCoinCard({ coin, isDark, delay }: CardProps) {
  return (
    <AnimatedCard isDark={isDark} delay={delay}>
      <CardHeader>
        <CardTitle className={isDark ? "text-indigo-100" : "text-indigo-900"}>
          About {coin.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text
          className={`mb-3 ${isDark ? "text-indigo-300" : "text-indigo-600"}`}
        >
          {coin.name} ({coin.symbol}) is currently ranked #{coin.rank} by market
          capitalization with a circulating supply of{" "}
          {formatNumber(coin.circulating_supply)} {coin.symbol}.
        </Text>
        <Text
          className={`mb-3 ${isDark ? "text-indigo-300" : "text-indigo-600"}`}
        >
          The current price is {formatCurrency(coin.quotes.USD.price)} with a{" "}
          {coin.quotes.USD.percent_change_24h >= 0 ? "gain" : "loss"} of{" "}
          {Math.abs(coin.quotes.USD.percent_change_24h).toFixed(2)}% in the last
          24 hours.
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
  );
}
