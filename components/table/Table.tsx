// components/Table.tsx
import { useAppTheme } from "@/hooks/use-app-theme";
import { Coin } from "@/types/crypto";
import { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { EmptyState } from "../EmptyState";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

interface TableProps {
  data: Coin[];
  search: string;
  fetchMoreCoins: () => void;
  refreshData: () => void;
  refreshing: boolean;
}

type SortField =
  | "rank"
  | "name"
  | "price"
  | "market_cap"
  | "percent_change_24h";
type SortDirection = "asc" | "desc";

export function Table({
  data,
  search,
  fetchMoreCoins,
  refreshData,
  refreshing,
}: TableProps) {
  const { isDark } = useAppTheme();
  const [sorting, setSorting] = useState<{
    field: SortField;
    direction: SortDirection;
  } | null>(null);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sorting) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sorting.field) {
        case "rank":
          aValue = a.rank;
          bValue = b.rank;
          break;
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "price":
          aValue = a.quotes.USD.price;
          bValue = b.quotes.USD.price;
          break;
        case "market_cap":
          aValue = a.quotes.USD.market_cap;
          bValue = b.quotes.USD.market_cap;
          break;
        case "percent_change_24h":
          aValue = a.quotes.USD.percent_change_24h;
          bValue = b.quotes.USD.percent_change_24h;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sorting.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sorting.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sorting]);

  const handleSort = useCallback((field: SortField) => {
    setSorting((current) => {
      if (!current || current.field !== field) {
        return { field, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { field, direction: "desc" };
      }
      return null;
    });
  }, []);

  const renderHeader = () => (
    <View
      className={`
    flex-row border-b
    ${isDark ? "border-indigo-600" : "border-indigo-300"}
  `}
    >
      <TableHeader<SortField>
        field="rank"
        label="#"
        sortField={sorting?.field || null}
        sortDirection={sorting?.direction || null}
        onSort={handleSort}
        width="w-10"
        showSortIcons={false}
      />

      <TableHeader<SortField>
        field="name"
        label="Name"
        sortField={sorting?.field || null}
        sortDirection={sorting?.direction || null}
        onSort={handleSort}
        width="flex-1"
      />

      <TableHeader<SortField>
        field="price"
        label="Price"
        sortField={sorting?.field || null}
        sortDirection={sorting?.direction || null}
        onSort={handleSort}
        width="w-20"
      />

      <TableHeader<SortField>
        field="market_cap"
        label="M. Cap"
        sortField={sorting?.field || null}
        sortDirection={sorting?.direction || null}
        onSort={handleSort}
        width="w-18"
      />

      <TableHeader<SortField>
        field="percent_change_24h"
        label="24h"
        sortField={sorting?.field || null}
        sortDirection={sorting?.direction || null}
        onSort={handleSort}
        width="w-16"
      />
    </View>
  );

  const renderRow = ({ item }: { item: Coin }) => <TableRow item={item} />;

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={refreshData}
      tintColor={isDark ? "#818CF8" : "#4F46E5"}
      colors={[isDark ? "#818CF8" : "#4F46E5"]}
      testID="refresh-control"
    />
  );

  return (
    <FlatList
      data={sortedData}
      renderItem={renderRow}
      keyExtractor={(item) => `coin-${item.id}`}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={<EmptyState search={search} />}
      onEndReached={fetchMoreCoins}
      onEndReachedThreshold={0.5}
      refreshControl={refreshControl}
      extraData={[sorting, search, refreshing]}
      className="flex-1"
      testID="coins-flatlist"
    />
  );
}
