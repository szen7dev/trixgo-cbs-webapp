import { FC, useState, useEffect } from "react";

import { Header, ClassifyTable } from "views/pcm/shareComponents/common";
import { ListTable } from "views/pcm/shareComponents/common/ListTable/index2";
import { useTask } from "services/hooks/useTask";
import { Loader } from "shareComponents/common/Loader";
import { SearchInput } from "shareComponents/common";
import debounce from "lodash/debounce";

import { useCheckPerAccessApp } from "services/hooks/useAuth";
import { APP_ID } from "apis/localdb";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";

type Props = {
  type?: number
}

export const PcmTaskGroupPage: FC<Props> = ({ type = 1 }) => {
	const { groupID } = useParams<{ groupID: string }>();
  const [viewMode, setViewMode] = useState("LIST");
  const history = useHistory();
  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	const [keyword, setKeyword] = useState("");

  // Việc quá hạn
  const {
    listTasks: tasksOutDate,
    totalRecord: outDateRecords,
    nextPageListTask: nextPageTaskOutDate,
    refetchListTask: refetchListTaskOutDate
  } = useTask({ keyword, groupID, typeStatus: "1", statusNe: "3" });
  
  // Việc tuần tới
  const {
    listTasks: tasksNextWeek,
    isLoadingListTask,
    totalRecord: nextWeekRecords,
    nextPageListTask: nextPageTaskNextWeek,
    refetchListTask: refetchListTaskNextWeek
  } = useTask({ keyword, groupID, typeStatus: "2", statusNe: "3" });

  // Việc 7 ngày tới
  const {
    listTasks: tasksMoreThanSevenDay,
    totalRecord: moreSevenDayRecord,
    nextPageListTask: nextPageTaskMore,
    refetchListTask: refetchListTaskMore
  } = useTask({ keyword, groupID, typeStatus: "3", statusNe: "3" });

  // Việc hoàn thành
  const {
    listTasks: tasksCompleted,
    totalRecord: completeRecord,
    nextPageListTask: nextPagetasksCompleted,
    refetchListTask: refetchListtasksCompleted
  } = useTask({ keyword, groupID, status: "3" });

  // Nếu keword thay đổi thì call api
  useEffect(() => {
    refetchListTaskOutDate();
    refetchListTaskNextWeek();
    refetchListTaskMore();
    refetchListtasksCompleted();
  }, [keyword]);

	const { infoGroup } = usePcmPlanGroup({ groupID }, false, true);
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
      case "TASK_COMPLETED":
        nextPagetasksCompleted();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isSuccessApp) return;
    if (isSuccessApp && !hasPermission) {
			toast.error("Bạn không có quyền truy cập tính năng này!");
			history.push("/");
    };
    document.title = "Quản lý công việc";
  }, [isSuccessApp]);  

  if (isLoadingListTask) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <div>
        <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
          <div className="flex items-center">
            <p className="text-lg">{infoGroup?.data?.name}</p>
            <SearchInput
              classNameWrapper="ml-4"
              classNameInput="outline-none w-[296px]"
              onChange={debounce(
                (event: any) => setKeyword(event.target.value),
                500
              )}
            />
          </div>
        </header>
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
              taskSuccessData={{
                data: tasksCompleted,
                totalRecord: completeRecord,
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
