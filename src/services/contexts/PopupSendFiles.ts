import { Dispatch, createContext } from "react";

import {PopupSendFilesActions, PopupSendFilesState} from "typings/app";

export const initialState: PopupSendFilesState = {
  isShowPopupSendFiles: false,
  popSendFilesContent: {
    files: [],
    sendType: "image",
    defaultSendType: "image",
    conversationID: "",
    handleSendFile: (message: any, useCompress = true) => undefined
  }
};

const PopupSendFilesContext = createContext<{
  state: PopupSendFilesState;
  dispatch: Dispatch<PopupSendFilesActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default PopupSendFilesContext;
