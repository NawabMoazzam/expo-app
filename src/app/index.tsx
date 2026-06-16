import { ThemeSwitcher } from "@/components/Theme-Switcher";
import { Text, View } from "react-native";
import { useUniwind } from "uniwind";

export default function Index() {
  const { theme, hasAdaptiveThemes } = useUniwind();
  return (
    <View className="bg-card border border-border p-4 rounded-lg">
      <Text className="text-foreground text-lg font-bold">
        Welcome to Uniwind!
      </Text>
      <Text className="text-foreground-secondary mt-2">
        Current theme: {theme}
      </Text>
      <Text className="text-foreground-secondary mt-2">
        Adaptive themes: {hasAdaptiveThemes ? "enabled" : "disabled"}
      </Text>
      <ThemeSwitcher />
    </View>
  );
}
