/**
 * Libraries
 */
import { FC, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Components
 */
import { ClassifyTable, ListTasksReport } from "views/pcm/shareComponents/common";
import { Loader } from "shareComponents/common/Loader";

/**
 * Hooks, Utils
 */
import { useTask } from "services/hooks/useTask";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
// import { SearchInput } from "shareComponents/common";
// import { debounce } from "lodash";
import { usePcmReport } from "services/hooks/pcm/usePcm";

const PcmTasksReportPage: FC = () => {
  const [params, setParams] = useState({});
  const [viewMode, setViewMode] = useState("LIST");
  const history = useHistory();
  const { reportID } = useParams<{ reportID: string }>();
  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const {
    listTasks,
    totalRecord,
    isLoadingListTask,
    nextPageListTask,
  } = useTask({
    params,
    isFetch: true
  });

  const { infoReport } = usePcmReport({
    subjectID: reportID
  });

  const handleSeeMore = () => nextPageListTask();

  useEffect(() => {
    if (!isSuccessApp) return;
    if (isSuccessApp && !hasPermission) {
			toast.error("Bạn không có quyền truy cập tính năng này!");
			history.push("/");
		};

    document.title = "Quản lý công việc";
  }, [isSuccessApp]);

  useEffect(() => {
    if(!infoReport || !Object.keys(infoReport).length) return;
    setParams(infoReport.conditionPin);
  }, [infoReport])

  if (isLoadingListTask || !infoReport || !Object.keys(infoReport).length) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
          <button className="mr-3" onClick={history.goBack}>
            <img src={`${process.env.PUBLIC_URL}/images/common/button_back.png`} alt="Back" />
          </button>
					<p className="text-lg">Chi tiết báo cáo: {infoReport.name}</p>
					{/* <SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/> */}
				</div>
			</header>

      <div className="task-management-content overflow-auto">
        {/* Table */}
        <div className={"flex flex-col w-full"}>
          {viewMode === "LIST" && (
            <ListTasksReport
              tasks={listTasks}
              totalRecord={totalRecord}
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

export default PcmTasksReportPage