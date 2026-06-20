import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [primary, foregrond, muted] = useCSSVariable([
    "--color-primary",
    "--color-foreground",
    "--color-muted-foreground",
  ]) as Array<string>;
  return (
    <View className="absolute bottom-2 flex-row items-center justify-between mx-2 p-2 bg-background rounded-2xl shadow-l border border-border dark:border-0">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        // Skip internal Expo routes like sitemap or fallback pages
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;
        const focusedIconColor = isFocused ? primary : muted;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Custom route-to-icon mapping
        const getIconName = (
          routeName: string,
          focused: boolean,
        ): keyof typeof Ionicons.glyphMap => {
          if (routeName === "index")
            return focused ? "newspaper" : "newspaper-outline";
          if (routeName === "checklist")
            return focused
              ? "checkmark-done-circle"
              : "checkmark-done-circle-outline";
          return "ellipse";
        };

        return (
          <Pressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className={`flex-1 items-center justify-center gap-1 rounded-2xl py-2 ${isFocused ? "bg-secondary shadow-m border border-border dark:border-0" : ""}`}
          >
            <Ionicons
              name={getIconName(route.name, isFocused)}
              size={25}
              color={focusedIconColor}
            />
            <Text
              className="text-xs font-medium"
              style={{ color: isFocused ? foregrond : muted }}
            >
              {typeof label === "string" ? label : route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
