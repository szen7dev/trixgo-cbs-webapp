import { FC, ReactNode, useReducer } from "react";

import RightClickMenuContext , { initialState } from "services/contexts/RightClickMenu";
import { RightClickMenuState, RightClickMenuActions } from "typings/app";
import {RightClickMenuV2} from "shareComponents/common/RightClickMenuV2"

type Props = {
  children: ReactNode;
};

const reducer = (state: RightClickMenuState, action: RightClickMenuActions): RightClickMenuState => {
  switch (action.type) {
    case "OPEN_RIGHT_CLICK":
      return {
        ...state,
        isRightClickMenuOpen: true,
        rightClickMenuContent: action.payload,
      };
    case "CLOSE_RIGHT_CLICK":
      return {
        ...state,
        isRightClickMenuOpen: false,
        rightClickMenuContent: {
          content: null,
          x: 0,
          y: 0
        },
      };
    default:
      return state;
  }
};

const RightClickMenuProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: RightClickMenuState, action: RightClickMenuActions) => RightClickMenuState
  >(reducer, initialState);

  return (
    <RightClickMenuContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <RightClickMenuV2 />
      {children}
    </RightClickMenuContext.Provider>
  );
};

export default RightClickMenuProvider;
