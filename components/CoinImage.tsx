// components/coin/CoinImage.tsx
import { Image, View } from "react-native";
import { getCoinImageUrl } from "@/actions/get-coin-image-url";

interface CoinImageProps {
  coinId: string;
  size?: number;
}

export function CoinImage({ coinId, size = 32 }: CoinImageProps) {
  return (
    <View className="mr-3">
      <Image
        source={{ uri: getCoinImageUrl(coinId, `${size}x${size}`) }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="contain"
      />
    </View>
  );
}
