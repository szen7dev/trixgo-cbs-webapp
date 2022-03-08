import { FC, useState, useEffect } from "react";

import { Header, ListTable, ClassifyTable } from "views/pcm/shareComponents/common";
import { useTask } from "services/hooks/useTask";
import { Loader } from "shareComponents/common/Loader";

type Props = {
  type?: number
}

export const PcmHome: FC<Props> = ({ type = 1 }) => {
  const [viewMode, setViewMode] = useState("LIST");
  const {
    listTasks: tasksOutDate,
    totalRecord: outDateRecords,
    nextPageListTask: nextPageTaskOutDate,
  } = useTask({ type });

  const {
    listTasks: tasksNextWeek,
    isLoadingListTask,
    totalRecord: nextWeekRecords,
    nextPageListTask: nextPageTaskNextWeek,
  } = useTask({ type, typeStatus: 2 });

  const {
    listTasks: tasksMoreThanSevenDay,
    totalRecord: moreSevenDayRecord,
    nextPageListTask: nextPageTaskMore,
  } = useTask({ type, typeStatus: 3 });

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
        break;
    }
  };

  useEffect(() => {
    document.title = "Quản lý công việc";
  }, []);

  if (isLoadingListTask) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <div>
        <Header type={type} viewMode={viewMode} onChangeMode={setViewMode} />
      </div>

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
