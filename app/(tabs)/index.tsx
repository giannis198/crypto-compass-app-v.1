import { useCryptoStore } from "@/store/cryptoStore";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

import Loading from "@/components/Loading";
import { Table } from "@/components/table/Table";
import { TabsHeader } from "@/components/TabsHeader";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const { isDark } = useAppTheme();

  const {
    coins,
    loading,
    error,
    loadCoinsFromStorage,
    refreshData,
    fetchMoreCoins,
    refreshing,
  } = useCryptoStore();

  useEffect(() => {
    loadCoinsFromStorage();
  }, [loadCoinsFromStorage]);

  if (loading && coins.length === 0) {
    return (
      <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
        <TabsHeader
          title=" Cryptocurrencies"
          subtitle="Top coins by market cap"
        />
        <Loading fullScreen={true} />
      </View>
    );
  }

  if (error && coins.length === 0) {
    return (
      <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
        <TabsHeader
          title=" Cryptocurrencies"
          subtitle="Top coins by market cap"
        />
        <View className="flex-1 justify-center items-center p-4">
          <Text
            className={
              isDark
                ? "text-red-400 text-center mb-4"
                : "text-red-500 text-center mb-4"
            }
          >
            Error: {error}
          </Text>
          <Text
            className={
              isDark
                ? "text-indigo-400 text-center"
                : "text-indigo-600 text-center"
            }
            onPress={refreshData}
          >
            Tap to retry
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
      {/* Header */}
      <TabsHeader title="Cryptocurrencies" subtitle="Top coins by market cap" />

      {/* Search Input */}
      <View className="p-4">
        <TextInput
          placeholder="Search..."
          placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
          value={search}
          onChangeText={setSearch}
          className={
            isDark
              ? "bg-gray-800 text-indigo-50 rounded-lg p-2"
              : "bg-gray-200 text-black rounded-lg p-2"
          }
        />
      </View>

      {/* Coin Table */}
      <Table
        data={coins}
        search={search}
        fetchMoreCoins={fetchMoreCoins}
        refreshData={refreshData}
        refreshing={refreshing}
      />
    </View>
  );
}
