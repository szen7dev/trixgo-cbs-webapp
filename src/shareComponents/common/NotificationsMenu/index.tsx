import { FC, Fragment, UIEvent, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import classNames from "classnames";

import { ModalConfirm } from "shareComponents/common";
import iconNotification from "assets/images/icons8-notification-32.png";

import { useSocket } from "services/hooks/useSocket";
import { useModal } from "services/hooks/useModal";
import { useNotification } from "services/hooks/useNotification";
import { NotificationItem } from "shareComponents/common";
import { NotificationProps } from 'typings/notification';

const categories = [
  { id: 1, name: "Tất cả" },
  { id: 2, name: "Chưa đọc" },
  { id: 3, name: "Đã đọc" },
];

export const NotificationsMenu: FC = () => {
  const history = useHistory();
  const [totalNoti, setTotalNoti] = useState(0);
  const [tabActive, settabActive] = useState(categories[0].id);

  const { current: socket }: any = useSocket();
  const { openModal, closeModal } = useModal();
  const { updateNotificationAsync, markAllReadAsync } = useNotification({}, false);

  const {
    listNotifications,
    totalRecordSendSuccess,
    refetchListNotification,
    hasNextPage,
    nextPageListNotification
  } = useNotification({}, true);

  const {
    listNotifications: listNotificationsByStatus,
    hasNextPage: hasNextPageByStatus,
    nextPageListNotification: nextPageListNotificationByStatus
  } = useNotification({
    status: tabActive
  }, tabActive !== 1);

  useEffect(() => {
		socket?.on('NOTIFICATION_SSC_RECEIVE_NEW_NOTIFICATION', refetchListNotification);

    return () => socket?.off('NOTIFICATION_SSC_RECEIVE_NEW_NOTIFICATION', refetchListNotification);
	}, [socket]);

  useEffect(() => {
    totalRecordSendSuccess && setTotalNoti(totalRecordSendSuccess);
  }, [totalRecordSendSuccess])

  const handleScrollNotifications = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(bottom && hasNextPage) {
      nextPageListNotification();
    }
  }

  const handleScrollNotificationsByStatus = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(bottom && hasNextPageByStatus) {
      nextPageListNotificationByStatus();
    }
  }

  const handleClickNotification = async (notification: NotificationProps) => {
    await updateNotificationAsync({
      notificationID: notification._id,
      status: 3
    })

    history.push(notification.path || '/');
  }

  const handleUpdateStatusNotification = () => {
    updateNotificationAsync({
      isUpdateSendSuccess: true,
      status: 2
    });
    setTotalNoti(0);

    // if(totalRecordSendSuccess > 0) {
    //   updateNotificationAsync({
    //     isUpdateSendSuccess: true,
    //     status: 2
    //   });
    //   setTotalNoti(0);
    // }
  }

  const handleOpenDialogConfirm = () => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[180px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn đánh dấu tất cả thông báo thành đã đọc không?"
          defaultText={false}
          onConfirm={handleMarkAllRead}
          onCancel={closeModal}
        />
      </div>
    );
  };

  const handleMarkAllRead = async () => {
    try {
      const { error, data } = await markAllReadAsync();

      if(error) {
        return toast.warn(data.message);
      }
    } catch (error) {
      if(error instanceof Error)
        toast.error(error.message);
      if(typeof error === 'string')
        toast.error(error);
    } finally {
      closeModal();
    }
  }

  const handleChangeTab = (tabId: number) => settabActive(tabId);

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button as="button" className="w-10 h-10 inline-flex items-center justify-center bg-primary-light hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-6" onPointerDown={handleUpdateStatusNotification}>
          {totalNoti ? (
            <span className="absolute z-10 top-0 right-0 bg-negative pl-1 pr-1 rounded-full text-center text-xs text-primary-light">
              {totalNoti}
            </span>
          ) : ''}
          <img src={iconNotification} alt="Filter" className="w-6 h-6 filter-secondary-gray" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-3 w-96 origin-top-right bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none mt-2 z-60">
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl leading-7 text-dark px-4 pt-3">
              Thông báo {totalNoti ? `(${totalNoti})` : ''}
            </div>
            <div className="px-4 pt-4 text-[13px] text-primary">
              <button onClick={handleOpenDialogConfirm}>
                Đánh dấu tất cả đã đọc
              </button>
            </div>
          </div>

          <div className="flex items-center p-4 pt-3">
            {categories.map(item => (
              <span
                key={item.id}
                tabIndex={0}
                className={classNames(
                  "cursor-pointer px-3.5 py-2 mr-2 transition-colors hover:bg-cbs-primary hover:text-white hover:border-cbs-primary border-0.5 rounded-full select-none",
                  tabActive === item.id
                    ? "bg-cbs-primary border-cbs-primary text-white"
                    : "text-cbs-subtext border-cbs-border"
                )}
                onClick={handleChangeTab.bind(null, item.id)}
              >
                {item.name}
              </span>
            ))}
            {/* <span className="font-bold text-lg text-dark">
              Mới
            </span> */}
            {/* <a className="text-primary" href="/">Xem tất cả</a> */}
          </div>

          {tabActive === 1 ? (
            <div className="t-header-notification-item-container overflow-auto overflow-x-hidden" onScroll={handleScrollNotifications}>
              {listNotifications.length ? listNotifications.map(notification => (
                <Menu.Item key={notification._id}>
                  <NotificationItem notification={notification} onClick={handleClickNotification} />
                </Menu.Item>
              )) : ''}
            </div>
          ) : (
            <div className="t-header-notification-item-container overflow-auto overflow-x-hidden" onScroll={handleScrollNotificationsByStatus}>
              {listNotificationsByStatus.length ? listNotificationsByStatus.map(notification => (
                <Menu.Item key={notification._id}>
                  <NotificationItem notification={notification} onClick={handleClickNotification} />
                </Menu.Item>
              )) : ''}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};