// components/TableHeader.tsx
import { useAppTheme } from "@/hooks/use-app-theme";
import { ArrowDown, ArrowUp } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface TableHeaderProps<T extends string> {
  field: T;
  label: string;
  sortField: T | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (field: T) => void;
  width?: string;
  showSortIcons?: boolean;
}

export function TableHeader<T extends string>({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
  width = "flex-1",
  showSortIcons = true,
}: TableHeaderProps<T>) {
  const { isDark } = useAppTheme();
  const isActive = sortField === field;

  return (
    <TouchableOpacity
      className={`${width} flex-row items-center p-2`}
      onPress={() => onSort(field)}
    >
      {showSortIcons && (
        <View className="mr-1">
          <ArrowUp size={7} color={isDark ? "#818CF8" : "#4F46E5"} />
          <ArrowDown size={7} color={isDark ? "#818CF8" : "#4F46E5"} />
        </View>
      )}
      <Text
        className={`
        font-bold text-xs
        ${isDark ? "text-indigo-100" : "text-indigo-900"}
        ${isActive ? "font-extrabold" : ""}
      `}
      >
        {label}
      </Text>
      {isActive &&
        (sortDirection === "asc" ? (
          <ArrowUp size={10} color={isDark ? "#818CF8" : "#4F46E5"} />
        ) : (
          <ArrowDown size={10} color={isDark ? "#818CF8" : "#4F46E5"} />
        ))}
    </TouchableOpacity>
  );
}
