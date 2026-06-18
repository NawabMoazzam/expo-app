import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";
import { useCSSVariable } from "uniwind";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "children"> {
  title?: string;
  onPress: NonNullable<PressableProps["onPress"]>;
  iconName?: ComponentProps<typeof Ionicons>["name"];
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary shadow-l active:bg-primary/80",
  secondary:
    "bg-background border border-muted shadow-l active:bg-background/80",
  outline: "border border-border border-2 bg-secondary active:bg-muted",
  ghost: "active:bg-muted",
  destructive: "bg-destructive/20 border border-destructive",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};

const textSizeStyles: Record<Size, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export default function Button({
  onPress,
  iconName,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  ...props
}: ButtonProps) {
  const [primary, secondary, destructive] = useCSSVariable([
    "--color-primary-foreground",
    "--color-secondary-foreground",
    "--color-destructive",
  ]) as Array<string>;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const textSize = textSizeStyles[size];
  const textStyle =
    variant == "primary"
      ? "text-primary-foreground"
      : variant == "destructive"
        ? "text-destructive"
        : "text-foreground";
  const disabledStyle = disabled || loading ? "opacity-50" : "";

  return (
    <Pressable
      {...props}
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-lg ${variantStyle} ${sizeStyle} ${disabledStyle} ${className || ""}`}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {iconName && (
            <Ionicons
              name={iconName}
              size={size == "sm" ? 18 : size == "md" ? 20 : 25}
              color={
                variant == "primary"
                  ? primary
                  : variant == "destructive"
                    ? destructive
                    : secondary
              }
            />
          )}
          {title && (
            <Text className={`font-semibold ${textStyle} ${textSize}`}>
              {title}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
