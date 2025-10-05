// lib/__tests__/utils.test.ts
import {
  cn,
  formatCurrency,
  formatLargeNumber,
  formatMarketCapPrecise,
  formatNumber,
  formatPercentage,
  formatDate,
  getNameTextSize,
} from "../utils";

describe("Utility Functions", () => {
  describe("cn (className merger)", () => {
    it("merges class names correctly", () => {
      expect(cn("text-red-500", "bg-blue-500")).toBe(
        "text-red-500 bg-blue-500"
      );
      expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      expect(cn("base-class", isActive && "active-class", "always-class")).toBe(
        "base-class active-class always-class"
      );
    });
  });

  describe("formatCurrency", () => {
    it("formats regular prices with 2 decimals", () => {
      expect(formatCurrency(45000.5)).toBe("$45,000.50");
      expect(formatCurrency(1000)).toBe("$1,000.00");
    });

    it("formats small prices with more decimals", () => {
      // Your function uses max 6 decimals for values < 1
      expect(formatCurrency(0.00456)).toBe("$0.00456");
      expect(formatCurrency(0.123456)).toBe("$0.123456");
    });

    it("handles zero and undefined values", () => {
      expect(formatCurrency(0)).toBe("$0.00");
      expect(formatCurrency(undefined as any)).toBe("$0.00");
    });
  });

  describe("formatLargeNumber", () => {
    it("formats trillions", () => {
      expect(formatLargeNumber(2.5e12)).toBe("$2.50T");
    });

    it("formats billions", () => {
      expect(formatLargeNumber(850000000000)).toBe("$850.00B");
      expect(formatLargeNumber(1500000000)).toBe("$1.50B");
    });

    it("formats millions", () => {
      expect(formatLargeNumber(2500000)).toBe("$2.50M");
    });

    it("uses currency format for smaller numbers", () => {
      expect(formatLargeNumber(1000)).toBe("$1,000.00");
      expect(formatLargeNumber(45.5)).toBe("$45.50");
    });
  });

  describe("formatMarketCapPrecise", () => {
    it("formats market cap with appropriate precision", () => {
      // Your function uses dynamic precision based on the value
      expect(formatMarketCapPrecise(2500000000000)).toBe("$2.50T");
      expect(formatMarketCapPrecise(850000000000)).toBe("$850B"); // 850B (no decimals for large numbers)
      expect(formatMarketCapPrecise(1500000000)).toBe("$1.50B"); // 1.50B (2 decimals for smaller billions)
      expect(formatMarketCapPrecise(2500000)).toBe("$2.50M");
      expect(formatMarketCapPrecise(45000)).toBe("$45.0K"); // 45K uses K suffix with 1 decimal
    });

    it("handles edge cases", () => {
      expect(formatMarketCapPrecise(0)).toBe("$0");
      expect(formatMarketCapPrecise(undefined as any)).toBe("$0");
    });
  });
  describe("formatNumber", () => {
    it("formats large numbers with suffixes", () => {
      expect(formatNumber(2500000000000)).toBe("2.50T");
      expect(formatNumber(850000000000)).toBe("850.00B");
      expect(formatNumber(1500000000)).toBe("1.50B");
      expect(formatNumber(2500000)).toBe("2.50M");
      expect(formatNumber(45000)).toBe("45.00K");
    });

    it("formats smaller numbers without suffixes", () => {
      // Your function formats 1234.56 as 1.23K (it uses K for thousands)
      expect(formatNumber(999)).toBe("999"); // Below 1000, no suffix
      expect(formatNumber(1234.56)).toBe("1.23K"); // Above 1000, uses K
    });
  });

  describe("formatPercentage", () => {
    it("formats positive percentages correctly", () => {
      const result = formatPercentage(2.5);
      expect(result.value).toBe("+2.50%");
      expect(result.isPositive).toBe(true);
      expect(result.color).toBe("text-green-500");
    });

    it("formats negative percentages correctly", () => {
      const result = formatPercentage(-3.2);
      expect(result.value).toBe("-3.20%");
      expect(result.isPositive).toBe(false);
      expect(result.color).toBe("text-red-500");
    });

    it("handles theme-aware colors for dark mode", () => {
      const darkResult = formatPercentage(2.5, true);
      expect(darkResult.color).toBe("text-green-400");

      const lightResult = formatPercentage(-3.2, false);
      expect(lightResult.color).toBe("text-red-600");
    });
  });

  describe("formatDate", () => {
    it("formats date strings correctly", () => {
      expect(formatDate("2024-01-15")).toBe("Jan 15, 2024");
      expect(formatDate("2023-12-25")).toBe("Dec 25, 2023");
    });

    it("handles different date formats", () => {
      // Test with ISO string
      expect(formatDate("2024-01-15T00:00:00.000Z")).toBe("Jan 15, 2024");
    });
  });

  describe("getNameTextSize", () => {
    it("returns correct text sizes based on name length", () => {
      expect(getNameTextSize("BTC")).toBe("text-base");
      expect(getNameTextSize("Ethereum Classic")).toBe("text-sm");
      expect(getNameTextSize("Very Long Cryptocurrency Name")).toBe("text-xs");
    });

    it("handles edge cases", () => {
      expect(getNameTextSize("")).toBe("text-base");
      expect(getNameTextSize("A")).toBe("text-base");
      // "Exactly Sixteen Chars" is 19 characters, so it should be text-xs
      expect(getNameTextSize("Exactly Sixteen Chars")).toBe("text-xs");
    });
  });
});
