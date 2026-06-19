import { ThemeSwitcher } from "@/components/Theme-Switcher";
import "@/global.css";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCSSVariable, useUniwind } from "uniwind";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const { theme } = useUniwind();
  const [background, foreground, primary] = useCSSVariable([
    "--color-background",
    "--color-foreground",
    "--color-primary",
  ]) as Array<string>;

  return (
    <Stack
      screenOptions={{
        statusBarStyle: theme === "dark" ? "light" : "dark",
        title: "Nawab Notes",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: theme === "dark" ? primary : foreground,
        headerStyle: { backgroundColor: background },
        headerRight: () => <ThemeSwitcher />,
        contentStyle: {
          backgroundColor: background,
          marginBottom: insets.bottom,
        },
      }}
    />
  );
}
