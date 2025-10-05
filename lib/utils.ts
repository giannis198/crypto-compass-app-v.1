import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export const formatCurrency = (value: number) => {
  if (!value) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

export const formatLargeNumber = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return formatCurrency(value);
};

export function formatMarketCapPrecise(value: number): string {
  if (!value || value === 0) return "$0";

  const formats = [
    { threshold: 1e12, suffix: "T", divisor: 1e12 },
    { threshold: 1e9, suffix: "B", divisor: 1e9 },
    { threshold: 1e6, suffix: "M", divisor: 1e6 },
    { threshold: 1e3, suffix: "K", divisor: 1e3 },
  ];

  const format = formats.find((f) => value >= f.threshold);

  if (format) {
    const divided = value / format.divisor;
    const decimals = divided < 10 ? 2 : divided < 100 ? 1 : 0;
    return `$${divided.toFixed(decimals)}${format.suffix}`;
  }

  return `$${value.toFixed(2)}`;
}

export function formatNumber(value: number): string {
  if (!value || value === 0) return "0";

  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }

  return value.toLocaleString("en-US");
}

export const formatPercentage = (value: number, isDark?: boolean) => {
  const isPositive = value > 0;

  // Default colors (when isDark is not provided) - for backward compatibility
  let color = isPositive ? "text-green-500" : "text-red-500";

  // Theme-aware colors (when isDark is provided)
  if (isDark !== undefined) {
    color = isPositive
      ? isDark
        ? "text-green-400"
        : "text-green-600"
      : isDark
      ? "text-red-400"
      : "text-red-600";
  }

  return {
    value: `${isPositive ? "+" : ""}${value?.toFixed(2)}%`,
    isPositive,
    color,
  };
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getNameTextSize = (name: string) => {
  if (name.length > 20) return "text-xs";
  if (name.length > 15) return "text-sm";
  return "text-base";
};
