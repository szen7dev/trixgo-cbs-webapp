import { FC, useState, useEffect, useContext } from "react";
import { captureException } from "@sentry/react";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { Menu } from '@headlessui/react';
import { useQuery } from "react-query";
import moment from "moment";
import parse from "html-react-parser";
import _truncate from "lodash/truncate";
import cn from "classnames";
import { toast } from "react-toastify";

/**
 * Assets
 */
// import DownloadIcon from "assets/images/icons8-download-48_2.png";
// import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
// import RemoveIcon from "assets/images/icons8-remove.svg";
import IconPrint from "assets/images/icons8-print-32.png";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import IconPencil from "assets/images/icons8-pencil.svg";
import SharedFolderIcon from "assets/images/icons8-shared-folder-100_1.svg";
import StackedOrganizationIcon from "assets/images/icons8-stacked-organizational-chart.svg";
import MoveStockIcon from "assets/images/icons8-move-stock-96.svg";
import IconAddUser from "assets/images/icons8-add-user-male-96 1.png";
import styles from "views/pcm/styles/pcm_task.module.css";

/**
 * Components
 */
import {
  OwnerUploadedFile,
  CreatorUploadedFile,
  ModalAddNotificationEmail,
  ModalAddRelationUser,
  SideBar,
  CheckList,
  // PriceApprovalInfo,
  RelatedResponse,
  ModalUpdateTask,
  ModalUpdateTaskStatus,
  ModalMoveTaskToParent,
  ModalMoveTaskToGroup,
  ModalUpdateMilestone
} from "./components";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { CommentFull } from "../../shareComponents/common";
import { Loader, ModalConfirm, DropdownOption } from "shareComponents/common";

/**
 * Context
 */
import ResponseProvider from 'views/pcm/contexts/response/comment.provider';
import CommentProvider from 'views/pcm/contexts/comment/comment.provider';
import ResponseContext from 'views/pcm/contexts/response/comment.context';
import CommentContext from 'views/pcm/contexts/comment/comment.context';

/**
 * Utils
 */
import { APP_ID, PCM_STATUS_TASK, PCM_PRIORITY_TASK } from 'apis/localdb';
import { TOAST_DEFAULT_OPTIONS } from "utils/constants";

/**
 * Hooks, Typings
 */
import TaskRepository from "apis/task";
import { useModal } from "services/hooks/useModal";
import { useSocket } from "services/hooks/useSocket";
import useModalPcm from "views/pcm/hooks/useModal";
import { useTask, useCheckList, useChildTask, useCommentPcm } from "services/hooks/useTask";
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

import { User } from "typings/user";

const PcmDetailTask: FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { openModal, closeModal } = useModal();

  const [{ isShow, type }, {
    toggleModal,
    openAddUserRelation,
    openAddNotificationEmail,
    openMoveTaskToParent,
    openMoveTaskToGroup,
    openUpdateMilestone
  }] = useModalPcm();

  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const { user } = useAuth();
  const { current: socket }: any = useSocket();
  const { dispatch: responseDispatch } = useContext(ResponseContext);
  const { dispatch: commentDispatch } = useContext(CommentContext);

  const { updateTaskAsync, copyTaskAsync } = useTask({});

  const { data: infoTask, refetch: refetchInfoTask, isLoading } = useQuery(`task_info.${id}`, () =>
    TaskRepository.taskInfo({ taskID: id }),
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

  const [permissions, setPermissions] = useState({
    hasPermissionUpdateTask: false,
    hasPermissionAddRelatedUser: false,
    hasPermissionCreateCheckListAndChildTask: false,
    hasPermissionCreateRelatedResponse: false,
    hasPermissionComment: false,
    hasPermissionCreatorAddFile: false,
    hasPermissionAssigneeAddFile: false,
  });

  const [isMarkInterest, setIsMarkInterest] = useState(infoTask?.data?.flags?.includes(user?._id))
  const [isShowModalUpdateTaskStatus, setIsShowModalUpdateTaskStatus] = useState(false);
  const [isTruncate, setIsTruncate] = useState(true);
  const [isTempTask, setIsTempTask] = useState(true);
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

  const handleConfirmUpdateTaskStatus = (status: number) => setTaskData(previous => ({ ...previous, status }));

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
			captureException(error);
      if(error instanceof Error)
        toast.error(error.message);
      if(typeof error === 'string')
        toast.error(error);
    }
  }

  const handleMoveToOfficialTask = async () => {
    try {
      const { error, data } = await updateTaskAsync({
        taskID: id,
        draft: 0
      })

      if(error) return toast.warn(data?.message);

      setIsTempTask(false);
      toast.success('Cập nhật thành công', TOAST_DEFAULT_OPTIONS);
    } catch (error) {
			captureException(error);
      if(error instanceof Error)
        toast.error(error.message);
      if(typeof error === 'string')
        toast.error(error);
    } finally {
      closeModal();
    }
  }

  const toggleModalMoveToOfficialTask = () => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn chuyển thành việc chính thức không?"
          description="Khi chuyển thành việc chính thức, bạn sẽ không thể sửa được tên công việc, xóa được người liên quan. Việc chính thức sẽ không chuyển thành việc nháp được"
          onConfirm={handleMoveToOfficialTask}
          onCancel={closeModal}
        />
      </div>
    );
  };

  const handleCopyTask = async () => {
    try {
      const { error, data } = await copyTaskAsync({ taskID: id });

      if(error) return toast.warn(data?.message);

      history.push(`/pcm/detail/${data._id}`);
    } catch (error) {
			captureException(error);
      if(error instanceof Error)
        toast.error(error.message);
      if(typeof error === 'string')
        toast.error(error);
    } finally {
      closeModal();
    }
  }

  const toggleModalCopyTask = () => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[220px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn copy công việc không?"
          description="Dự án/phòng ban, nhóm dữ liệu, công việc cha, người thực hiện, người liên quán, sẽ được copy và tạo thành việc nháp"
          onConfirm={handleCopyTask}
          onCancel={closeModal}
        />
      </div>
    );
  };

  const listenEventAddComment = (result: any) => {
    const { data, error } = result;

    if(error) return;

    const { infoObject, infoComment, parentID, method } = data;

    if(infoObject?._id !== id) return;
		if(user?._id === infoComment?.author?._id) return;

    switch (data.commentType) {
      case 'COMMENT': {
        if(method === 'UPDATE') {
          return commentDispatch({
            type: 'UPDATE_COMMENT',
            payload: {
              commentID: infoComment._id,
              parent: parentID,
              body: infoComment,
            }
          });
        }

        commentDispatch({ type: 'ADD_COMMENT', payload: infoComment });
        break;
      }
      case 'RESPONSE': {
        responseDispatch({ type: 'ADD_COMMENT', payload: infoComment });
        break;
      }
      default:
        break;
    }
  }

  useEffect(() => {
		socket?.on("COMMENT_SSC_ADD_COMMENT", listenEventAddComment);
    return () => socket?.off("COMMENT_SSC_ADD_COMMENT", listenEventAddComment);
  }, [socket])

  useEffect(() => {
    if (!isSuccessApp || !infoTask) return;
    if (isSuccessApp && !hasPermission) {
			toast.error("Bạn không có quyền truy cập tính năng này!");
			return history.push("/");
		};

    if(infoTask.error && infoTask.data?.keyError === "permission_denied") {
      toast.error("Bạn không có quyền truy cập công việc này!");
      return history.push('/pcm/home');
    }

    if (infoTask?.data) {
      const taskInfo = infoTask.data;
      const { percentage, amountComment, status, priority, signatures } = taskInfo;
      const confirmUsers = signatures?.map((signature: any) => ({
        author: signature.author,
        createAt: signature.createAt
      })) ?? [];

      const relatedsID                    = taskInfo.related?.map((user: any) => user._id) ?? [];
      const groupMembersID                = taskInfo.group?.members?.map((user: any) => user._id) ?? [];
      const authorAndAssigneeID           = [taskInfo.author?._id, taskInfo.assignee?._id].filter(Boolean);
      const authorAndAssigneeAndRelatedID = [...authorAndAssigneeID, ...relatedsID].filter(Boolean);

      const hasPermissionUpdateTask       = taskInfo.author?._id === user?._id;
      const hasPermissionAddRelatedUser   = authorAndAssigneeID.includes(user?._id);
      const hasPermissionCreatorAddFile   = taskInfo.author?._id === user?._id;
      const hasPermissionAssigneeAddFile  = taskInfo.assignee?._id === user?._id;

      const hasPermissionCreateCheckListAndChildTask = authorAndAssigneeID.includes(user?._id);
      const hasPermissionCreateRelatedResponse = authorAndAssigneeAndRelatedID.includes(user?._id);
      const hasPermissionComment = [...authorAndAssigneeAndRelatedID, ...groupMembersID].includes(user?._id);

      setPermissions({
        hasPermissionUpdateTask,
        hasPermissionAddRelatedUser,
        hasPermissionCreateCheckListAndChildTask,
        hasPermissionCreateRelatedResponse,
        hasPermissionComment,
        hasPermissionCreatorAddFile,
        hasPermissionAssigneeAddFile
      })

      setTaskData({
        percentComplete: `${percentage}%`,
        amountComment,
        status,
        priority
      });
      setConfirmUsers(confirmUsers);
    }
  }, [infoTask, isSuccessApp, hasPermission]);

  if (isLoading) {
    return <Loader className="border-primary" />;
  }

  if(!infoTask || !infoTask.data) {
    return <Redirect to="/pcm/home" />
  }

  const taskInfo = infoTask.data;

  return (
    <>
      {/*_____________header______________*/}
      <div className="task-management-header flex items-center justify-between pt-2 pb-2 pl-5 pr-5 border-b border-secondary-light shadow-lg">
        <div className="task-management-header-left-block flex items-center">
          <button onClick={history.goBack}>
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
          </button> */}
          {/* <button className="mx-3">
            <img className="w-6" src={ShareIcon} alt="Share icon" />
          </button> */}
          <button className="mx-3" onClick={toggleModalCopyTask}>
            <img className="w-6" src={CopyIcon} alt="Copy icon" />
          </button>
          <button className="mx-3" onClick={openAddNotificationEmail}>
            <img className="w-6" src={SendEmailIcon} alt="Send email icon" />
          </button>
          {permissions.hasPermissionUpdateTask && (
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
          )}
          {/* <button className="mx-3">
            <img className="w-6" src={RemoveIcon} alt="Remove icon" />
          </button> */}
          {/* <DropdownOption
            view={<img className="w-6 opacity-80" src={IconPrint} alt="Print" />}
            classNameItem="left-1"
          >
            <Menu.Item onClick={() => history.push(`/pcm/detail/${taskInfo._id}/print/1`)}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>Loại 1</div>
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => history.push(`/pcm/detail/${taskInfo._id}/print/2`)}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>Loại 2</div>
              </div>
            </Menu.Item>
             <Menu.Item onClick={() => history.push(`/pcm/detail/${taskInfo._id}/print/3`)}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>Loại 3</div>
              </div>
            </Menu.Item>
          </DropdownOption> */}
          {/* <button className="mx-3">
            <img className="w-6 opacity-80" src={IconPrint} alt="Print icon" />
          </button> */}
          {permissions.hasPermissionAddRelatedUser && (
            <button className="mx-3" onClick={openAddUserRelation}>
              <img className="w-6 opacity-80" src={IconAddUser} alt="User add icon" />
            </button>
          )}
        </div>

        <div className="task-management-header-right-block flex items-center">
          <DropdownOption>
            <Menu.Item onClick={openMoveTaskToParent}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>Di chuyển tới việc cha</div>
              </div>
            </Menu.Item>
            <Menu.Item onClick={openMoveTaskToGroup}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>Di chuyển tới nhóm dữ liệu</div>
              </div>
            </Menu.Item>
            {(taskInfo.draft === 1 && isTempTask) ? (
              <Menu.Item onClick={toggleModalMoveToOfficialTask}>
                <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                    <div className={"flex-1 text-left ml-4"}>Chuyển thành việc chính thức</div>
                </div>
              </Menu.Item>
            ) : ''}
            <Menu.Item onClick={openUpdateMilestone}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>Gán phân loại cột mốc</div>
              </div>
            </Menu.Item>
            {/* IN ẤN */}
            <Menu.Item onClick={() => history.push(`/pcm/detail/${taskInfo._id}/print/1`)}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>In ấn mẫu biên bản họp</div>
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => history.push(`/pcm/detail/${taskInfo._id}/print/2`)}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>In ấn mẫu báo cáo</div>
              </div>
            </Menu.Item>
             <Menu.Item onClick={() => history.push(`/pcm/detail/${taskInfo._id}/print/3`)}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                  <div className={"flex-1 text-left ml-4"}>In ấn mẫu phụ lục ảnh</div>
              </div>
            </Menu.Item>
          </DropdownOption>
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
                  <Link to={`/pcm/project/${taskInfo?.project?._id}/folder/${taskInfo?.group?._id}`}>
                    {getGroupTitle(taskInfo?.group)}
                  </Link>
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
                    {moment(infoTask?.data?.actualFinishTime).format("DD/MM/YYYY")}
                  </span>
                  <span className="ml-2 text-[13px] text-primary-gray">
                    {moment(infoTask?.data?.actualFinishTime).format("HH:mm")}
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
            <div className={cn("pl-5 pr-8", {
              'pt-5': permissions.hasPermissionCreatorAddFile || taskInfo.description
            })}>
              {taskInfo.description && (
                <div className={cn(styles["dont-break-out"])}>
                  <div className={cn(styles["t-task-detail-content"], "text-[13px]")}>
                    {parse(
                      isTruncate
                        ? _truncate(taskInfo.description, { length: 300 })
                        : taskInfo.description
                    )}
                  </div>
                  {taskInfo.description?.length > 300 && (
                    <button onClick={() => setIsTruncate(!isTruncate)}>
                      <p className="text-[13px] text-primary mt-2.5 mb-4">
                        Xem thêm/Thu gọn
                      </p>
                    </button>
                  )}
                </div>
              )}
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
              hasPermission={permissions.hasPermissionCreatorAddFile}
            />
            <div>
              <CheckList
                componentType="CHECKLIST"
                task={taskInfo}
                data={listCheckList}
                totalRecord={totalRecordCheckList}
                onSeeMore={nextPageListCheckList}
                hasPermission={permissions.hasPermissionCreateCheckListAndChildTask}
              />
            </div>
            <div className="mt-5 pr-3">
              <CheckList
                componentType="CHILD_TASK"
                task={taskInfo}
                data={listChildTask}
                totalRecord={totalRecordChildTask}
                onSeeMore={nextPageListChildTask}
                hasPermission={permissions.hasPermissionCreateCheckListAndChildTask}
              />
            </div>
            {/* <div className="px-5 mt-5">
              <PriceApprovalInfo
                timeApproved={taskInfo?.timeApproved}
                valueApproved={taskInfo?.valueApproved}
              />
            </div> */}
						<OwnerUploadedFile
              className="px-5 pt-5 pb-2"
              assigneeAttachs={taskInfo?.assigneeAttachs}
              author={user}
              taskID={taskInfo._id}
              companyID={taskInfo.company?._id}
              projectID={taskInfo.project?._id}
              groupID={taskInfo.group?._id}
              hasPermission={permissions.hasPermissionAssigneeAddFile}
            />
            <div className="px-5 mb-5">
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
            <CommentFull
              userId={user?._id}
              taskInfo={taskInfo}
              comments={listComments}
              amountComment={taskData.amountComment}
              totalRecord={totalRecord}
              limit={limit}
              hasLoadProvider={false}
              hasPermission={permissions.hasPermissionComment}
              onConfirm={(method?: string) => {
                if(method && method === 'INSERT') {
                  setTaskData(previous => ({ ...previous, amountComment: taskData.amountComment + 1 }))
                }
              }}
            />
            {/* <div className="text-x-large py-3 px-6 font-bold">
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
              {permissions.hasPermissionComment && (
                <ReplyCommentField
                  attachFile
                  inputContainerClassName="flex w-full p-2"
									fileContainerClassName="border-t-0.5 border-cbs-border mr-7 divide-y-0.5 divide-cbs-border"
                  projectID={taskInfo?.project?._id}
                  groupID={taskInfo?.group?._id}
                  taskID={id}
                  onConfirm={(method?: string) => {
                    if(method && method === 'INSERT') {
                      setTaskData(previous => ({ ...previous, amountComment: taskData.amountComment + 1 }))
                    }
                  }}
                />
              )}
            </div> */}
          </div>
          {/*
            Modal
            + Add relation user
            + Send mail
            + Move task to parent
            + Move task to group
          */}
          <ModalLarge
            show={isShow}
            toggle={toggleModal}
            className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
          >
            {type === 'relation' &&
              <ModalAddRelationUser
                toggle={toggleModal}
                taskID={id}
                projectID={taskInfo?.project?._id || ''}
                refetch={refetchInfoTask}
                related={taskInfo?.related}
                modalType={'ADD_RELATION_USER'}
              />}

            {type === 'email' &&
              <ModalAddNotificationEmail
                toggle={toggleModal}
                task={taskInfo}
              />}

            {type === 'move-task-to-parent' &&
              <ModalMoveTaskToParent
                taskID={taskInfo._id}
                projectID={taskInfo.project?._id}
                toggle={toggleModal}
              />}

            {type === 'move-task-to-group' &&
              <ModalMoveTaskToGroup
                taskID={taskInfo._id}
                projectID={taskInfo.project?._id}
                toggle={toggleModal}
              />}

            {type === 'update-milestone' &&
              <ModalUpdateMilestone
                taskID={taskInfo._id}
                projectID={taskInfo.project?._id}
                toggle={toggleModal}
              />}
          </ModalLarge>
          {/* Modal update status task */}
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

const PcmDetailTaskPage: FC = () => {
  return (
    <ResponseProvider>
      <CommentProvider>
        <PcmDetailTask />
      </CommentProvider>
    </ResponseProvider>
  )
}

export default PcmDetailTaskPage