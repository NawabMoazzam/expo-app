import { ThemeSwitcher } from "@/components/Theme-Switcher";
import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerRight: () => <ThemeSwitcher /> }} />;
}
