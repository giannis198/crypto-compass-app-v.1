import { Image } from "react-native";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCoinImageUrl } from "@/actions/get-coin-image-url";

import { styles } from "./styles";
import { CardProps } from "../../types/crypto";

export function CoinHeaderCard({ coin, isDark, delay }: CardProps) {
  return (
    <AnimatedCard isDark={isDark} delay={delay}>
      <CardHeader className="items-center">
        <Image
          source={{ uri: getCoinImageUrl(coin.id, "128x128") }}
          style={styles.coinImage}
          resizeMode="contain"
        />
        <CardTitle
          className={`text-2xl text-center mt-2 ${
            isDark ? "text-indigo-100" : "text-indigo-900"
          }`}
        >
          {coin.name}
        </CardTitle>
        <CardDescription
          className={`text-lg ${
            isDark ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          {coin.symbol}
        </CardDescription>
      </CardHeader>
    </AnimatedCard>
  );
}
