// components/ui/Error.tsx (enhanced with types)
import { View } from "react-native";

import { AlertCircle, RefreshCw, WifiOff, Server } from "lucide-react-native";
import { Text } from "./ui/text";
import { Button } from "./ui/button";

type ErrorType = "network" | "server" | "not-found" | "generic";

interface ErrorProps {
  type?: ErrorType;
  title?: string;
  message: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

export function ErrorDisplay({
  type = "generic",
  title,
  message,
  onRetry,
  retryButtonText = "Try Again",
}: ErrorProps) {
  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: WifiOff,
          title: title || "Network Error",
          color: "text-orange-500",
          bgColor: "bg-orange-100 dark:bg-orange-900",
        };
      case "server":
        return {
          icon: Server,
          title: title || "Server Error",
          color: "text-red-500",
          bgColor: "bg-red-100 dark:bg-red-900",
        };
      case "not-found":
        return {
          icon: AlertCircle,
          title: title || "Not Found",
          color: "text-blue-500",
          bgColor: "bg-blue-100 dark:bg-blue-900",
        };
      default:
        return {
          icon: AlertCircle,
          title: title || "Error",
          color: "text-red-500",
          bgColor: "bg-red-100 dark:bg-red-900",
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="items-center max-w-80">
        <View className={`mb-4 p-3 ${config.bgColor} rounded-full`}>
          <IconComponent size={32} className={config.color} />
        </View>

        <Text className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
          {config.title}
        </Text>

        <Text className="text-gray-600 dark:text-gray-400 text-center mb-6">
          {message}
        </Text>

        {onRetry && (
          <Button variant="secondary" onPress={onRetry}>
            <RefreshCw size={16} className="text-foreground mr-2" />
            <Text>{retryButtonText}</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
