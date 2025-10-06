import { Coin } from "@/types/crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface CryptoState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  refreshing: boolean;
  fetchCoins: () => Promise<void>;
  fetchMoreCoins: () => Promise<void>;
  loadCoinsFromStorage: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  coins: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  refreshing: false,
  fetchCoins: async () => {
    if (!get().hasMore) return;
    set({ loading: true });
    try {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/tickers?page=${get().page}`
      );
      const newCoins = await response.json();

      if (newCoins.length === 0) {
        set({ hasMore: false });
      }

      const currentCoins = get().coins;
      const uniqueNewCoins = newCoins.filter(
        (newCoin: Coin) => !currentCoins.some((coin) => coin.id === newCoin.id)
      );

      const coinsToStore = [...currentCoins, ...uniqueNewCoins];

      await AsyncStorage.setItem("coins", JSON.stringify(coinsToStore));
      set({
        coins: coinsToStore,
        loading: false,
        page: get().page + 1,
        refreshing: false,
      });
    } catch (e) {
      set({
        error: "Failed to fetch coins",
        loading: false,
        refreshing: false,
      });
    }
  },
  fetchMoreCoins: async () => {
    get().fetchCoins();
  },
  loadCoinsFromStorage: async () => {
    set({ loading: true });
    try {
      const storedCoins = await AsyncStorage.getItem("coins");
      if (storedCoins) {
        const parsedCoins = JSON.parse(storedCoins);
        const uniqueCoins = parsedCoins.filter(
          (coin: Coin, index: number, array: Coin[]) =>
            array.findIndex((c) => c.id === coin.id) === index
        );

        set({ coins: uniqueCoins, loading: false, page: 1 });
      } else {
        get().fetchCoins();
      }
    } catch (e) {
      set({ error: "Could not load data from storage", loading: false });
    }
  },
  refreshData: async () => {
    set({ refreshing: true, page: 1, hasMore: true });
    try {
      const response = await fetch(
        "https://api.coinpaprika.com/v1/tickers?page=1"
      );
      const newCoins = await response.json();

      await AsyncStorage.setItem("coins", JSON.stringify(newCoins));
      set({
        coins: newCoins,
        loading: false,
        page: 2,
        refreshing: false,
      });
    } catch (e) {
      set({
        error: "Failed to refresh coins",
        refreshing: false,
      });
    }
  },
}));
