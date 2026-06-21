import React, { createContext, useContext, useState } from "react";
import { ViewStyle } from "react-native";

type TabBarContextType = {
  tabBarStyle: ViewStyle;
  setTabBarStyle: React.Dispatch<React.SetStateAction<ViewStyle>>;
};

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export function TabBarProvider({ children }: { children: React.ReactNode }) {
  const [tabBarStyle, setTabBarStyle] = useState<ViewStyle>({});

  return (
    <TabBarContext.Provider value={{ tabBarStyle, setTabBarStyle }}>
      {children}
    </TabBarContext.Provider>
  );
}

export function useTabBar() {
  const context = useContext(TabBarContext);
  if (!context)
    throw new Error("useTabBar must be used within a TabBarProvider");
  return context;
}
