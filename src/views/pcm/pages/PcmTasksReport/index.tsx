/**
 * Libraries
 */
import { FC, useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Components
 */
import { ClassifyTable, ListTasksReport, AccessingUsers } from "views/pcm/shareComponents/common";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { Loader } from "shareComponents/common/Loader";
import ModalShare from './components/ModalShare';
import { APP_ID } from "apis/localdb";
// import { SearchInput } from "shareComponents/common";

/**
 * Hooks, Utils
 */
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { usePcmReport } from "services/hooks/pcm/usePcm";
import { useSearchTask } from "services/hooks/useMainSearch";
import { useAuth } from "services/hooks/auth/useAuth";
import { User } from "typings/user";

const PcmTasksReportPage: FC = () => {
  const history = useHistory();
  const [params, setParams] = useState({});
  const [viewMode, setViewMode] = useState("LIST");
  const { reportID } = useParams<{ reportID: string }>();
  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const [modalShare, setModalShare] = useState<{ isShow: boolean, users: User[] | undefined }>({
    isShow: false,
    users: [],
  });

  const [permissions, setPermissions] = useState<{
    usersShared: User[];
    hasPermissionShare: boolean;
  }>({
    usersShared: [],
    hasPermissionShare: false,
  });

  const { user } = useAuth();

  const {
    listTasks,
    nextPageListTask,
    totalRecord,
    isLoadingListTask
  } = useSearchTask({
    params,
    isFetch: !!Object.keys(params).length
  })

  const { infoReport, refetchInfoReport, isLoadingInfoReport } = usePcmReport({
    subjectID: reportID
  });

  useEffect(() => {
    // if (!isSuccessApp) return;
    // if (isSuccessApp && !hasPermission) {
		// 	toast.error("Bạn không có quyền truy cập tính năng này!");
		// 	history.push("/pcm/report");
		// };

    document.title = "Quản lý công việc";
  }, [isSuccessApp, hasPermission]);

  useEffect(() => {
    if(!infoReport) return;

    if(Object.keys(infoReport).length && Object.keys(infoReport?.conditionPin).length) {
      setParams(infoReport.conditionPin);
    }
  }, [JSON.stringify(infoReport)])

  useEffect(() => {
    if(!Object.keys(infoReport).length) return;

    const isStringMembersID = infoReport.members?.every?.((item: any) => typeof item === 'string');
    let usersIDShared = [];
    let authorID = '';
    let hasPermissionShare = false;

    if(isStringMembersID) {
      usersIDShared = infoReport.members;
    } else{
      usersIDShared = infoReport.members?.map?.(item => item._id) ?? [];
    }

    if(typeof infoReport.author === 'string') {
      authorID = infoReport.author;
    } else{
      authorID = infoReport.author?._id;
    }

    usersIDShared = [...usersIDShared, authorID];
    hasPermissionShare = authorID === user?._id;

    if(!usersIDShared.includes(user?._id)) {
      toast.warn('Bạn đang không có quyền truy cập');
      history.push('/pcm/report');
    }

    setPermissions({
      usersShared: infoReport.members,
      hasPermissionShare
    })
  }, [infoReport.members, infoReport.author, user?._id])

  const toggleModalShare = (users?: User[] | undefined) =>{
    if(users && users.length) {
      setModalShare({ isShow: !modalShare.isShow, users });
    } else{
      setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }));
    }
  }

  if (isLoadingListTask || isLoadingInfoReport) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center justify-between w-full">
          <div className="flex">
            <button className="mr-3" onClick={history.goBack}>
              <img src={`${process.env.PUBLIC_URL}/images/common/button_back.png`} alt="Back" />
            </button>
            <p className="text-lg">Chi tiết báo cáo: {infoReport.name}</p>
          </div>
					{/* <SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/> */}

          <div className="flex">
            <button
              className="text-gray-400 mr-2"
              onClick={() => toggleModalShare(infoReport.members)}
            >Thành viên ({infoReport.members?.length})</button>
            {(permissions.usersShared.length) ? <AccessingUsers users={permissions.usersShared} /> : ''}
          </div>
				</div>
			</header>

      <div className="task-management-content overflow-auto">
        {/* Table */}
        <div className={"flex flex-col w-full"}>
          {viewMode === "LIST" && (
            <ListTasksReport
              tasks={listTasks}
              totalRecord={totalRecord}
              onClickMore={nextPageListTask}
            />
          )}

          {viewMode === "PROJECT" && (
            <ClassifyTable title=" Dự án/ phòng ban" />
          )}
          {viewMode === "TYPE" && <ClassifyTable title="Loại công việc" />}
        </div>
      </div>

      <ModalLarge
        show={modalShare.isShow}
        toggle={toggleModalShare}
        className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
      >
        <ModalShare
            toggle={toggleModalShare}
            refetch={refetchInfoReport}
            reportId={reportID}
            users={modalShare.users}
            hasPermission={permissions.hasPermissionShare}
        />
      </ModalLarge>
    </>
  );
};

export default PcmTasksReportPage