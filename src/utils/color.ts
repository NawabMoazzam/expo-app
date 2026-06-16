import { useEffect } from "react";
import { Uniwind, useUniwind } from "uniwind";

export const CSSVariables = () => {
  const { theme } = useUniwind();
  let [background, foreground] = Uniwind.getCSSVariable([
    "--color-background",
    "--color-foreground",
  ]) as Array<string>;
  useEffect(() => {
    [background, foreground] = Uniwind.getCSSVariable([
      "--color-background",
      "--color-foreground",
    ]) as Array<string>;
  }, [theme]);

  return { theme, background, foreground };
};
