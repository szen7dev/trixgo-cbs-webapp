/**
 * BẢN CẮT GỌN, BỎ PHẦN SOCKET VÀ THÔNG BÁO CỦA CHAT
 * File nguyên bản xem tại index_old.tsx
 */
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import mailIcon from "assets/images/icons8-secure-mail-48.svg";
import chatIcon from "assets/images/icons8-chat-48.svg";
import mediaIcon from "assets/images/icons8-commercial-64.svg";
import projectIcon from "assets/images/icons-project.svg";
import eshopIcon from "assets/images/icons8-eshop.svg";
import contractIcon from "assets/images/icons8-contract-64.svg";
import fileIcon from "assets/images/icons-file.svg";
import { Link, useLocation } from "react-router-dom";
import { useSocket } from "services/hooks/useSocket";
import { useDispatch } from "react-redux";
import { usePcmPlanTaskNotification } from "services/hooks/pcm/usePcmDashboardV2";
import Favico from "react-favico-js";
import { useGetListAppOfUser } from "services/hooks/auth/usePermissions";
import { useTranslation } from "react-i18next";

type Props = {
  handleMenuEvent: () => void;
};
export const LeftNavigate: FC<Props> = ({ handleMenuEvent }) => {
  const { t } = useTranslation()

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

  const [badge, setBadge] = useState({
    amountUnreadTask: data?.data?.amountUnreadTask || 0,
  })

  const amountUnreadTask = useMemo(() => {
    return badge.amountUnreadTask || data?.data?.amountUnreadTask || 0;
  }, [data?.data?.amountUnreadTask, badge.amountUnreadTask])

  const amountMissMessage = 0

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

      {checkPermissionApp('5eabfdc72171391e5f6a0468') ?
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
            {amountUnreadTask && amountUnreadTask > 0 ? (
              <span
                className={
                  "absolute -top-1 right-1 min-w-5 w-5 h-5 text-xs inline-block border-2 text-center border-white rounded-full bg-negative text-white"
                }
              >
                {amountUnreadTask > 10
                  ? "9+"
                  : amountUnreadTask}
              </span>
            ) : (
              <></>
            )}
            {/*}*/}
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:subject")}</span>
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
          <span className={"text-primary-gray mt-1"}>{t("menu:project")}</span>
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
          <span className={"text-primary-gray mt-1"}>{t("menu:contract")}</span>
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
          <span className={"text-primary-gray mt-1"}>{t("menu:document")}</span>
        </Link> : <></>}
      {checkPermissionApp('61e04971fdebf77b072d1b0f') ?
      <Link to={`/fnb/home`} className={"flex flex-col items-center mb-3"}>
        <div
          className={
            "px-4 py-1 rounded-full relative " +
            (firstRoute === "fnb"
              ? "bg-cbs-hightlight-right-navigate"
              : "")
          }
        >
          <img width={'20px'} src={eshopIcon} alt={"FnB"} />
        </div>
        <span className={"text-primary-gray mt-1"}>{t("menu:fnb")}</span>
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
        <span className={"text-primary-gray mt-1"}>{t("menu:media")}</span>
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
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:chat")}</span>
        </Link> : <></>}
      <audio src={"/sounds/messages/teaser.mp3"} ref={audioRef} />
      <Favico counter={amountMissMessage} />
    </div>
  )
}