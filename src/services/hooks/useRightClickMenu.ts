import { ReactNode, useContext } from "react";

import RightClickMenuContext from "services/contexts/RightClickMenu";

type UseRightClickMenu = {
  isRightClickMenuOpen: boolean;
  openRightClick: (payload: {
    content: ReactNode,
    x: number,
    y: number
  }) => void;
  closeRightClick: () => void;
  rightClickMenuContent: {
    content: ReactNode,
    x: number,
    y: number
  };
};

export const useRightClickMenu = (): UseRightClickMenu => {
  const { dispatch, state } = useContext(RightClickMenuContext);

  const openRightClick = (payload: {
    content: ReactNode,
    x: number,
    y: number
  }) => {
    dispatch({
      type: "OPEN_RIGHT_CLICK",
      payload,
    });
  };

  const closeRightClick = () => {
    dispatch({
      type: "CLOSE_RIGHT_CLICK",
    });
  };

  return {
    isRightClickMenuOpen: state.isRightClickMenuOpen,
    openRightClick,
    closeRightClick,
    rightClickMenuContent: state.rightClickMenuContent,
  };
};
