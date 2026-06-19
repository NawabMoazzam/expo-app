import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCSSVariable } from "uniwind";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const [background, foreground, primary] = useCSSVariable([
    "--color-background",
    "--color-foreground",
    "--color-primary",
  ]) as Array<string>;
  return (
    <Tabs
      tabBar={(props) => <TabBar {...(props as any)} />}
      screenOptions={{
        headerShown: false,
        animation: "shift",
        sceneStyle: {
          backgroundColor: background,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Notes" }} />
      <Tabs.Screen name="checklist" options={{ title: "Checklist" }} />
    </Tabs>
  );
}
