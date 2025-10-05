// components/ui/AnimatedCard.tsx
import React from "react";
import { Animated } from "react-native";
import { Card } from "./card";

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  isDark?: boolean;
}

export function AnimatedCard({
  children,
  delay = 0,
  isDark,
}: AnimatedCardProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, fadeAnim, slideAnim]); // Added missing dependencies

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Card
        className={`
          mb-4 border
          ${
            isDark
              ? "bg-gray-800 border-indigo-600"
              : "bg-white border-indigo-300"
          }
        `}
      >
        {children}
      </Card>
    </Animated.View>
  );
}
