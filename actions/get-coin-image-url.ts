export const getCoinImageUrl = (coinId: string, size: string = "32x32") => {
  return `https://static.coinpaprika.com/coin/${coinId}/logo.png?size=${size}`;
};
