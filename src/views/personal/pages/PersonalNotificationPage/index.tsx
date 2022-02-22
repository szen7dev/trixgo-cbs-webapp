import { FC, useState } from "react";

import cn from "classnames";

import DropdownSearchable from "components/common/DropdownSearch";

import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import SearchIcon from "assets/images/icons8-search.svg";

import NotificationTab from "./tabs/NotificationTab";

import styles from "../style.module.css";
import NotificationFilter from "./components/NotificationFilter";

export const PersonalNotificationPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

  return (
    <main className="h-full w-full bg-cbs-gray flex justify-center py-4">
      <section
        className={cn(
          "bg-primary-light w-[798px] h-auto",
          styles.boxShadowBorderRadius
        )}
      >
        <p className="font-bold text-2xl p-4">Thông báo gần đây</p>

        <div className="px-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              className={
                toggleTab === 1
                  ? `w-auto h-[36px] text-[15px] px-5 text-primary ${styles.borRadius} ${styles.totalBg}`
                  : `w-auto h-[36px] text-[15px] px-5 ${styles.borRadius} bg-cbs-gray`
              }
              onClick={() => handleToggleTab(1)}
            >
              Tất cả
            </button>
            <button
              className={
                toggleTab === 2
                  ? `w-auto h-[36px] text-[15px] px-5 text-primary ${styles.borRadius} ${styles.totalBg}`
                  : `w-auto h-[36px] text-[15px] px-5 ${styles.borRadius} bg-cbs-gray hover:bg-accent-light`
              }
              onClick={() => handleToggleTab(2)}
            >
              Ngày nay
            </button>
            <button
              className={
                toggleTab === 3
                  ? `w-auto h-[36px] text-[15px] px-5 text-primary ${styles.borRadius} ${styles.totalBg}`
                  : `w-auto h-[36px] text-[15px] px-5 ${styles.borRadius} bg-cbs-gray hover:bg-accent-light`
              }
              onClick={() => handleToggleTab(3)}
            >
              Chưa đọc
            </button>
          </div>

          <div className="relative">
            <DropdownSearchable
              placeholder="Tìm kiếm theo người tạo thông báo"
              className="w-[336px] pl-6 bg-cbs-table-header"
              classNameInput="h-[36px] bg-cbs-table-header"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={false}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Kết quả trả về 1",
                },
                {
                  _id: 2,
                  content: "Kết quả trả về 2",
                },
                {
                  _id: 3,
                  content: "Kết quả trả về 3",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
            <img
              src={SearchIcon}
              alt="Search"
              className="w-4 h-4 absolute top-10px left-3"
            />
          </div>

          <NotificationFilter />

          <div className="w-10 h-10 bg-cbs-gray rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-light">
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>

        <NotificationTab toggleTab={toggleTab} />
      </section>
    </main>
  );
};
