import { FC } from "react";

import cn from "classnames";

import styles from "../style.module.css";
import BulletedIcon from "assets/images/icons8-bulleted-list-96 1.png";

type Props = {
  currentTab?: number;
};

const TaskHomeHeader: FC<Props> = ({ currentTab }) => {
  const tabs = [
    {
      id: 1,
      title: "Việc của tôi",
    },
    {
      id: 2,
      title: "Phê duyệt của tôi",
    },
    {
      id: 3,
      title: "Yêu cầu thông tin",
    },
    {
      id: 4,
      title: "Việc quan tâm",
    },
    {
      id: 5,
      title: "Báo cáo",
    },
  ];

  return (
    <div className="flex justify-between border-b items-end">
      <div className="flex ml-2">
        {tabs.map((tab) => (
          <button key={tab.id}>
            <div
              className={`${
                currentTab === tab.id
                  ? "border-primary border-b-2 text-black font-bold"
                  : "text-primary-gray"
              } mx-2 pb-3 px-3`}
            >
              <span>{tab.title}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="flex space-x-5 items-center mr-3 py-2">
        <span className="text-primary-gray">|</span>
        <div className={cn("flex items-center h-full rounded-lg px-1")}>
          <button
            className={cn(
              styles["task-header-btn-group"],
              { [styles.active]: true },
              "flex items-center px-2 p-1 rounded-l-xl"
            )}
          >
            <img
              src={BulletedIcon}
              alt="list"
              className="inline-block mr-1.5"
            />
            <span>List</span>
          </button>
          <button
            className={cn(
              styles["task-header-btn-group"],
              { [styles.active]: false },
              "flex items-center px-2 p-1"
            )}
          >
            <img
              src={BulletedIcon}
              alt="list"
              className="inline-block mr-1.5"
            />
            <span>Project</span>
          </button>
          <button
            className={cn(
              styles["task-header-btn-group"],
              { [styles.active]: false },
              "flex items-center px-2 p-1 rounded-r-xl"
            )}
          >
            <img
              src={BulletedIcon}
              alt="list"
              className="inline-block mr-1.5"
            />
            <span>Type</span>
          </button>
        </div>
      </div>
    </div>
  );
};

TaskHomeHeader.defaultProps = {
  currentTab: 1,
};
export default TaskHomeHeader;
