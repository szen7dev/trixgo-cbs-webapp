import { FC } from "react";

import DownloadIcon from "assets/images/icons8-download-48_2.png";
import ShareIcon from "assets/images/icons8-share-rounded-96_1.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96_1.svg";
import CopyIcon from "assets/images/icons8-copy-96_1.svg";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import IconPencil from "assets/images/icons8-pencil.svg";
import RemoveIcon from "assets/images/icons8-remove.svg";
import IconPrint from "assets/images/icons8-print-32.png";
import SharedFolderIcon from "assets/images/icons8-shared-folder-100_1.svg";
import StackedOrganizationIcon from "assets/images/icons8-stacked-organizational-chart.svg";
import IconStar from "assets/images/icon-star-filled.png";
import ChevronUpIcon from "assets/images/icon-chevron-up.png";
import HumanAvatar from "assets/images/human-avatar.svg";
import LineConnector from "assets/images/line-connector.svg";
import LongArrowIcon from "assets/images/icon-long-arrow.svg";

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
              src={DownloadIcon}
              alt="Download icon"
            />
          </button>
          <button className="mx-3">
            <img className="w-6" src={ShareIcon} alt="Share icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={CopyIcon} alt="Copy icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={SendEmailIcon} alt="Send email icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={IconPencil} alt="Pencil icon" />
          </button>
          <button className="mx-3">
            <img className="w-6" src={RemoveIcon} alt="Remove icon" />
          </button>
          <button className="mx-3">
            <img className="w-6 opacity-80" src={IconPrint} alt="Print icon" />
          </button>
        </div>

        <div className="task-management-header-right-block flex items-center">
          <button className="w-10 h-10 flex justify-center items-center bg-lighter-gray rounded-full">
            <DotsVerticalIcon />
          </button>
        </div>
      </div>

      {/*_____________main content______________*/}
      <div className="w-full h-full px-40 bg-gray-100 task-management-content overflow-auto">
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
                <img className="w-6" src={SharedFolderIcon} alt="Folder icon" />
                <span className="text-xs text-gray-500 mx-2">
                  CHG.THT {">"} Tư vấn thiết kế 112 {">"} Hồ sơ thanh toán
                </span>
                <div className="tpf-param-star tpf-param-star-active">
                  <img className="h-6 w-6" src={IconStar} alt="Star" />
                </div>
              </div>
              <div className="flex items-end">
                <img
                  className="w-6"
                  src={StackedOrganizationIcon}
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
        <div className="bg-white mt-2 flex p-5">
          <div className="w-2/3">01</div>

          <div className="w-1/3">
            <div>
              <div className="flex justify-between mb-2.5">
                <span className="font-bold text-xs leading-4">
                  Đệ trình và phê duyệt
                </span>
                <button title="Toggle header" className="">
                  <img
                    className="w-3"
                    src={ChevronUpIcon}
                    alt="Toggle button"
                  />
                </button>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <div className="flex">
                    <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                    <div className="flex items-center">
                      <img
                        className="px-2 w-auto h-6"
                        src={LongArrowIcon}
                        alt="Arrow icon"
                      />
                    </div>
                  </div>
                  <span className="mt-2 leading-4">
                    Cao Hoàng Thùy Linh-112
                  </span>
                </div>
                <div className="w-1/2">
                  <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                  <span className="mt-2 leading-4">Nguyễn Trần Anh-CPMI</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                13:37 6/7/21 - 18 giờ trước
              </span>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-end mb-2.5">
                <span className="font-bold text-xs leading-4">
                  Người liên quan
                </span>
                <button>
                  <span className="text-primary text-xs leading-4">
                    Xem tất cả
                  </span>
                </button>
              </div>
              <div className="flex overflow-hidden space-x-3">
                <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2.5">
                <span className="font-bold text-xs leading-4">
                  Tiến trình xác nhận
                </span>
              </div>
              <div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                    <div className="ml-2">
                      <p className="text-xs">Lê Trọng Quyền-CPMI</p>
                      <p className="text-xs text-gray-500">
                        13:15 28/2/21 - 2h ago
                      </p>
                    </div>
                  </div>
                  <span className="font-bold rounded min-w-max text-green-600 text-xs">
                    Đã đồng ý
                  </span>
                </div>
                <img
                  className="w-10 h-6"
                  src={LineConnector}
                  alt="Timeline icon"
                />
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                    <div className="ml-2">
                      <p className="text-xs">Trần Tiến Tùng-PGI</p>
                      <p className="text-xs text-gray-500">
                        13:15 28/2/21 - 2h ago
                      </p>
                    </div>
                  </div>
                  <button className="font-bold px-4 h-8 rounded min-w-max text-primary-light text-xs bg-green-600">
                    Đồng ý
                  </button>
                </div>
                <img
                  className="w-10 h-6"
                  src={LineConnector}
                  alt="Timeline icon"
                />
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                    <div className="ml-2">
                      <p className="text-xs">Hà Tiến Dũng-CHG</p>
                      <p className="text-xs text-gray-500">
                        13:15 28/2/21 - 2h ago
                      </p>
                    </div>
                  </div>
                  <span className="font-bold rounded min-w-max text-green-600 text-xs">
                    Đã đồng ý
                  </span>
                </div>
                <img
                  className="w-10 h-6"
                  src={LineConnector}
                  alt="Timeline icon"
                />
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                    <div className="ml-2">
                      <p className="text-xs">Đỗ Hữu Khu-CHG</p>
                      <p className="text-xs text-gray-500">Cán bộ thanh toán</p>
                    </div>
                  </div>
                  <button className="font-bold px-4 h-6 rounded-xl min-w-max text-green-600 text-xs bg-green-100">
                    Pending
                  </button>
                </div>
                <img
                  className="w-10 h-6"
                  src={LineConnector}
                  alt="Timeline icon"
                />
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
                    <div className="ml-2">
                      <p className="text-xs">Vũ Thị Lan-CHG</p>
                      <p className="text-xs text-gray-500">
                        13:15 28/2/21 - 2h ago
                      </p>
                    </div>
                  </div>
                  <button className="font-bold px-4 h-6 rounded-xl min-w-max text-green-600 text-xs bg-green-100">
                    Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailPage;
