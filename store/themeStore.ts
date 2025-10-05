// store/themeStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemePreference = "system" | "light" | "dark";

interface ThemeStore {
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themePreference: "system",
      setThemePreference: (themePreference) => set({ themePreference }),
      _hasHydrated: false,
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const useThemePreference = () =>
  useThemeStore((state) => state.themePreference);

export const useSetThemePreference = () =>
  useThemeStore((state) => state.setThemePreference);

export const useHasHydrated = () =>
  useThemeStore((state) => state._hasHydrated);
