import { createContext, Dispatch } from "react";

import { ThemeState, ThemeActions } from "typings/app";

export const initialState: ThemeState = {
  theme: "light",
};

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: Dispatch<ThemeActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default ThemeContext;
