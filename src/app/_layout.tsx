import { ThemeSwitcher } from "@/components/Theme-Switcher";
import "@/global.css";
import { Stack } from "expo-router";
import { useCSSVariable, useUniwind } from "uniwind";

export default function RootLayout() {
  const { theme } = useUniwind();
  const [background, foreground] = useCSSVariable([
    "--color-background",
    "--color-foreground",
  ]) as Array<string>;

  return (
    <Stack
      screenOptions={{
        statusBarStyle: theme === "dark" ? "light" : "dark",
        title: "Nawab Notes",
        headerTintColor: foreground,
        headerStyle: { backgroundColor: background },
        headerRight: () => <ThemeSwitcher />,
        contentStyle: { backgroundColor: background },
      }}
    />
  );
}
