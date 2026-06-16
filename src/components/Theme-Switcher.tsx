import {
  Text as ComposeText,
  DropdownMenu,
  DropdownMenuItem,
  Host,
  RNHostView,
} from "@expo/ui/jetpack-compose";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable } from "react-native";
import { Uniwind, useUniwind } from "uniwind";

export const ThemeSwitcher = () => {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const [isExpanded, setIsExpanded] = useState(false);
  const [foregroundColor, setForegroundColor] = useState(
    Uniwind.getCSSVariable("--color-foreground") as string,
  );
  const activeTheme = hasAdaptiveThemes ? "system" : theme;

  const themes = [{ name: "light" }, { name: "dark" }, { name: "system" }];

  const changeTheme = (themeName: string) => {
    setIsExpanded(false);
    Uniwind.setTheme(themeName as "light" | "dark" | "system");
    setForegroundColor(Uniwind.getCSSVariable("--color-foreground") as string);
  };

  return (
    <Host matchContents>
      <DropdownMenu
        expanded={isExpanded}
        onDismissRequest={() => setIsExpanded(false)}
      >
        <DropdownMenu.Trigger>
          <RNHostView matchContents>
            <Pressable
              onPress={() => setIsExpanded(true)}
              className="bg-card border border-border p-2 rounded-lg flex-row items-center justify-center"
            >
              <Ionicons
                name={
                  activeTheme === "light"
                    ? "sunny"
                    : activeTheme === "dark"
                      ? "moon"
                      : "desktop"
                }
                size={20}
                color={foregroundColor}
              />
            </Pressable>
          </RNHostView>
        </DropdownMenu.Trigger>
        <DropdownMenu.Items>
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.name}
              onClick={() => changeTheme(theme.name)}
            >
              <DropdownMenuItem.Text>
                <ComposeText>{theme.name}</ComposeText>
              </DropdownMenuItem.Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenu.Items>
      </DropdownMenu>
    </Host>
  );
};
