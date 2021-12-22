import { FC, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import parse from "html-react-parser";

import DownloadIcon from "assets/images/icons8-download-48_2.png";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import IconPencil from "assets/images/icons8-pencil.svg";
import RemoveIcon from "assets/images/icons8-remove.svg";
import IconPrint from "assets/images/icons8-print-32.png";
import SharedFolderIcon from "assets/images/icons8-shared-folder-100_1.svg";
import StackedOrganizationIcon from "assets/images/icons8-stacked-organizational-chart.svg";
import IconStar from "assets/images/icons8-star-96.png";
import MoveStockIcon from "assets/images/icons8-move-stock-96.svg";

import FileAttachment from "./FileAttachment";
import SideBar from "./SideBar";
import CheckList from "./CheckList";
import PriceApprovalInfo from "./PriceApprovalInfo";
import RelatedFeedback from "./RelatedFeedback";
import Loader from "components/shared/Loader";

import TaskRepository from "apis/task";
import { useCheckList } from "services/hooks/useTask";

const TaskDetailPage: FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [percentComplete, setPercentComplete] = useState("0%");

  const { data, isLoading } = useQuery(`task_info.${id}`, () =>
    TaskRepository.taskInfo(id)
  );
  const { listCheckList, totalRecord, nextPageListCheckList } =
    useCheckList(id);

  useEffect(() => {
    if (data?.data) {
      const [complete, total] = data.data.checklist.split("/");
      const percent = Number(total)
        ? Math.round((Number(complete) / Number(total)) * 100)
        : 0;
      setPercentComplete(`${percent}%`);
    }
  }, [data]);

  if (isLoading) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      {/*_____________header______________*/}
      <div className="task-management-header flex items-center justify-between pt-2 pb-2 pl-5 pr-5 border-b border-secondary-light shadow-lg">
        <div className="task-management-header-left-block flex items-center">
          <button onClick={() => history.goBack()}>
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
      <div className="flex flex-col items-center pb-5 bg-cbs-gray task-management-content overflow-auto">
        {/*_____________task title______________*/}
        <div
          className="bg-white p-5 flex flex-col space-y-2"
          style={{ width: 1100 }}
        >
          <span className="text-3x-large leading-8">
            {data?.data.name}
            <span className="mx-2">
              <img
                className="inline h-[24px] w-[24px]"
                src={IconStar}
                alt="Star"
              />
            </span>
            <span className="inline-block text-white text-xs bg-blue-500 rounded-xl px-2 py-1 mx-3">
              Đang triển khai
            </span>
            <span className="inline-block text-white text-xs rounded-xl px-2 py-1 bg-red-500">
              Cao
            </span>
          </span>

          <div className="flex justify-between items-end">
            <div className="flex flex-col space-y-2">
              <div className="flex items-end">
                <img className="w-6" src={SharedFolderIcon} alt="Folder icon" />
                <span className="text-[13px] text-primary-gray mx-2">
                  CHG.THT {">"} Tư vấn thiết kế 112 {">"} Hồ sơ thanh toán
                </span>
                <div>
                  <img
                    className="h-6 w-6"
                    src={MoveStockIcon}
                    alt="Move stock icon"
                  />
                </div>
              </div>
              <div className="flex items-end pr-2">
                <img
                  className="w-6"
                  src={StackedOrganizationIcon}
                  alt="Organizational icon"
                />
                <span className="text-[13px] text-primary-gray mx-2">
                  {`Việc cha: ${data.data?.parent?.name || ""}`}
                </span>
              </div>
            </div>

            <div className="w-48">
              <div className="flex justify-between">
                <div>
                  <span className="text-lg leading-5">
                    {moment(data.data.expiredTime).format("DD/MM/YYYY")}
                  </span>
                  <span className="ml-2 text-[13px] text-primary-gray">
                    {moment(data.data.expiredTime).format("HH:mm")}
                  </span>
                </div>
                <div>
                  <span className="text-[13px] text-primary-gray">
                    {percentComplete}
                  </span>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-1.5 text-[13px] flex rounded border">
                  <div
                    style={{ width: percentComplete }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*_____________task detail______________*/}
        <div className="flex justify-center bg-white mt-2">
          {/*_____________task content______________*/}
          <div className="w-[791px]">
            <div className="pl-5 pr-8 pt-5">
              <div>
                <p className="text-[13px]">
                  {parse(data?.data.description || "")}
                </p>
                <p className="text-[13px] text-primary mt-2.5 mb-4">
                  Xem thêm/Thu gọn
                </p>
              </div>

              <FileAttachment />
            </div>
            <div className="mt-8 pr-3">
              <CheckList
                data={listCheckList}
                totalRecord={totalRecord}
                onSeeMore={nextPageListCheckList}
              />
            </div>
            <div className="px-5 mt-10">
              <PriceApprovalInfo />
            </div>
            <div className="px-5 my-10">
              <RelatedFeedback />
            </div>
          </div>

          {/*_____________task sidebar______________*/}
          <div className="w-[309px] px-5 pt-5">
            <SideBar
              author={data.data.author}
              assignee={data.data.assignee}
              createAt={data.data.createAt}
              related={data.data.related}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailPage;
