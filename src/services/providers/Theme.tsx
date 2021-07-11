import { ReactNode, FC, useReducer, useEffect } from "react";

import ThemeContext from "services/contexts/Theme";
import { getInitialTheme, rawSetTheme } from "helpers/app";

import { ThemeState, ThemeActions } from "typings/app";

type Props = {
  initialTheme?: ThemeState;
  children: ReactNode;
};

const reducer = (state: ThemeState, action: ThemeActions): ThemeState => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

const ThemeProvider: FC<Props> = ({ children, initialTheme }) => {
  const [state, dispatch] = useReducer<
    (state: ThemeState, action: ThemeActions) => ThemeState
  >(reducer, getInitialTheme());

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(state);
  }, [state]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
