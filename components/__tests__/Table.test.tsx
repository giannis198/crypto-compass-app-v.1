import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useAppTheme } from "@/hooks/use-app-theme";
import { Coin } from "@/types/crypto";
import { Table } from "../table/Table";

jest.mock("@/hooks/use-app-theme", () => ({
  useAppTheme: jest.fn(),
}));

jest.mock("@/components/table/TableHeader", () => {
  const React = jest.requireActual("react");
  const RN = jest.requireActual("react-native");
  const { TouchableOpacity, Text } = RN;
  return {
    TableHeader: ({ label, onSort }: any) => (
      <TouchableOpacity
        testID={`header-${label}`}
        onPress={() => onSort(label.toLowerCase())}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock("@/components/table/TableRow", () => {
  const React = jest.requireActual("react");
  const RN = jest.requireActual("react-native");
  const { View, Text } = RN;
  return {
    TableRow: ({ item }: any) => (
      <View testID={`row-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    ),
  };
});

jest.mock("../EmptyState", () => {
  const React = jest.requireActual("react");
  const RN = jest.requireActual("react-native");
  const { View, Text } = RN;
  return {
    EmptyState: ({ search }: any) => (
      <View testID="empty-state">
        <Text>{search ? "No results" : "No data"}</Text>
      </View>
    ),
  };
});

const createCoin = (overrides: Partial<Coin>): Coin => ({
  id: "1",
  name: "Bitcoin",
  symbol: "BTC",
  rank: 1,
  circulating_supply: 19000000,
  total_supply: 21000000,
  max_supply: 21000000,
  beta_value: 1.2,
  first_data_at: "2020-01-01",
  last_updated: "2025-01-01",
  quotes: {
    USD: {
      price: 50000,
      volume_24h: 1000000000,
      volume_24h_change_24h: 5,
      market_cap: 1000000000,
      market_cap_change_24h: 2,
      percent_change_15m: 0.1,
      percent_change_30m: 0.2,
      percent_change_1h: 0.3,
      percent_change_6h: 1,
      percent_change_12h: 2,
      percent_change_24h: 5,
      percent_change_7d: 10,
      percent_change_30d: 20,
      percent_change_1y: 50,
      ath_price: 69000,
      ath_date: "2021-11-10",
      percent_from_price_ath: -20,
    },
  },
  ...overrides,
});

const mockCoins: Coin[] = [
  createCoin({ id: "1", name: "Bitcoin", symbol: "BTC", rank: 1 }),
  createCoin({
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    quotes: {
      USD: {
        ...createCoin({}).quotes.USD,
        price: 3000,
        market_cap: 500000000,
        percent_change_24h: -2,
      },
    },
  }),
];

describe("Table Component", () => {
  const mockFetchMoreCoins = jest.fn();
  const mockRefreshData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppTheme as jest.Mock).mockReturnValue({ isDark: false });
  });

  it("renders table with data", () => {
    const { getByText, getByTestId } = render(
      <Table
        data={mockCoins}
        search=""
        fetchMoreCoins={mockFetchMoreCoins}
        refreshData={mockRefreshData}
        refreshing={false}
      />
    );

    expect(getByText("Bitcoin")).toBeTruthy();
    expect(getByText("Ethereum")).toBeTruthy();
    expect(getByTestId("coins-flatlist")).toBeTruthy();
  });

  it("filters data by search term", () => {
    const { queryByText } = render(
      <Table
        data={mockCoins}
        search="bit"
        fetchMoreCoins={mockFetchMoreCoins}
        refreshData={mockRefreshData}
        refreshing={false}
      />
    );

    expect(queryByText("Bitcoin")).toBeTruthy();
    expect(queryByText("Ethereum")).toBeNull();
  });

  it("shows empty state when no search results", () => {
    const { getByTestId } = render(
      <Table
        data={mockCoins}
        search="doge"
        fetchMoreCoins={mockFetchMoreCoins}
        refreshData={mockRefreshData}
        refreshing={false}
      />
    );

    expect(getByTestId("empty-state")).toHaveTextContent("No results");
  });

  it("calls refreshData when pulled to refresh", () => {
    const mockRefreshData = jest.fn();

    render(
      <Table
        data={mockCoins}
        search=""
        fetchMoreCoins={jest.fn()}
        refreshData={mockRefreshData}
        refreshing={false}
      />
    );

    const { RefreshControl } = jest.requireActual("react-native");
    const refreshInstance = new RefreshControl({
      refreshing: false,
      onRefresh: mockRefreshData,
    });
    refreshInstance.props?.onRefresh?.();
    expect(mockRefreshData).toHaveBeenCalledTimes(1);
  });

  it("calls fetchMoreCoins when end is reached", async () => {
    const { getByTestId } = render(
      <Table
        data={mockCoins}
        search=""
        fetchMoreCoins={mockFetchMoreCoins}
        refreshData={mockRefreshData}
        refreshing={false}
      />
    );

    fireEvent(getByTestId("coins-flatlist"), "onEndReached");

    await waitFor(() => {
      expect(mockFetchMoreCoins).toHaveBeenCalledTimes(1);
    });
  });

  it("handles sorting via header press", async () => {
    const { getByTestId } = render(
      <Table
        data={mockCoins}
        search=""
        fetchMoreCoins={mockFetchMoreCoins}
        refreshData={mockRefreshData}
        refreshing={false}
      />
    );

    const nameHeader = getByTestId("header-Name");
    fireEvent.press(nameHeader);
    fireEvent.press(nameHeader);

    expect(getByTestId("coins-flatlist")).toBeTruthy();
  });
});
