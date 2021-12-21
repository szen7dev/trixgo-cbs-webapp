import { FC } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";

import ListProgress from "./Progress";
import Executor from "./Executor";

type Task = {
  data: Array<any>;
  totalRecord?: number;
};

type Props = {
  outDateData: Task;
  nextWeekData: Task;
  moreThanSevenDayData: Task;
};

const ListTable: FC<Props> = ({
  outDateData,
  nextWeekData,
  moreThanSevenDayData,
}) => {
  const history = useHistory();

  const handleClickTask = () => {
    history.push("/pcm/detail/12345");
  };

  return (
    <table className="relative">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-2 py-2 text-[13px] font-normal border w-[41px]">
            TT
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border w-[229px] text-left">
            Nội dung công việc
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border w-[90px] text-left">
            Thời hạn
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border w-[196px] text-left">
            Thực hiện
          </th>
          <th className="px-2 py-2 text-[13px]  font-normal border w-[143px] text-left">
            Tiến trình
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border w-[181px] text-left">
            Mô tả/ghi chú
          </th>
          <th className="px-2 py-2 text-[13px] font-normal border text-left">
            Thảo luận
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
              <button className="text-primary text-[13px]">
                {outDateData.totalRecord &&
                outDateData.totalRecord - outDateData.data.length > 0
                  ? `Xem thêm (${
                      outDateData.totalRecord - outDateData.data.length
                    })`
                  : ""}
              </button>
            </div>
          </td>
        </tr>
        {outDateData.data &&
          outDateData.data.map((taskOutDate, index) => (
            <tr
              key={taskOutDate._id}
              className="cursor-pointer"
              onClick={handleClickTask}
            >
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{taskOutDate.name}</td>
              <td className="p-2 border">
                {moment(taskOutDate.expiredTime).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">
                <Executor />
              </td>
              <td className="p-2 border">
                <ListProgress
                  color="bg-red-500"
                  checklist={taskOutDate.checklist}
                />
              </td>
              <td className="p-2 border">
                {taskOutDate.description ? parse(taskOutDate.description) : ""}
              </td>
              <td className="border p-2">
                {taskOutDate.lastLog && (
                  <span>
                    {parse(taskOutDate.lastLog?.content || "")}
                    <span> - </span>
                    <span className="text-primary text-[13px]">
                      {taskOutDate.lastLog?.author.fullname}
                    </span>
                    <span className="text-primary-gray mx-2 text-[13px]">
                      {moment(taskOutDate.lastLog?.createAt).fromNow()}
                    </span>
                  </span>
                )}
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
              <button className="text-primary text-[13px]">
                {nextWeekData.totalRecord &&
                nextWeekData.totalRecord - nextWeekData.data.length > 0
                  ? `Xem thêm (${
                      nextWeekData.totalRecord - nextWeekData.data.length
                    })`
                  : ""}
              </button>
            </div>
          </td>
        </tr>
        {nextWeekData.data &&
          nextWeekData.data.map((tasksNexWeek, index) => (
            <tr
              key={tasksNexWeek._id}
              className="cursor-pointer"
              onClick={handleClickTask}
            >
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{tasksNexWeek.name}</td>
              <td className="p-2 border">
                {moment(tasksNexWeek.expiredTime).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">
                <Executor />
              </td>
              <td className="p-2 border">
                <ListProgress
                  color="bg-yellow-500"
                  checklist={tasksNexWeek.checklist}
                />
              </td>
              <td className="p-2 border">
                {tasksNexWeek.description
                  ? parse(tasksNexWeek.description)
                  : ""}
              </td>
              <td className="border p-2">
                {tasksNexWeek.lastLog && (
                  <span>
                    {parse(tasksNexWeek.lastLog?.content || "")}
                    <span> - </span>
                    <span className="text-primary text-[13px]">
                      {tasksNexWeek.lastLog?.author.fullname}
                    </span>
                    <span className="text-primary-gray mx-2 text-[13px]">
                      {moment(tasksNexWeek.lastLog?.createAt).fromNow()}
                    </span>
                  </span>
                )}
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
              <button className="text-primary text-[13px]">
                {moreThanSevenDayData.totalRecord &&
                moreThanSevenDayData.totalRecord -
                  moreThanSevenDayData.data.length >
                  0
                  ? `Xem thêm (${
                      moreThanSevenDayData.totalRecord -
                      moreThanSevenDayData.data.length
                    })`
                  : ""}
              </button>
            </div>
          </td>
        </tr>
        {moreThanSevenDayData.data &&
          moreThanSevenDayData.data.map((taskMoreThanSevenDay, index) => (
            <tr
              key={taskMoreThanSevenDay._id}
              className="cursor-pointer"
              onClick={handleClickTask}
            >
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{taskMoreThanSevenDay.name}</td>
              <td className="p-2 border">
                {moment(taskMoreThanSevenDay.expiredTime).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">
                <Executor />
              </td>
              <td className="p-2 border">
                <ListProgress
                  color="bg-green-500"
                  checklist={taskMoreThanSevenDay.checklist}
                />
              </td>
              <td className="p-2 border">
                {taskMoreThanSevenDay.description
                  ? parse(taskMoreThanSevenDay.description)
                  : ""}
              </td>
              <td className="border p-2">
                {taskMoreThanSevenDay.lastLog && (
                  <span>
                    {parse(taskMoreThanSevenDay.lastLog?.content || "")}
                    <span> - </span>
                    <span className="text-primary text-[13px]">
                      {taskMoreThanSevenDay.lastLog?.author.fullname}
                    </span>
                    <span className="text-primary-gray mx-2 text-[13px]">
                      {moment(taskMoreThanSevenDay.lastLog?.createAt).fromNow()}
                    </span>
                  </span>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ListTable;
