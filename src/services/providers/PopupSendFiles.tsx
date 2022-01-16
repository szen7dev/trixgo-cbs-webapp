import React, { FC, ReactNode, useReducer} from "react";

import PopupSendFilesContext , { initialState } from "services/contexts/PopupSendFiles";

import {PopupSendFilesState, PopupSendFilesActions} from "typings/app";
import PopupSendImageAndFile from "../../views/pages/messages/chattingSection/components/PopupSendImageAndFile";

type Props = {
  children: ReactNode;
};

const reducer = (state: PopupSendFilesState, action: PopupSendFilesActions): PopupSendFilesState => {
  switch (action.type) {
    case "OPEN_POPUP_SEND_FILES":
      return {
        ...state,
        isShowPopupSendFiles: true,
        popSendFilesContent: {
          ...state.popSendFilesContent,
          ...action.payload
        },
      };
    case "CLOSE_POPUP_SEND_FILES":
      return {
        ...state,
        isShowPopupSendFiles: false,
        popSendFilesContent: {
          files: [],
          sendType: "image",
          conversationID: "",
          handleSendFile: (message, useCompress= true) => undefined
        },
      };
    default:
      return state;
  }
};

const PopupSendFilesProvider: FC<Props> = ({children
}) => {
  const [state, dispatch] = useReducer<
    (state: PopupSendFilesState, action: PopupSendFilesActions) => PopupSendFilesState
  >(reducer, initialState);

  return (
    <PopupSendFilesContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <PopupSendImageAndFile />
      {children}
    </PopupSendFilesContext.Provider>
  );
};

export default PopupSendFilesProvider;
