import TabBar from "@/components/TabBar";
import { TabBarProvider, useTabBar } from "@/context/TabBarContext"; // Import context
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

function TabsLayoutContent() {
  const [background] = useCSSVariable(["--color-background"]) as Array<string>;
  const { tabBarStyle } = useTabBar(); // Consume the style here

  return (
    <Tabs
      tabBar={(props) => (
        // Pass the style directly into a wrapping View around your custom TabBar
        <View style={tabBarStyle}>
          <TabBar {...(props as any)} />
        </View>
      )}
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

// Wrap the main export so the content sub-component can use the hook safely
export default function TabsLayout() {
  return (
    <TabBarProvider>
      <TabsLayoutContent />
    </TabBarProvider>
  );
}
