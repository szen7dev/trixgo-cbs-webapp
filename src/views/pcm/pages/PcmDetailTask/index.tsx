import { FC, useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import parse from "html-react-parser";
import _truncate from "lodash/truncate";
import cn from "classnames";
import { toast } from "react-toastify";

// import DownloadIcon from "assets/images/icons8-download-48_2.png";
// import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
// import CopyIcon from "assets/images/icons8-copy-96.svg";
// import RemoveIcon from "assets/images/icons8-remove.svg";
// import IconPrint from "assets/images/icons8-print-32.png";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import IconPencil from "assets/images/icons8-pencil.svg";
import SharedFolderIcon from "assets/images/icons8-shared-folder-100_1.svg";
import StackedOrganizationIcon from "assets/images/icons8-stacked-organizational-chart.svg";
import MoveStockIcon from "assets/images/icons8-move-stock-96.svg";
import IconAddUser from "assets/images/icons8-add-user-male-96 1.png";

import { SideBar, CheckList, PriceApprovalInfo, RelatedResponse, ModalUpdateTask, ModalUpdateTaskStatus } from "./components";
import { Loader } from "shareComponents/common";
import { ReplyCommentField, RootCommentsList } from 'views/pcm/shareComponents/common';
import { ProviderModalPost } from "views/pcm/contexts/post";
import CommentProvider from 'views/pcm/contexts/comment/comment.provider';

import TaskRepository from "apis/task";
import { PCM_STATUS_TASK, PCM_PRIORITY_TASK } from 'apis/localdb';
import { useTask, useCheckList, useChildTask, useCommentPcm } from "services/hooks/useTask";
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { User } from "typings/user";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";

import { useModal } from "services/hooks/useModal";
import useModalPcm from "views/pcm/hooks/useModal";
import { ModalAddNotificationEmail, ModalAddRelationUser } from "./components/Modal";
import { APP_ID } from "apis/localdb";

import styles from "views/pcm/styles/pcm_task.module.css";
import { OwnerUploadedFile, CreatorUploadedFile } from "./components";

const PcmDetailTask: FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { openModal } = useModal();
  const [{ isShow, type }, { toggleModal, openAddUserRelation, openAddNotificationEmail }] = useModalPcm();
  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const { user } = useAuth();
  const { updateTaskAsync } = useTask({});

  const { data: infoTask, refetch: refetchInfoTask, isLoading } = useQuery(`task_info.${id}`, () =>
    TaskRepository.taskInfo(id),
    { refetchOnWindowFocus: false }
  );

  const { listCheckList, totalRecord: totalRecordCheckList, nextPageListCheckList } = useCheckList({
    parentID: id, isFetchChecklist: true
  });

  const { listChildTask, totalRecord: totalRecordChildTask, nextPageListChildTask } = useChildTask({
    parentID: id, isFetchChildTask: true
  });

  const { listComments, totalRecord, limit } =
    useCommentPcm({
			key: `list_comments.${id}`,
			params: { taskID: id, type: 1 },
			isFetchComment: true
		});

  const [taskData, setTaskData] = useState({
    percentComplete: "0%",
    amountComment: 0,
    status: 1,
    priority: 1
  });
  const [isMarkInterest, setIsMarkInterest] = useState(infoTask?.data?.flags?.includes(user?._id))
  const [isShowModalUpdateTaskStatus, setIsShowModalUpdateTaskStatus] = useState(false);
  const [isTruncate, setIsTruncate] = useState(true);
  const [confirmUsers, setConfirmUsers] = useState<Array<{ author: User, createAt: string | Date }>>([]);

  const getGroupTitle = (group: any) => {
    let title = "";
    if (group?.parent) {
      const name = getGroupTitle(group?.parent);
      title = title ? `${name} > ${title}` : name;
    }

    return title ? `${title} > ${group?.name}` : group?.name;
  };

  const toggleModalUpdateTaskStatus = () => setIsShowModalUpdateTaskStatus(!isShowModalUpdateTaskStatus);

  const handleConfirmUpdateTaskStatus = (status: number) => {
    setTaskData(previous => ({ ...previous, status }));
  }

  const handleConfirmUpdateTask = () => refetchInfoTask();

  const handleConfirmSign = () => {
    setConfirmUsers(previous => ([
      ...previous,
      {
        author: user as User,
        createAt: new Date()
      }
    ]))
  }

  const handleMarkInterest = async () => {
    try {
      if(!user) return;

      const { error, data } = await updateTaskAsync({
        taskID: id,
        ...isMarkInterest ? { flagsRemoves: [user._id] } : { flags: [user._id] }
      })

      if(error) return toast.warn(data?.message);

      setIsMarkInterest(!isMarkInterest);
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message);
      }
      if(typeof error === 'string') {
        toast.error(error);
      }
    }
  }

  useEffect(() => {
    if (!isSuccessApp || !infoTask) return;
    if (isSuccessApp && !hasPermission) {
			toast.error("Bạn không có quyền truy cập tính năng này!");
			return history.push("/");
		};

    if(infoTask?.error && infoTask?.data?.keyError === "permission_denied") {
      toast.error("Bạn không có quyền truy cập công việc này!");
      return history.push('/pcm/home');
    }

    if (infoTask?.data) {
      const { percentage, amountComment, status, priority, signatures } = infoTask.data;
      const confirmUsers = signatures?.map((signature: any) => ({ author: signature.author, createAt: signature.createAt })) ?? [];

      setTaskData({
        percentComplete: `${percentage}%`,
        amountComment,
        status,
        priority
      });
      setConfirmUsers(confirmUsers);
    }
  }, [infoTask, isSuccessApp]);

  if (isLoading) {
    return <Loader className="border-primary" />;
  }

  if(!infoTask || !infoTask.data) {
    return <Redirect to="/pcm/home" />
  }

  const taskInfo = infoTask?.data;

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
          {/* <button className="mx-3">
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
          </button> */}
          <button className="mx-3" onClick={openAddNotificationEmail}>
            <img className="w-6" src={SendEmailIcon} alt="Send email icon" />
          </button>
          <button 
            className="mx-3"
            onClick={() => {
              openModal(
                <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                  <ModalUpdateTask task={taskInfo} onConfirm={handleConfirmUpdateTask} />
                </div>
              )
            }}
          >
            <img className="w-6" src={IconPencil} alt="Pencil icon" />
          </button>
          {/* <button className="mx-3">
            <img className="w-6" src={RemoveIcon} alt="Remove icon" />
          </button>
          <button className="mx-3">
            <img className="w-6 opacity-80" src={IconPrint} alt="Print icon" />
          </button> */}
          <button className="mx-3" onClick={openAddUserRelation}>
            <img className="w-6 opacity-80" src={IconAddUser} alt="User add icon" />
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
            {taskInfo?.name}
            <button className="mx-2" onClick={handleMarkInterest}>
              <img
                className="inline h-[24px] w-[24px]"
                src={`/images/common/${isMarkInterest ? 'icons8-star-96.png' : 'icon-star-filled.png'}`}
                alt="Star"
              />
            </button>
            <button
              className={cn('inline-block text-white text-xs rounded-xl px-2 py-1 mx-3', PCM_STATUS_TASK[taskData.status - 1].class)}
              onClick={toggleModalUpdateTaskStatus}
            >
              {taskData.status && PCM_STATUS_TASK[taskData.status - 1].text}
            </button>
            <span className={cn('inline-block text-white text-xs rounded-xl px-2 py-1', PCM_PRIORITY_TASK[taskData.priority - 1].class)}>
              {taskData.priority && PCM_PRIORITY_TASK[taskData.priority - 1].text}
            </span>
          </span>

          <div className="flex justify-between items-end">
            <div className="flex flex-col space-y-2">
              <div className="flex items-end">
                <img className="w-6" src={SharedFolderIcon} alt="Folder icon" />
                <span className="text-[13px] text-primary-gray mx-2">
                  {taskInfo?.project?.sign} {">"}{" "}
                  {getGroupTitle(taskInfo?.group)}
                </span>
                <div>
                  <img
                    className="h-6 w-6"
                    src={MoveStockIcon}
                    alt="Move stock icon"
                  />
                </div>
              </div>
              {taskInfo?.parent && (
                <div className="flex items-end pr-2">
                  <img
                    className="w-6"
                    src={StackedOrganizationIcon}
                    alt="Organizational icon"
                  />
                  <span className="text-[13px] text-primary-gray mx-2">
                    Việc cha: <button onClick={() => history.push(`/pcm/detail/${infoTask?.data?.parent?._id}`)}>{infoTask?.data?.parent?.name}</button>
                  </span>
                </div>
              )}
            </div>

            <div className="w-48">
              <div className="flex justify-between">
                <div>
                  <span className="text-lg leading-5">
                    {moment(infoTask?.data?.expiredTime).format("DD/MM/YYYY")}
                  </span>
                  <span className="ml-2 text-[13px] text-primary-gray">
                    {moment(infoTask?.data?.expiredTime).format("HH:mm")}
                  </span>
                </div>
                <div>
                  <span className="text-[13px] text-primary-gray">
                    {taskData.percentComplete}
                  </span>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-1.5 text-[13px] flex rounded border">
                  <div
                    style={{ width: taskData.percentComplete }}
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
              <div className={cn(styles["dont-break-out"])}>
                <div className={cn(styles["t-task-detail-content"], "text-[13px]")}>
                  {parse(
                    isTruncate
                      ? _truncate(taskInfo?.description || "", { length: 300 })
                      : taskInfo.description || ""
                  )}
                </div>
                {taskInfo?.description && (
                  <button onClick={() => setIsTruncate(!isTruncate)}>
                    <p className="text-[13px] text-primary mt-2.5 mb-4">
                      Xem thêm/Thu gọn
                    </p>
                  </button>
                )}
              </div>
              {/* <FileAttachment files={taskInfo?.authorAttachs} /> */}
            </div>
						<CreatorUploadedFile 
              className="p-5" 
              authorAttachs={taskInfo?.authorAttachs}
              author={user}
              taskID={taskInfo._id}
              companyID={taskInfo.company?._id}
              projectID={taskInfo.project?._id}
              groupID={taskInfo.group?._id}
            />
            <div className="">
              <CheckList
                componentType="CHECKLIST"
                task={taskInfo}
                data={listCheckList}
                totalRecord={totalRecordCheckList}
                onSeeMore={nextPageListCheckList}
              />
            </div>
            <div className="mt-8 pr-3">
              <CheckList
                componentType="CHILD_TASK"
                task={taskInfo}
                data={listChildTask}
                totalRecord={totalRecordChildTask}
                onSeeMore={nextPageListChildTask}
              />
            </div>
            <div className="px-5 mt-5">
              <PriceApprovalInfo
                timeApproved={taskInfo?.timeApproved}
                valueApproved={taskInfo?.valueApproved}
              />
            </div>
						<OwnerUploadedFile 
              className="p-5"
              assigneeAttachs={taskInfo?.assigneeAttachs}
              author={user}
              taskID={taskInfo._id}
              companyID={taskInfo.company?._id}
              projectID={taskInfo.project?._id}
              groupID={taskInfo.group?._id}
            />
            <div className="px-5 my-5">
              <RelatedResponse task={taskInfo} />
            </div>
          </div>

          {/*_____________task sidebar______________*/}
          <div className="w-[309px] px-5 pt-5">
            <SideBar
              userID={user?._id}
              taskID={taskInfo?._id}
              author={taskInfo?.author}
              assignee={taskInfo?.assignee}
              createAt={taskInfo?.createAt}
              related={taskInfo?.related}
              confirmUsers={confirmUsers}
              onConfirmSign={handleConfirmSign}
            />
          </div>
        </div>
        {/*_____________task comment ______________*/}
        <div className="flex bg-white mt-2" style={{ width: 1100 }}>
          {/* <CommentContainer className="w-[791px]" /> */}
          <div className="w-[791px]">
            <div className="text-x-large py-3 px-6 font-bold">
              Bình luận {taskData.amountComment > 0 ? `(${taskData.amountComment})` : ''}
            </div>
            <RootCommentsList
              className="px-5"
              userID={user?._id}
              comments={listComments}
              totalRecord={totalRecord}
              limit={limit}
              taskID={id}
            />
            <div className='flex flex-col w-full max-h-full overflow-y-auto'>
              <ReplyCommentField
                attachFile
                inputContainerClassName="flex w-full p-2"
                fileContainerClassName="border-t"
                projectID={taskInfo?.project?._id}
                groupID={taskInfo?.group?._id}
                taskID={id}
                onConfirm={(method?: string) => {
                  if(method && method === 'INSERT') {
                    setTaskData(previous => ({ ...previous, amountComment: taskData.amountComment + 1 }))
                  }
                }}
              />
            </div>
          </div>
          <ModalLarge
            show={isShow}
            toggle={toggleModal}
            className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
          >
            {type === 'relation' && <ModalAddRelationUser
              toggle={toggleModal}
              taskID={id}
              projectID={taskInfo?.project?._id || ''}
              refetch={refetchInfoTask}
              related={taskInfo?.related}
              modalType={'ADD_RELATION_USER'}
            />}
            {type === 'email' && <ModalAddNotificationEmail toggle={toggleModal} task={taskInfo} />}
          </ModalLarge>
          <ModalUpdateTaskStatus
            taskID={taskInfo._id}
            status={taskInfo.status}
            isShow={isShowModalUpdateTaskStatus}
            onClose={toggleModalUpdateTaskStatus}
            onConfirm={handleConfirmUpdateTaskStatus}
          />
        </div>
      </div>
    </>
  );
};

export const PcmDetailTaskPage: FC = () => {
  return (
    <ProviderModalPost>
      <CommentProvider>
        <PcmDetailTask />
      </CommentProvider>
    </ProviderModalPost>
  )
}