import { useContext } from "react";

import {PopupSendFilesContent} from "typings/app";
import PopupSendFilesContext from "services/contexts/PopupSendFiles";

type UsePopupSendFiles = {
  isShowPopupSendFiles: boolean;
  openPopupSendFiles: (payload: PopupSendFilesContent) => void;
  closePopupSendFiles: () => void;
  popSendFilesContent: PopupSendFilesContent;
  setSendType: (payload: "image"|"file") => void
};

export const usePopupSendFiles = (): UsePopupSendFiles => {
  const { dispatch, state } = useContext(PopupSendFilesContext);

  const openPopupSendFiles = (payload: PopupSendFilesContent) => {
    dispatch({
      type: "OPEN_POPUP_SEND_FILES",
      payload,
    });
  };

  const closePopupSendFiles = () => {
    dispatch({
      type: "CLOSE_POPUP_SEND_FILES",
    });
  };

  const setSendType = (payload: "image"|"file") => {
    dispatch({
      type: "SET_SEND_TYPE",
      payload
    })
  }

  return {
    isShowPopupSendFiles: state.isShowPopupSendFiles,
    openPopupSendFiles,
    closePopupSendFiles,
    popSendFilesContent: state.popSendFilesContent,
    setSendType
  };
};
