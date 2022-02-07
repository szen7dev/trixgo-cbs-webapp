import { Dispatch, createContext } from "react";

import {ShareMessageActions, ShareMessageState} from "typings/app";

export const initialState: ShareMessageState = {
  isShowShareMessage: false,
  shareMessage: null
};

const ShareMessageContext = createContext<{
  state: ShareMessageState;
  dispatch: Dispatch<ShareMessageActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default ShareMessageContext;
