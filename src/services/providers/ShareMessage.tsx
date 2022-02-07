import React, { FC, ReactNode, useReducer} from "react";

import ShareMessageContext , { initialState } from "services/contexts/ShareMessage";

import {ShareMessageState, ShareMessageActions} from "typings/app";
import ShareMessage from "../../views/pages/messages/chattingSection/components/ShareMessage";

type Props = {
  children: ReactNode;
};

const reducer = (state: ShareMessageState, action: ShareMessageActions): ShareMessageState => {
  switch (action.type) {
    case "OPEN_SHARE_MESSAGE":
      return {
        ...state,
        isShowShareMessage: true,
        shareMessage: action.payload
      };
    case "CLOSE_SHARE_MESSAGE":
      return {
        ...state,
        isShowShareMessage: false,
        shareMessage: null,
      };
    default:
      return state;
  }
};

const ShareMessageProvider: FC<Props> = ({children
}) => {
  const [state, dispatch] = useReducer<
    (state: ShareMessageState, action: ShareMessageActions) => ShareMessageState
  >(reducer, initialState);

  return (
    <ShareMessageContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <ShareMessage/>
      {children}
    </ShareMessageContext.Provider>
  );
};

export default ShareMessageProvider;
