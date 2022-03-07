/*=====1.LIBRARY=====*/
import { FC } from "react";
import cn from "classnames";
import truncate from "lodash/truncate";
/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
/*=====3.ICONS=====*/
/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/
/*=====6.HOOKS/APIS=====*/
import { useNotification } from 'services/hooks/personal/useNotification';
/*=====7.OTHER=====*/
import FakeUser from "assets/images/fake-user.png";

export const AllNoti: FC = () => {
  const { listNotifications, totalRecord, nextPageListNotification } = useNotification();

  return (
    <main className="h-full py-4 flex flex-col">
      {listNotifications?.length ? listNotifications.map((noti, i) => (
      <div
        key={ noti._id }
        className={cn(
          "flex justify-between px-4 py-2 cursor-pointer",
          styles.noti
        )}
      >
        <div className="flex">
          <img
            src={FakeUser}
            alt="User"
            className="w-[60px] h-[60px] rounded-full mr-5"
          />
          <div>
            <p className="truncate">
              {/* Kính gửi nhà thầu Xuân Tài! Đến thời điểm hiện tại, BĐH DA chưa
              thấy nhà thầu bổ sung... */}
              { truncate(noti.content, {length: 90, separator: ' '}) }
            </p>
            <p className="text-secondary-gray">
              Hà Tiến Dũng-CHG | CHG.THT-Hồ sơ thanh toán đợt 01 - thuộc HĐ Thi
              công san lấp của...
            </p>
          </div>
        </div>
        <p className="text-secondary-gray">14:15</p>
      </div>
      )) : null}
      {totalRecord && totalRecord - listNotifications.length > 0 && (
          <div className="w-full flex justify-center my-5">
            <button onClick={() => nextPageListNotification()}>
              <span className="text-primary">{`Xem thêm (${
                totalRecord - listNotifications.length
              })`}</span>
            </button>
          </div>
        )}
    </main>
  );
};
