import {Dispatch, createContext} from "react";

import { RightClickMenuState, RightClickMenuActions } from "typings/app";

export const initialState: RightClickMenuState = {
  isRightClickMenuOpen: false,
  rightClickMenuContent: {
    content: null,
    x: 0,
    y: 0
  },
};

const RightClickMenuContext = createContext<{
  state: RightClickMenuState;
  dispatch: Dispatch<RightClickMenuActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default RightClickMenuContext;
