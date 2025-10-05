// components/coin/CoinRank.tsx
import { Text } from "@/components/ui/text";

interface CoinRankProps {
  rank: number;
}

export function CoinRank({ rank }: CoinRankProps) {
  return <Text className="w-8 text-gray-500 text-sm font-medium">#{rank}</Text>;
}
