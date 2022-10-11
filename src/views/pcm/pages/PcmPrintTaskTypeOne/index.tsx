import { FC, useEffect, useRef, useState } from "react";
import { useParams, useHistory, Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
// import ReactDatePicker from "react-datepicker";

/**
 * Components, Utils
 */
// import IconPlus from "assets/images/icons8-plus-math-100.png";
import styles from "../../styles/pcm_print.module.css";
import { CommentFull } from "views/pcm/shareComponents/common";
import { CheckList } from "views/pcm/pages/PcmDetailTask/components";
import { PCM_PROPOSAL_TASK, APP_ID } from "apis/localdb";

/**
 * Hooks, Typings
 */
import { useAuth } from "services/hooks/auth/useAuth";
import { useTask, useCommentPcm, useCheckList } from "services/hooks/useTask";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

/**
 * Repositories
 */
import { Loader } from "shareComponents/common";
import moment from "moment";
import usePrintComponent from "services/hooks/ppt/usePrintComponent";

const PcmPrintTaskTypeOne: FC = () => {
  const { id: taskId } = useParams<{ id: string }>();
  const history = useHistory();

  // const [visibleForm, setVisibleForm] = useState(false);
  // const [date, setDate] = useState<Date | null>(null);
  const [taskData, setTaskData] = useState({ amountComment: 0 });

  const [permissions, setPermissions] = useState({
    hasPermissionCreateCheckList: false,
    hasPermissionComment: false,
  });

  const { user } = useAuth();

  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const { listComments, totalRecord, limit } = useCommentPcm({
    key: `list_comments.${taskId}`,
    params: { taskID: taskId, type: 1 },
    isFetchComment: true,
  });

  const {
    listCheckList,
    totalRecord: totalRecordCheckList,
    nextPageListCheckList,
  } = useCheckList({
    parentID: taskId,
    isFetchChecklist: true,
  });

  const { info: taskInfo, isLoadingInfo } = useTask({
    params: {
      taskID: taskId,
      populates: JSON.stringify({
        path: "author assignee related project group signatures",
        select: "_id name sign company image bizfullname members author image createAt",
        populate: {
          path: "company author members",
          select: "_id image bizfullname signature",
        },
      }),
    },
    isFetchInfo: true,
  });

  useEffect(() => {
    if (!isSuccessApp || !taskInfo || !user || isLoadingInfo) return;

    if (isSuccessApp && !hasPermission) {
      toast.error("Bạn không có quyền truy cập tính năng này!");
      return history.push("/");
    }

    document.title = `Trixgo-${taskInfo.name}`;

    const relatedsID = taskInfo.related?.map((user: any) => user._id) ?? [];
    const groupMembersID = taskInfo.group?.members?.map((user: any) => user._id) ?? [];
    const authorAndAssigneeID = [taskInfo.author?._id, taskInfo.assignee?._id].filter(Boolean);
    const authorAndAssigneeAndRelatedID = [...authorAndAssigneeID, ...relatedsID].filter(Boolean);
    const hasPermissionCreateCheckList = authorAndAssigneeID.includes(user._id);
    const hasPermissionComment = [...authorAndAssigneeAndRelatedID, ...groupMembersID].includes(
      user?._id
    );

    setPermissions({
      hasPermissionComment,
      hasPermissionCreateCheckList,
    });
  }, [taskInfo, isSuccessApp]);

  const componentRef = useRef(null);
  usePrintComponent({ ref: componentRef });

  if (isLoadingInfo) return <Loader className="border-primary" />;

  if(!taskInfo) return <Redirect to="/pcm/home" />;

  const assigneeAndRelated = [taskInfo?.assignee, ...taskInfo?.related];

  return (
    <div className="bg-cbs-gray overflow-auto" style={{ height: '100vh' }}>
      <div className="overflow-auto h-auto py-6">
        <div className="max-w-[791px] h-auto bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md">
          <table ref={componentRef} className="space-y-5 table-fixed w-full">
            <style type="text/css" media="print">
              {`
								@media print { 
									table { page-break-inside:auto }
									thead { display:table-header-group; }
									tfoot { display:table-footer-group; }

									.print_area{
										page-break-after:always;
									}
									.print_area > tfoot {
										display: table-footer-group
									}
								}
							`}
            </style>
            <tbody>
              <tr>
                <td>
                  <header>
                    <div className={styles.headerTitle}>
                      <div className="row-span-2 flex space-x-2.5">
                        {assigneeAndRelated.slice(0, 3).map((item, index) => (
                          <div key={`${index}-${item._id}-${Math.random()}`} className={styles.headerImageContainer}>
                            <img
                              src={`${process.env.REACT_APP_URL_S3_COMPANY}/${item.company?.image}`}
                              alt={item.company?.name}
                              className="border-cbs-border border-0.5"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="text-x-small uppercase">{taskInfo.project?.sign}.{taskInfo.project?.name}</div>
                      <div className="row-span-2">
                        <div className={styles.headerImageContainer}>
                          <img
                            src={`${process.env.REACT_APP_URL_S3_COMPANY}/${taskInfo.author?.company?.image}`}
                            alt={`${taskInfo.author?.company?.name}`}
                            className="border-cbs-border border-0.5"
                          />
                        </div>
                      </div>
                      <div className="text-large align-middle text-cbs-secondary uppercase font-bold">
                        {PCM_PROPOSAL_TASK[taskInfo.subtype].text}
                      </div>
                    </div>
                    <div className={styles.headerInfo}>
                      <div className="col-span-2 flex">
                        <div className="whitespace-nowrap mr-2.5">Tiêu đề:</div>
                        <div className="text-cbs-highlight-color">{taskInfo.name}</div>
                      </div>
                      <div>
                        <p>Số hiệu:</p>
                        <p className="font-normal">{taskInfo.sign}</p>
                      </div>
                      <div>
                        <p>
                          <span>Khởi tạo: </span>
                          <span className="font-normal">
                            <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle mr-2">
                              <img
                                src={`${process.env.REACT_APP_URL_S3_USER}/${taskInfo.author?.image}`}
                                alt={taskInfo.author?.bizfullname}
                                className="h-full w-full"
                              />
                            </span>
                            {taskInfo.author?.bizfullname}
                          </span>
                        </p>
                        <p>Thời gian: {moment(taskInfo.createAt).format("DD/MM/YYYY HH:mm")}</p>
                      </div>
                      <div>
                        <p>Bắt đầu: </p>
                        <p className="mt-2.5 font-normal">
                          {moment(taskInfo.actualStartTime).format("DD/MM/YYYY HH:mm")}
                        </p>
                      </div>
                      <div>
                        <p>Kết thúc:</p>
                        <p className="mt-2.5 font-normal">
                          {moment(taskInfo.actualFinishTime).format("DD/MM/YYYY HH:mm")}
                        </p>
                      </div>
                      <div className="col-span-3 py-2">
                        <p className="space-x-1">
                          Liên quan:
                          {assigneeAndRelated.map((item, index) => (
                            <span
                              key={`${index}-${item._id}`}
                              className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle border-cbs-border border-0.5"
                            >
                              <img
                                src={`${process.env.REACT_APP_URL_S3_USER}/${item?.image}`}
                                alt={item.bizfullname}
                                className="h-full w-full"
                              />
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </header>
                </td>
              </tr>
              <tr>
                <td>
                  <main className="space-y-5">
                    {/* Nội dung */}
                    {taskInfo?.description && (
                      <section className="mt-2">
                        <div className="font-bold">
                          <span>NỘI DUNG</span>
                        </div>
                        <div className="mt-2.5">
                          <div
                            className="min-h-[300px]"
                            dangerouslySetInnerHTML={{
                              __html: taskInfo?.description?.replace(/\n/g, '<br />')
                            }}
                          />
                        </div>
                      </section>
                    )}
                    {/* Việc xử lý */}
                    <section className="mt-2">
                      <div className="font-bold">
                        <span>VIỆC XỬ LÝ</span>
                      </div>
                      <div className="border-cbs-border border-0.5 mt-2.5">
                        <div className="divide-y divide-cbs-border">
                          <CheckList
                            componentType="CHECKLIST_PRINT"
                            task={taskInfo}
                            data={listCheckList}
                            totalRecord={totalRecordCheckList}
                            onSeeMore={nextPageListCheckList}
                            hasPermission={true}
                          />
                        </div>
                        {/* {visibleForm && (
                  <div className="shadow-cbs-md rounded-cbs-sm pl-5 pb-5">
                    <div className="flex w-full border-t-0.5 border-cbs-border pt-5 pr-5">
                      <div className="w-3/6 border-b">
                        <input
                          name="name"
                          className="w-full h-8 placeholder-gray-300 focus:outline-none"
                          placeholder="Nội dung công việc"
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                        />
                      </div>
                      <div className="w-2/6 mx-3 border-b">
                        <input
                          name="user"
                          className="w-full h-8 placeholder-gray-300 focus:outline-none"
                          placeholder="Người thực hiện"
                        />
                      </div>
                      <div className="w-1/6 border-b">
                        <ReactDatePicker
                          wrapperClassName="w-auto h-full"
                          selected={date}
                          placeholderText="Thời hạn"
                          className="h-8 w-full focus:outline-none"
                          onChange={(date: Date | null) => setDate(date)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <button
                        className="px-3 py-2 rounded bg-gray-300 text-primary-gray"
                        onClick={() => setVisibleForm(false)}
                      >
                        Bỏ qua
                      </button>
                      <button
                        type="submit"
                        className="mx-3 px-3 py-2 rounded bg-primary text-white"
                        // onClick={() => handleSubmit()}
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                )} */}

                        {/* <div className="shadow-lg mt-5 pb-5 px-5">
                  <button onClick={() => setVisibleForm(true)}>
                    <div className="flex items-center text-green-success font-bold">
                      <img src={IconPlus} alt="icon" className="w-4 h-4" />
                      <span className="ml-1">Tạo mới</span>
                    </div>
                  </button>
                </div> */}
                      </div>
                    </section>
                    {/* Xác nhận */}
                    <section>
                      <div className="flex justify-between">
                        <span className="font-bold">XÁC NHẬN</span>
                        {/* <button className="px-4 py-2 rounded-cbs-sm bg-cbs-completed text-white">
                          Đồng ý
                        </button> */}
                      </div>
                      <div className="mt-2.5">
                        <table className="border-collapse border-cbs-border border-0.5 w-full">
                          <tbody>
                            {taskInfo.signatures && taskInfo.signatures.length ? (
                              taskInfo.signatures.map((item) => (
                                <tr
                                  key={item._id}
                                  className="border-b-0.5 border-cbs-border align-top"
                                >
                                  <td className="pl-5 pb-3 pt-2.5">
                                    <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle">
                                      <img
                                        src={`${process.env.REACT_APP_URL_S3_USER}/${item.author?.image}`}
                                        className="h-full w-full"
                                        alt={item.author?.bizfullname}
                                      />
                                    </span>
                                  </td>
                                  <td className="pl-5 pb-3 pt-4 text-cbs-highlight-color">
                                    {item.author?.bizfullname}
                                  </td>
                                  <td className="pl-5 pb-3 pt-4 text-cbs-primary">
                                    {moment(item.createAt).format("DD/MM/YYYY HH:mm")}
                                  </td>
                                  <td className="pl-5 pb-3 pt-4">
                                    <div className="w-28 h-11">
                                      {item.author?.signature && (
                                        <img
                                          className="h-full w-full object-cover"
                                          src={`${process.env.REACT_APP_URL_S3_USER}/${item.author?.signature}`}
                                          alt={item.author?.bizfullname}
                                        />
                                      )}
                                    </div>
                                  </td>
                                  {/* <td className="pl-5 pb-3 pt-4">
                                    <button className="px-2.5 py-1.5 bg-cbs-gray">Khoá</button>
                                  </td> */}
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* Thảo luận */}
                    <section>
                      <div className="font-bold">
                        <span>THẢO LUẬN</span>
                      </div>
                      <div className="mt-2.5 border-cbs-border border-0.5">
                        <CommentFull
                          userId={user?._id}
                          taskInfo={taskInfo}
                          comments={listComments}
                          amountComment={taskInfo.amountComment}
                          totalRecord={totalRecord}
                          limit={limit}
                          hasPermission={permissions.hasPermissionComment}
                          onConfirm={(method?: string) => {
                            if (method && method === "INSERT") {
                              setTaskData((previous) => ({
                                ...previous,
                                amountComment: taskData.amountComment + 1,
                              }));
                            }
                          }}
                        />
                        {/* <div className="text-x-large py-3 px-6 font-bold">
                  Bình luận {taskInfo.amountComment > 0 ? `(${taskInfo.amountComment})` : ''}
                </div>
                <RootCommentsList
                  className="px-5"
                  userID={user?._id}
                  comments={listComments}
                  totalRecord={totalRecord}
                  limit={limit}
                  taskID={taskId}
                />
                <div className="flex flex-col w-full max-h-full overflow-y-auto">
                  <ReplyCommentField
                    attachFile
                    inputContainerClassName="flex w-full p-2"
                    fileContainerClassName="border-0.5 border-l-0 border-cbs-border mr-7 divide-y-0.5 divide-cbs-border"
                    projectID={taskInfo?.project?._id}
                    groupID={taskInfo?.group?._id}
                    taskID={taskId}
                    onConfirm={(method?: string) => {
                      if (method && method === "INSERT") {
                        setTaskData((previous) => ({
                          ...previous,
                          amountComment: taskData.amountComment + 1,
                        }));
                      }
                    }}
                  />
                </div> */}
                      </div>
                    </section>
                  </main>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <footer>
                    <p>
                      <i>
                        In từ nền tảng{" "}
                        <Link className="text-cbs-primary" to="/">
                          https://app.trixgo.com: {moment().format("DD/MM/YYYY HH:mm")}
                        </Link>
                      </i>
                    </p>
                  </footer>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PcmPrintTaskTypeOne;
