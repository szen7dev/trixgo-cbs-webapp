import { FC } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import cn from "classnames";

import styles from "views/pcm/styles/pcm_task.module.css";
// import { ListProgress } from "../Progress";
import { Executor } from "../Executor";
import { PCM_STATUS_TASK } from "apis/localdb/index";

type Task = {
  data: Array<any>;
  totalRecord?: number;
};

type Props = {
  outDateData: Task;
  nextWeekData: Task;
  moreThanSevenDayData: Task;
  taskSuccessData: Task;
  onClickMore: (typeStatus: string) => void;
};

export const ListTable: FC<Props> = ({
  outDateData,
  nextWeekData,
  moreThanSevenDayData,
  taskSuccessData,
  onClickMore,
}) => {
  const history = useHistory();
  const handleClickTask = (id: string) => {
    history.push(`/pcm/detail/${id}`);
  };

  const renderSeeMoreButton = (taskData: Task, keySeeMore: string) => {
    const condition =
      taskData.totalRecord && taskData.totalRecord - taskData.data.length > 0;
    return condition ? (
      <button
        className="text-primary text-[13px]"
        onClick={() => onClickMore(keySeeMore)}
      >
        {`Xem thêm (${Number(taskData.totalRecord) - taskData.data.length})`}
      </button>
    ) : (
      ""
    );
  };

  const subContentHtml = (html?: string) => {
    const removeHtmlTag = parse(
      (html || "").replace(/<[^>]*>?/gm, " ")
    ).toString();

    const result =
      removeHtmlTag.length > 100
        ? `${removeHtmlTag.slice(0, 100)}...`
        : removeHtmlTag;
    return result;
  };
  
  return (
    <table className="relative">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-2 py-2 text-[13px] font-normal border w-[41px]">
            TT
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border text-left">
            Nội dung công việc
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border w-[90px] text-left">
            Thời hạn
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border w-[200px] text-left">
            Thực hiện
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border text-left">
            Trạng thái
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border text-left w-1/4">
            Mô tả/ghi chú
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border bg-cbs-active-comment">
          <td colSpan={1} className="w-[41px] p-2 text-[13px] font-bold">
            A1
          </td>
          <td colSpan={6} className="p-2 border-l">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold">VIỆC QUÁ HẠN</span>
              {renderSeeMoreButton(outDateData, "OUT_DATE")}
            </div>
          </td>
        </tr>
        {outDateData.data &&
          outDateData.data.map((taskOutDate, index) => (
            <tr key={taskOutDate._id}>
              <td className="p-2 border">{index + 1}</td>
              <td
                className="p-2 border cursor-pointer"
                onClick={() => handleClickTask(taskOutDate._id)}
              >
                {`${taskOutDate.project.sign}.${taskOutDate.name}`}
              </td>
              <td className="p-2 border">
                {moment(taskOutDate.actualFinishTime).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">
                <Executor color="bg-red-500" assignee={taskOutDate.assignee} />
              </td>
              <td className="p-2 border" style={{color: `#${PCM_STATUS_TASK[taskOutDate.status - 1].backgroud}`}}>
                  {PCM_STATUS_TASK[taskOutDate.status - 1].text}
              </td>
              <td className={cn(styles["dont-break-out"], "p-2 border")}>
                {subContentHtml(taskOutDate.description)}
              </td>
            </tr>
          ))}

        <tr className="border bg-cbs-active-comment">
          <td colSpan={1} className="w-[41px] p-2 text-[13px] font-bold">
            A2
          </td>
          <td colSpan={6} className="p-2 border-l">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold">VIỆC TUẦN TỚI</span>
              {renderSeeMoreButton(nextWeekData, "NEXT_WEEK")}
            </div>
          </td>
        </tr>
        {nextWeekData.data &&
          nextWeekData.data.map((tasksNexWeek, index) => (
            <tr key={tasksNexWeek._id}>
              <td className="p-2 border">{index + 1}</td>
              <td
                className="p-2 border cursor-pointer"
                onClick={() => handleClickTask(tasksNexWeek._id)}
              >
                {`${tasksNexWeek.project?.sign}.${tasksNexWeek.name}`}
              </td>
              <td className="p-2 border">
                {moment(tasksNexWeek.actualFinishTime).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">
                <Executor
                  color="bg-yellow-500"
                  assignee={tasksNexWeek.assignee}
                />
              </td>
              <td className="p-2 border" style={{color: `#${PCM_STATUS_TASK[tasksNexWeek.status - 1].backgroud}`}}>
                  {PCM_STATUS_TASK[tasksNexWeek.status - 1].text}
              </td>
              <td className={cn(styles["dont-break-out"], "p-2 border")}>
                {subContentHtml(tasksNexWeek.description)}
              </td>
            </tr>
          ))}

        <tr className="border bg-cbs-active-comment">
          <td colSpan={1} className="w-[41px] p-2 text-[13px] font-bold">
            A3
          </td>
          <td colSpan={6} className="p-2 border-l">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold">
                {"VIỆC > 7 NGÀY TIẾP THEO"}
              </span>
              {renderSeeMoreButton(moreThanSevenDayData, "MORE_THAN_SEVEN_DAY")}
            </div>
          </td>
        </tr>
        {moreThanSevenDayData.data &&
          moreThanSevenDayData.data.map((taskMoreThanSevenDay, index) => (
            <tr key={taskMoreThanSevenDay._id}>
              <td className="p-2 border">{index + 1}</td>
              <td
                className="p-2 border cursor-pointer"
                onClick={() => handleClickTask(taskMoreThanSevenDay._id)}
              >
                {`${taskMoreThanSevenDay.project?.sign}.${taskMoreThanSevenDay.name}`}
              </td>
              <td className="p-2 border">
                {moment(taskMoreThanSevenDay.actualFinishTime).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">
                <Executor
                  color="bg-green-500"
                  assignee={taskMoreThanSevenDay.assignee}
                />
              </td>
              <td className="p-2 border" style={{color: `#${PCM_STATUS_TASK[taskMoreThanSevenDay.status - 1].backgroud}`}}>
                  {PCM_STATUS_TASK[taskMoreThanSevenDay.status - 1].text}
              </td>
              <td className={cn(styles["dont-break-out"], "p-2 border")}>
                {subContentHtml(taskMoreThanSevenDay.description)}
              </td>
            </tr>
          ))}

        <tr className="border bg-cbs-active-comment">
          <td colSpan={1} className="w-[41px] p-2 text-[13px] font-bold">
            A4
          </td>
          <td colSpan={6} className="p-2 border-l">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold">VIỆC ĐÃ HOÀN THÀNH</span>
              {renderSeeMoreButton(taskSuccessData, "TASK_COMPLETED")}
            </div>
          </td>
        </tr>
        {taskSuccessData.data &&
          taskSuccessData.data.map((taskSuccess, index) => (
            <tr key={taskSuccess._id}>
              <td className="p-2 border">{index + 1}</td>
              <td
                className="p-2 border cursor-pointer"
                onClick={() => handleClickTask(taskSuccess._id)}
              >
                {`${taskSuccess.project?.sign}.${taskSuccess.name}`}
              </td>
              <td className="p-2 border">
                {moment(taskSuccess.actualFinishTime).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">
                <Executor
                  color="bg-green-500"
                  assignee={taskSuccess.assignee}
                />
              </td>
              <td className="p-2 border" style={{color: `#${PCM_STATUS_TASK[taskSuccess.status - 1].backgroud}`}}>
                  {PCM_STATUS_TASK[taskSuccess.status - 1].text}
              </td>
              <td className={cn(styles["dont-break-out"], "p-2 border")}>
                {subContentHtml(taskSuccess.description)}
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};