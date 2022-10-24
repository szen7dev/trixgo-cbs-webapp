import { FC, useEffect, useRef, useState } from "react";
import { useParams, useHistory, Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
// import ReactDatePicker from "react-datepicker";

/**
 * Components, Utils
 */
// import IconPlus from "assets/images/icons8-plus-math-100.png";
import styles from "../../styles/pcm_print.module.css";
import { PcmPrintTaskChild, PcmPrintTaskCommentContainer } from "views/pcm/shareComponents/common";
import { PCM_PROPOSAL_TASK, PCM_STATUS_TASK, APP_ID } from "apis/localdb";

/**
 * Hooks, Typings
 */
import { useAuth } from "services/hooks/auth/useAuth";
import { useTask } from "services/hooks/useTask";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

/**
 * Repositories
 */
import { DropdownSearchableV2, Loader } from "shareComponents/common";
import moment from "moment";
import usePrintComponent from "services/hooks/ppt/usePrintComponent";
import timeTableIcon from "assets/images/icons8-timetable-48.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";

const PcmPrintTaskTypeFour: FC = () => {
  const { id: taskId } = useParams<{ id: string }>();
  const history = useHistory();
  const [isExpired, setIsExpired] = useState<any>(0);
  const [status, setStatus] = useState<string[]>([]);

  const { user } = useAuth();
  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const {
    listTasks: listSubTasks,
    nextPageListTask,
    hasNextPage,
    isLoadingListTask,
  } = useTask({
    params: {
      parentID: taskId,
      isSortChildTask: '1',
    },
    isFetch: !!taskId,
  });

  const {
    info: taskInfo,
    isLoadingInfo,
  } = useTask({
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
    isFetchInfo: !!taskId,
  });

  useEffect(() => {
    if (!isSuccessApp || !taskInfo || !user || isLoadingInfo) return;

    if (isSuccessApp && !hasPermission) {
      toast.error("Bạn không có quyền truy cập tính năng này!");
      return history.push("/");
    }

    document.title = `Trixgo-${taskInfo.name}`;
  }, [taskInfo, isSuccessApp]);

  const componentRef = useRef(null);
  usePrintComponent({ ref: componentRef });

  if (isLoadingInfo) return <Loader className="border-primary" />;

  if(!taskInfo) {
    return <Redirect to="/pcm/home" />;
  }

  if(isLoadingListTask) return <Loader className="border-primary" />;

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
                        {assigneeAndRelated.slice(0, 3).map((item) => (
                            <div key={item._id} className={styles.headerImageContainer}>
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
                          {assigneeAndRelated.map((item) => (
                              <span
                                  key={item._id}
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
                                className=""
                                dangerouslySetInnerHTML={{
                                  __html: taskInfo?.description?.replace(/\n/g, '<br />')
                                }}
                            />
                          </div>
                        </section>
                    )}
                    {/* Việc xử lý */}
                    <section className="mt-2">
                      <div className="flex items-center">
                        <span className={"font-bold"}>VIỆC XỬ LÝ</span>
                        <div className={"flex-1 flex items-center justify-end"}>
                          <DropdownSearchableV2
                              selectOneByOne={true}
                              disableSearch={true}
                              className={"mr-2 border border-primary-border rounded-lg mb-2"}
                              placeholder={"Quá hạn"}
                              prefixIcon={
                                <img className={"mr-2"} src={timeTableIcon} alt={"icon"} />
                              }
                              onchangeValue={(val) => {
                                setIsExpired(val.id);
                              }}
                              data={[
                                {
                                  id: 0,
                                  text: "Tất cả",
                                },
                                {
                                  id: 1,
                                  text: "Đã quá hạn",
                                },
                                {
                                  id: 2,
                                  text: "Chưa quá hạn",
                                },
                              ]}
                          />
                          <DropdownSearchableV2
                              selectOneByOne={true}
                              className={"mr-2 border border-primary-border rounded-lg mb-2"}
                              placeholder={"Trạng thái"}
                              prefixIcon={
                                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
                              }
                              isMultiple={true}
                              disableSearch={true}
                              onchangeValue={(value) => {
                                if (!status.includes?.(value.id as string)) {
                                  const newData: any = [...status, value.id];
                                  setStatus(newData);
                                }
                              }}
                              onMultipleRemoveValue={(id: any) => {
                                const newList = status.filter((item) => item !== id);
                                setStatus(newList);
                              }}
                              onClearData={() => setStatus([])}
                              data={[
                                {
                                  id: 1,
                                  text: "Khởi tạo, sắp triển khai",
                                },
                                {
                                  id: 2,
                                  text: "Đang triển khai",
                                },
                                {
                                  id: 3,
                                  text: "Hoàn thành",
                                },
                                {
                                  id: 4,
                                  text: "Treo lại",
                                },
                                {
                                  id: 5,
                                  text: "Chờ người khác giải quyết",
                                },
                                {
                                  id: 6,
                                  text: "Tiếp tục theo dõi",
                                },
                                {
                                  id: 7,
                                  text: "Khóa đóng",
                                },
                              ]}
                          />
                        </div>
                      </div>
                      <table className="table-fixed w-full mt-2.5">
                        <tbody>
                          {!!listSubTasks?.length && listSubTasks?.map?.((task: any, index: number) => {
                            return (
                              <>
                                <tr key={task._id}>
                                  <td className={"border-0.5 border-primary-border w-[40px] p-2 text-center"}>
                                    {index + 1}
                                  </td>
                                  <td className={"border-0.5 border-primary-border p-2"}>
                                    {task.name}
                                  </td>
                                  <td className={"border-0.5 border-primary-border p-2"}>
                                    <div className={"flex items-center justify-end"}>
                                      <div className={"p-2 rounded-md bg-cbs-form-input-bg"}>
                                        <span className={"text-primary-gray"}>
                                          {moment(task.actualFinishTime).format('DD/MM/YYYY')}
                                        </span>
                                        <span className={`${PCM_STATUS_TASK[task.status - 1]?.class} rounded px-2 ml-4 py-1 text-white`}>
                                          {PCM_STATUS_TASK[task.status - 1]?.text}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={"border-0.5 border-primary-border w-[40px] p-2 text-center"}></td>
                                  <td className={"border-0.5 border-primary-border p-2"}>
                                    <PcmPrintTaskChild task={task} />
                                  </td>
                                  <td className={"border-0.5 border-primary-border p-2"}>
                                    <PcmPrintTaskCommentContainer task={task} />
                                  </td>
                                </tr>
                              </>
                            )
                          })}
                          {/* <tr>
                            <td className={"border-0.5 border-primary-border w-[40px] p-2 text-center"}>
                              2
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                              Cán bộ thanh toán kiểm tra hồ sơ thanh toán đợt 9 (Tư vấn B.I.M đợt 4)
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                              <div className={"flex items-center justify-end"}>
                                <div className={"p-2 rounded-md bg-cbs-form-input-bg"}>
                                  <span className={"text-primary-gray"}>22/8/2022</span>
                                  <span className={"bg-cbs-inline-badge-blue rounded px-2 ml-4 text-white"}>Đang triển khai</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className={"border-0.5 border-primary-border w-[40px] p-2 text-center"}>
                            3
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                              Cán bộ thanh toán kiểm tra hồ sơ thanh toán đợt 9 (Tư vấn B.I.M đợt 4)
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                              <div className={"flex items-center justify-end"}>
                                <div className={"p-2 rounded-md bg-cbs-form-input-bg"}>
                                  <span className={"text-primary-gray"}>22/8/2022</span>
                                  <span className={"bg-cbs-completed rounded px-2 ml-4 text-white"}>Hoàn thành</span>
                                </div>
                              </div>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
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
                    {/* <section>
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
                      </div>
                    </section> */}
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

export default PcmPrintTaskTypeFour;
