import { ThemeSwitcher } from "@/components/Theme-Switcher";
import "@/global.css";
import { CSSVariables } from "@/utils/color";
import { Stack } from "expo-router";

export default function RootLayout() {
  const color = CSSVariables();

  return (
    <Stack
      screenOptions={{
        statusBarStyle: color.theme === "dark" ? "light" : "dark",
        title: "Nawab Notes",
        headerTintColor: color.foreground,
        headerStyle: { backgroundColor: color.background },
        headerRight: () => <ThemeSwitcher />,
        contentStyle: { backgroundColor: color.background },
      }}
    />
  );
}
