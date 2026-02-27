import timesheetIcon from "assets/images/icons8-timesheet.svg";
import humanIcon from "assets/images/icons8-human.svg";
import accountingIcon from "assets/images/icons8-accounting.svg";
import storeIcon from "assets/images/icons8-store.svg";
import cashIcon from "assets/images/icons8-cash.svg";
import eshopIcon from "assets/images/icons8-eshop.svg";
import documentIcon from "assets/images/icons8-document.svg";
import { useTranslation } from "react-i18next";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import mailIcon from "assets/images/icons8-secure-mail-48.svg";
import projectIcon from "assets/images/icons-project.svg";
import crmIcon from "assets/images/icons8-crm.svg";
import { Link, useLocation } from "react-router-dom";
import { useSocket } from "services/hooks/useSocket";
import { usePcmPlanTaskNotification } from "services/hooks/pcm/usePcmDashboardV2";
import { useGetListAppOfUser } from "services/hooks/auth/usePermissions";

type Props = {
  handleMenuEvent: () => void;
};

export const LeftNavigate: FC<Props> = ({ handleMenuEvent }) => {
  const { t } = useTranslation();
  const { listAppOfUser } = useGetListAppOfUser();
  const currentUser = localStorage.getItem("currentUser") ?? "{}";

  const { pathname } = useLocation();
  const pathBreak = pathname.split("/");
  const firstRoute = pathBreak[1];

  const { current: socket }: any = useSocket();
  const [enabled, setEnabled] = useState(false);

  const { data } = usePcmPlanTaskNotification({ enabled: enabled });

  const [badge, setBadge] = useState({
    amountUnreadTask: data?.data?.amountUnreadTask || 0,
  })

  const amountUnreadTask = useMemo(() => {
    return badge.amountUnreadTask || data?.data?.amountUnreadTask || 0;
  }, [data?.data?.amountUnreadTask, badge.amountUnreadTask])

  useEffect(() => {

    if (!socket) return;

    socket.on("SUBJECT_PCM_SSC_UPDATE_COUNT_NOTIFICATION", onUpdateBadgeNotification);

    return () => {
      socket.off("SUBJECT_PCM_SSC_UPDATE_COUNT_NOTIFICATION", onUpdateBadgeNotification);
    };
  }, [socket]);

  const onUpdateBadgeNotification = ({ error, data }: any) => {
    if(error || !Object.keys(data).length) return;

    if(data.amountUnreadTask) {
      setBadge({ amountUnreadTask: data.amountUnreadTask });
    }
  }

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
        </Link>
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
        {checkPermissionApp('5dfe4bf251dc622100bb9d8c') ?
        <Link to={`/cash/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "cash" ? "bg-cbs-hightlight-right-navigate" : "")
            }
          >
            <img width={'20px'} src={cashIcon} alt={"Sổ quỹ"} />
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:cash")}</span>
        </Link> : <></>}
        {checkPermissionApp('5f52341f880c2f26c8df8c10') ?
        <Link to={`/store/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "store" ? "bg-cbs-hightlight-right-navigate" : "")
            }
          >
            <img width={'20px'} src={storeIcon} alt={"Thẻ kho"} />
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:store")}</span>
        </Link> : <></>}
        {checkPermissionApp('61e049f6fdebf77b072d1b16') ?
        <Link to={`/crm/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "crm"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={crmIcon} alt={"CRM"} />
          </div>
          <span className={"text-primary-gray mt-1"}>CRM</span>
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
            <img width={'20px'} src={eshopIcon} alt={"Sales"} />
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:fnb")}</span>
        </Link> : <></>}
        {checkPermissionApp('61e049aefdebf77b072d1b12') ?
        <Link to={`/accounting/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "accounting"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={accountingIcon} alt={t("menu:accounting")} />
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:accounting")}</span>
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
          <span className={"text-primary-gray mt-1"}>{t("menu:human")}</span>
        </Link> : <></>}
        {checkPermissionApp('61e049cffdebf77b072d1b14') ?
        <Link to={`/timesheet/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "timesheet"
                ? "bg-cbs-hightlight-right-navigate"
                : "")
            }
          >
            <img width={'20px'} src={timesheetIcon} alt={"Chấm công"} />
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:timesheet")}</span>
        </Link> : <></>}
      {checkPermissionApp('5e47867080019357cce04746') ?
        <Link to={`/document/home`} className={"flex flex-col items-center mb-3"}>
          <div
            className={
              "px-4 py-1 rounded-full relative " +
              (firstRoute === "document" ? "bg-cbs-hightlight-right-navigate" : "")
            }
          >
            <img width={'20px'} src={documentIcon} alt={"Hồ sơ"} />
          </div>
          <span className={"text-primary-gray mt-1"}>{t("menu:document")}</span>
        </Link> : <></>}
    </div>
  )
}