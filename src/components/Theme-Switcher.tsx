import {
  Text as ComposeText,
  DropdownMenu,
  DropdownMenuItem,
  Host,
  RNHostView
} from "@expo/ui/jetpack-compose";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable } from "react-native";
import { Uniwind, useCSSVariable, useUniwind } from "uniwind";

export const ThemeSwitcher = () => {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const [isExpanded, setIsExpanded] = useState(false);
  const foregroundColor = useCSSVariable("--color-foreground") as string;

  const activeTheme = hasAdaptiveThemes ? "system" : theme;
  const themes = ["light", "dark", "system"];

  const changeTheme = (themeName: string) => {
    setIsExpanded(false);
    Uniwind.setTheme(themeName as "light" | "dark" | "system");
  };

  return (
    <Host matchContents colorScheme={theme}>
      <DropdownMenu
        expanded={isExpanded}
        onDismissRequest={() => setIsExpanded(false)}
      >
        <DropdownMenu.Trigger>
          <RNHostView matchContents>
            <Pressable
              onPress={() => setIsExpanded(true)}
              className="h-8 w-8 flex items-center justify-center rounded-lg active:bg-muted"
            >
              <Ionicons
                name={
                  activeTheme === "light"
                    ? "sunny"
                    : activeTheme === "dark"
                      ? "moon"
                      : "desktop-outline"
                }
                size={20}
                color={foregroundColor}
              />
            </Pressable>
          </RNHostView>
        </DropdownMenu.Trigger>
        <DropdownMenu.Items>
          {themes.map((theme) => (
            <DropdownMenuItem key={theme} onClick={() => changeTheme(theme)}>
              <DropdownMenuItem.LeadingIcon>
                <Ionicons
                  name={
                    theme === "light"
                      ? "sunny"
                      : theme === "dark"
                        ? "moon"
                        : "desktop-outline"
                  }
                  size={20}
                  color={foregroundColor}
                />
              </DropdownMenuItem.LeadingIcon>
              <DropdownMenuItem.Text>
                <ComposeText>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </ComposeText>
              </DropdownMenuItem.Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenu.Items>
      </DropdownMenu>
    </Host>
  );
};
