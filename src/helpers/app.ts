import { Theme, ThemeState } from "typings/app";

export const getInitialTheme = (): ThemeState => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return {
        theme: storedPrefs as Theme,
      };
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return {
        theme: "dark",
      };
    }
  }

  // If you want to use dark theme as the default, return "dark" instead
  return {
    theme: "light",
  };
};

export const rawSetTheme = (state: ThemeState): void => {
  const { theme } = state;

  const root = window.document.documentElement;
  const isDark = theme === "dark";

  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(theme);

  localStorage.setItem("color-theme", theme);
};

export const getWindowDimensions = (): {
  width: number;
  height: number;
} => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
};
