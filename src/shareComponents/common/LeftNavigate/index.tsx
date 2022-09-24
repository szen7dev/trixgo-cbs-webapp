import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import mailIcon from "assets/images/icons8-secure-mail-48.svg";
import chatIcon from "assets/images/icons8-chat-48.svg";
import iconSuppervision from "assets/images/iconstrx-suppervision-v1.svg";
import humanIcon from "assets/images/icons8-people-64.svg";
import mediaIcon from "assets/images/icons8-commercial-64.svg";
import financialIcon from "assets/images/icons8-financial-64.svg";
import projectIcon from "assets/images/icons-project.svg";
import contractIcon from "assets/images/icons8-contract-64.svg";
import fileIcon from "assets/images/icons-file.svg";
import biddingImage from "assets/menu/project/icons-project-bidding.svg"
import { Link, useLocation } from "react-router-dom";
import { useSocket } from "services/hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { setAmountMissMessage } from "redux/reducer/messages/ListConversation";
import { UseListConversation } from "services/hooks/messages/useListConversation";
import { usePcmPlanTaskNotification } from "services/hooks/pcm/usePcmDashboardV2";
import { populates } from "../../../views/messages/shareComponents/layouts/MessagesLayoutV2";
import { appendMessageToConversation, updateNewMessageToConversation } from "../../../redux/reducer/messages/ListMessage";
import { pushMoreUnreadMessage } from "../../../redux/reducer/messages/UnreadMessages";
import Favico from "react-favico-js";
import { useGetListAppOfUser } from "services/hooks/auth/usePermissions";

type Props = {
  handleMenuEvent: () => void;
};
export const LeftNavigate: FC<Props> = ({ handleMenuEvent }) => {
  const { listAppOfUser } = useGetListAppOfUser();
  const currentUser = localStorage.getItem("currentUser") ?? "{}";
  const profileId = JSON.parse(currentUser)?._id;
  const audioRef = useRef<HTMLAudioElement>(null);

  const { pathname } = useLocation();
  const pathBreak = pathname.split("/");
  const firstRoute = pathBreak[1];

  const { current: socket }: any = useSocket();
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);

  const { data } = usePcmPlanTaskNotification({ enabled: enabled });

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, 300);
    if (firstRoute !== "messages") {
      setTimeout(() => {
        getListConversation({ keyword: "" });
      }, 300);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("CHATTING_SSC_RECEIVE_MESSAGE", onReceiveMessage);

    return () => {
      socket.off("CHATTING_SSC_RECEIVE_MESSAGE", onReceiveMessage);
    };
  }, [socket]);

  const currentChat = useSelector((state: RootState) => state.listMessage.data.currentChat);
  const amountMissMessage = useSelector((state: RootState) => state.listConversation.data.amountMissMessage);
  const inSearchMode = useSelector((state: RootState) => state.searchMessage.data.inSearchMode[currentChat]);
  const isReviewOldMessage = useSelector((state: RootState) => state.listMessage.data.isReviewOldMessage[currentChat]);
  const { getListConversation } = UseListConversation();

  const onReceiveMessage = (data: any) => {
    if (data?.infoMessage?.error) {
      // Alert.alert(t('notification'), data.infoMessage.message);
      getListConversation({ keyword: "" });
      return;
    }
    dispatch(setAmountMissMessage(data.amountMissMessage))
    // console.log(data)
    socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
      conversationID: data?.infoMessage?.conversation,
      populates
    });
    if (data?.infoMessage?.sender?._id === profileId) {
      dispatch(updateNewMessageToConversation({
        conversationId: data?.infoMessage?.conversation,
        newMessageId: data?.infoMessage?._id,
        oldMessageId: data?.tmpid,
        messageData: {
          ...data?.infoMessage,
          noAnimation: true
        }
      }));
    } else {
      playSound();
      dispatch(appendMessageToConversation({
        conversationId: data?.infoMessage?.conversation,
        messageId: data?.infoMessage?._id,
        messageData: {
          ...data?.infoMessage,
          noAnimation: true
        }
      }));
      if (currentChat === data?.infoMessage?.conversation) {
        dispatch(pushMoreUnreadMessage({ conversationId: data?.infoMessage?.conversation, messagesId: [data?.infoMessage?._id] }));
      }
      if (!inSearchMode && currentChat === data?.infoMessage?.conversation && !isReviewOldMessage) {
        setTimeout(() => {
          scrollToBottom();
        }, 100)
      }
    }
  };

  const playSound = () => {
    if (audioRef.current) {
      if (!(audioRef.current.paused && audioRef.current.currentTime > 0 && !audioRef.current.ended)) {
        audioRef.current.volume = 0.2;
        audioRef.current.play();
      }
    }
  }

  const scrollToBottom = () => {
    const conversationMessagesList = document.getElementById("conversation-messages-MessageList");
    if (conversationMessagesList) {
      conversationMessagesList.scrollTo({ top: conversationMessagesList.scrollHeight, behavior: "smooth" });
    }
  };

  const checkPermissionApp = useCallback((appID: string) => {
    let isPermission = false;
    if (listAppOfUser && listAppOfUser.length) {
      for (let i = 0; i < listAppOfUser.length; i++) {
        if (appID === listAppOfUser[i]?.app?._id) {
          isPermission = true;
          break;
        }
      }
    }
    return isPermission;
  }, [listAppOfUser]);

  return (
    <div
      className={
        "bg-cbs-right-navigate-bg w-[68px] min-w-[68px] flex flex-col items-center relative z-40"
      }
    >
      <button
        title="Toggle left sidebar"
        onClick={handleMenuEvent}
        className={"my-6"}
      >
        <img className="w-4" src={menuIcon} alt="Menu" />
      </button>

      {checkPermissionApp('5dfe4b9051dc622100bb9d89') ?
        <Link to={`/`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              ((firstRoute === "" || firstRoute === "pcm")
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={mailIcon} alt={"Chủ đề"} />
            {/*{*/}
            {/*    totalNoti > 0 &&*/}
            {data?.data?.amountUnreadTask && data?.data?.amountUnreadTask > 0 ? (
              <span
                className={
                  "absolute -top-1 right-1 min-w-5 w-5 h-5 text-xs inline-block border-2 text-center border-white rounded-full bg-negative text-white"
                }
              >
                {data?.data?.amountUnreadTask > 10
                  ? "9+"
                  : data?.data?.amountUnreadTask}
              </span>
            ) : (
              <></>
            )}
            {/*}*/}
          </div>
          <span className={"text-primary-gray mt-1"}>Chủ đề</span>
        </Link> : <></>
      }
      {checkPermissionApp('5dfe4b9051dc622100bb9d89') ?
        <Link to={`/pm/projects`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "pm" ? "bg-cbs-hightlight-right-navigate" : "")
            }
          >
            <img width={'20px'} src={projectIcon} alt={"Dự án"} />
          </div>
          <span className={"text-primary-gray mt-1"}>Dự án</span>
        </Link> : <></>}
        {checkPermissionApp('5fe58b7395db3c6e1534ea81') ?
        <Link to={`/bidding/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "bidding"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={biddingImage} alt={"Thầu"} />
          </div>
          <span className={"text-primary-gray mt-1"}>Thầu</span>
        </Link> : <></>}
      {checkPermissionApp('6131d6f83f4b736dc93253b2') ?
        <Link to={`/cmcs/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "cmcs"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={contractIcon} alt={"Hợp đồng"} />
          </div>
          <span className={"text-primary-gray mt-1"}>Hợp đồng</span>
        </Link> : <></>}
        {checkPermissionApp('5dfe4bf251dc622100bb9d8c') ?
        <Link to={`/inspection/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "inspection"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={iconSuppervision} alt={"TVGS"} />
          </div>
          <span className={"text-primary-gray mt-1"}>TVGS</span>
        </Link> : <></>}
      {checkPermissionApp('5e47867080019357cce04746') ?
        <Link to={`/document/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "document"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={fileIcon} alt={"Hồ sơ"} />
          </div>
          <span className={"text-primary-gray mt-1"}>Hồ sơ</span>
        </Link> : <></>}
        {checkPermissionApp('5dfe4bc751dc622100bb9d8a') ?
        <Link to={`/financial/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "financial-"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={financialIcon} alt={"Tài chính"} />
          </div>
          <span className={"text-primary-gray mt-1"}>Tài chính</span>
        </Link> : <></>}
      {checkPermissionApp('61e049c9fdebf77b072d1b13') ?
        <Link to={`/human/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "human"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={humanIcon} alt={"Nhân sự"} />
          </div>
          <span className={"text-primary-gray mt-1"}>Nhân sự</span>
        </Link> : <></>}
      {checkPermissionApp('5dfe4c1b51dc622100bb9d8f') ?
        <Link to={`/messages`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "messages"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={chatIcon} alt={"Chat"} />
            {amountMissMessage > 0 && (
              <span
                className={
                  "absolute -top-1 right-1 min-w-5 w-5 h-5 text-xs inline-block border-2 text-center border-white rounded-full bg-negative text-white"
                }
              >
                {amountMissMessage <= 10 ? amountMissMessage : "9+"}
              </span>
            )}
          </div>
          <span className={"text-primary-gray mt-1"}>Chat</span>
        </Link> : <></>}
        {checkPermissionApp('5df4ce16506d9b3c587948ca') ?
        <Link to={`/media/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "media"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={mediaIcon} alt={"Media"} />
          </div>
          <span className={"text-primary-gray mt-1"}>Media</span>
        </Link> : <></>}
      <audio src={"/sounds/messages/teaser.mp3"} ref={audioRef} />
      <Favico counter={amountMissMessage} />
    </div>
  );
};
