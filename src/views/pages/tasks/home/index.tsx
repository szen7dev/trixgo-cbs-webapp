import { FC, useState, useEffect } from "react";

import TaskHomeHeader from "./components/TaskHomeHeader";
import ListTable from "./components/ListTable";
import ClassifyTable from "./components/ClassifyTable";
import { useTask } from "../../../../services/hooks/useTask";
import Loader from "components/shared/Loader";

const TaskHomePage: FC = () => {
  const [viewMode, setViewMode] = useState("LIST");
  const {
    listTasks: tasksOutDate,
    totalRecord: outDateRecords,
    nextPageListTask: nextPageTaskOutDate,
  } = useTask();
  const {
    listTasks: tasksNextWeek,
    isLoadingListTask,
    totalRecord: nextWeekRecords,
    nextPageListTask: nextPageTaskNextWeek,
  } = useTask(2);
  const {
    listTasks: tasksMoreThanSevenDay,
    totalRecord: moreSevenDayRecord,
    nextPageListTask: nextPageTaskMore,
  } = useTask(3);

  const handleSeeMore = (typeStatus: string) => {
    switch (typeStatus) {
      case "OUT_DATE":
        nextPageTaskOutDate();
        break;
      case "NEXT_WEEK":
        nextPageTaskNextWeek();
        break;
      case "MORE_THAN_SEVEN_DAY":
        nextPageTaskMore();
        break;
      default:
    }
  };

  useEffect(() => {
    document.title = "Quản lí công việc";
  }, []);

  return (
    <>
      <div>
        <TaskHomeHeader viewMode={viewMode} onChangeMode={setViewMode} />
      </div>
      {isLoadingListTask && <Loader className="border-primary" />}

      <div className="task-management-content overflow-auto">
        {/* Table */}
        <div className={" flex flex-col w-full"}>
          {viewMode === "LIST" && (
            <ListTable
              outDateData={{ data: tasksOutDate, totalRecord: outDateRecords }}
              nextWeekData={{
                data: tasksNextWeek,
                totalRecord: nextWeekRecords,
              }}
              moreThanSevenDayData={{
                data: tasksMoreThanSevenDay,
                totalRecord: moreSevenDayRecord,
              }}
              onClickMore={handleSeeMore}
            />
          )}
          {viewMode === "PROJECT" && (
            <ClassifyTable title=" Dự án/ phòng ban" />
          )}
          {viewMode === "TYPE" && <ClassifyTable title="Loại công việc" />}
        </div>
      </div>
    </>
  );
};

export default TaskHomePage;
