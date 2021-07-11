import { useContext } from "react";

import ThemeContext from "services/contexts/Theme";

import { Theme } from "typings/app";

type UseTheme = {
  isDark: boolean;
  toggleTheme: (payload: Theme) => void;
};

export const useTheme = (): UseTheme => {
  const { state, dispatch } = useContext(ThemeContext);

  const toggleTheme = (payload: Theme) => {
    dispatch({
      type: "TOGGLE_THEME",
      payload,
    });
  };

  return {
    isDark: state.theme === "dark",
    toggleTheme,
  };
};
