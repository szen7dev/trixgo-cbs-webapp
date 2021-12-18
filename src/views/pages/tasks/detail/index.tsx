import { FC } from "react";

import downloadIcon from "assets/images/icons8-download-48_2.png";
import shareIcon from "assets/images/icons8-share-rounded-96_1.svg";
import sendEmailIcon from "assets/images/icons8-send-email-96_1.svg";
import copyIcon from "assets/images/icons8-copy-96_1.svg";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import iconPencil from "assets/images/icons8-pencil.svg";
import removeIcon from "assets/images/icons8-remove.svg";
import iconPrint from "assets/images/icons8-print-32.png";
import sharedFolderIcon from "assets/images/icons8-shared-folder-100_1.svg";
import stackedOrganizationIcon from "assets/images/icons8-stacked-organizational-chart.svg";
import iconStar from "assets/images/icon-star-filled.png";

const TaskDetailPage: FC = () => {
  return (
    <>
      {/*_____________header______________*/}
      <div className="task-management-header flex items-center justify-between pt-2 pb-2 pl-5 pr-5 border-b border-secondary-light shadow-lg">
        <div className="task-management-header-left-block flex items-center">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <span className="mx-5 text-primary-gray">|</span>
          <button className="mx-3">
            <img
              className="w-6 opacity-80"
              src={downloadIcon}
              alt="Download icon"
            />
          </button>
          <button className="mx-3">
            <img className="w-6" src={shareIcon} alt="Share icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={copyIcon} alt="Copy icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={sendEmailIcon} alt="Send email icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={iconPencil} alt="Pencil icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={removeIcon} alt="Remove icon" />
          </button>
          <button className="mx-3">
            <img className="w-6 opacity-80" src={iconPrint} alt="Print icon" />
          </button>
        </div>

        <div className="task-management-header-right-block flex items-center">
          <button className="w-10 h-10 flex justify-center items-center bg-lighter-gray rounded-full">
            <DotsVerticalIcon />
          </button>
        </div>
      </div>

      {/*_____________main content______________*/}
      <div className="w-full h-full px-48 bg-gray-100 task-management-content overflow-auto">
        {/*_____________task title______________*/}
        <div className="bg-white p-5 flex flex-col space-y-2">
          <span>
            <span className="text-xl leading-8">
              Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112 - Dự án Xây
              dựng cụm trường tiểu học và trung học cơ sở Tây Hồ Tây
            </span>
            <span className="text-white text-xs bg-blue-500 rounded-xl px-2 py-1 mx-3">
              Đang triển khai
            </span>
            <span className="text-white text-xs rounded-xl px-2 py-1 bg-red-500">
              Cao
            </span>
          </span>

          <div className="flex justify-between items-end">
            <div className="flex flex-col space-y-2">
              <div className="flex items-end">
                <img className="w-6" src={sharedFolderIcon} alt="Folder icon" />
                <span className="text-xs text-gray-500 mx-2">
                  CHG.THT {">"} Tư vấn thiết kế 112 {">"} Hồ sơ thanh toán
                </span>
                <div className="tpf-param-star tpf-param-star-active">
                  <img className="h-6 w-6" src={iconStar} alt="Star" />
                </div>
              </div>
              <div className="flex items-end">
                <img
                  className="w-6"
                  src={stackedOrganizationIcon}
                  alt="Organizational icon"
                />
                <span className="text-xs text-gray-500 mx-2">
                  Việc cha: Hồ sơ thanh toán của công ty tư vấn thiết kế 112
                </span>
              </div>
            </div>

            <div className="w-48">
              <div className="flex justify-between">
                <div>
                  <span className="text-lg leading-5">19/5/2021</span>
                  <span className="ml-2 text-gray-500">15:03</span>
                </div>
                <div>
                  <span className="text-gray-500">48%</span>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-1 text-xs flex rounded bg-green-200">
                  <div
                    style={{ width: "48%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*_____________task detail______________*/}
        <div className="bg-white mt-2 h-full">

        </div>
      </div>
    </>
  );
};

export default TaskDetailPage;
