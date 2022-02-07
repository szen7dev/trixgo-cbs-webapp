import { useContext } from "react";
import ShareMessageContext from "../contexts/ShareMessage";
import {ItemMessage} from "../../typings/apis/messages/listMessage";

type UseShareMessage = {
  isShowShareMessage: boolean;
  setShareMessage: (payload: ItemMessage) => void;
  dismissShareMessage: () => void;
  shareMessage: ItemMessage|null;
};

export const useShareMessage = (): UseShareMessage => {
  const { dispatch, state } = useContext(ShareMessageContext);

  const setShareMessage = (payload: ItemMessage) => {
    dispatch({
      type: "OPEN_SHARE_MESSAGE",
      payload,
    });
  };

  const dismissShareMessage = () => {
    dispatch({
      type: "CLOSE_SHARE_MESSAGE",
    });
  };

  return {
    isShowShareMessage: state.isShowShareMessage,
    setShareMessage,
    dismissShareMessage,
    shareMessage: state.shareMessage,
  };
};
