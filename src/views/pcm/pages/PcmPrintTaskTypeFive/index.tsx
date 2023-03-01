import { FC, useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import { toast } from "react-toastify";

/**
 * Assets, Components
 */
import styles from "../../styles/pcm_print.module.css";
import { Loader } from "shareComponents/common";

/**
 * Utils
 */
import { APP_ID, DATE_FORMAT } from "apis/localdb";

/**
 * Hooks, Types
 */
import { useAuth } from "services/hooks/auth/useAuth";
import { useCommentPcm, useTask } from "services/hooks/useTask";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import usePrintComponent from "services/hooks/ppt/usePrintComponent";
import { nl2p } from "utils";

const PcmPrintTaskTypeFive: FC = () => {
  const history = useHistory();
  const { id: taskId } = useParams<{ id: string }>();

  const { user } = useAuth();

  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const { info: taskInfo, isLoadingInfo } = useTask({
    params: {
      taskID: taskId,
      populates: JSON.stringify({
        path: "project contract author assignee related",
        select: "_id name sign company address bizfullname image",
        populate: {
          path: "company",
          select: "_id name image",
        },
      }),
    },
    isFetchInfo: true,
  });

  const { listComments, totalRecord, limit } = useCommentPcm({
    key: `list_comments.${taskId}`,
    params: { taskID: taskId, type: 1 },
    isFetchComment: true,
  });

  const htmlStripper = (htmlString: string) => {
    return htmlString?.replace(/<[^>]+>/g, '');
  }

  useEffect(() => {
    if (!isSuccessApp || !taskInfo || !user || isLoadingInfo) return;

    if (isSuccessApp && !hasPermission) {
      toast.error("Bạn không có quyền truy cập tính năng này!");
      return history.push("/");
    }

    document.title = `${taskInfo.name}`;

  }, [taskInfo, isSuccessApp]);
  const componentRef = useRef(null);
  usePrintComponent({ ref: componentRef });

  if (isLoadingInfo) return <Loader className="border-primary" />;

  const assigneeAndRelated = [taskInfo.assignee, ...taskInfo.related];

  return (
    <div className="bg-cbs-gray overflow-auto" style={{ height: '100vh' }}>
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md">
          {listComments?.map((comment, index) => {
            return (htmlStripper(comment?.content) ?
              <div key={index}>
                <table
                  ref={componentRef}
                  className="print_area space-y-5 border-separate w-full"
                  style={{ borderSpacing: "0 1.25rem" }}
                >
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
                        <header className="w-full">
                          <div className={styles.reportTitle}>
                            <div className="p-3 h-[100px] w-[100px]">
                              {typeof taskInfo.project?.company === "object" ? (
                                <img
                                  src={`${process.env.REACT_APP_URL_S3_COMPANY}/${taskInfo.project?.company?.image}`}
                                  alt={taskInfo.project?.company?.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="text-smalll text-center font-normal">
                              <p className="text-large text-cbs-primary font-bold">NHẬT KÝ THI CÔNG</p>
                              <p className="mt-1.5 text-right">
                                <i>...., Ngày {moment(comment.createAt).format("DD")} tháng {moment(comment.createAt).format("MM")} năm {moment(comment.createAt).format("YYYY")}</i>
                              </p>
                            </div>
                          </div>
                          <div className={classNames(styles.reportInfo, "mt-2")}>
                            <div>Dự án:</div>
                            <div> {taskInfo.project?.sign}.{taskInfo.project?.name} </div>
                            <div>Chủ đầu tư:</div>
                            <div>
                              {typeof taskInfo.project?.company === "object" &&
                                taskInfo.project?.company?.name}
                            </div>
                            {/* <div>Địa điểm xây dựng:</div>
                            <div>{taskInfo.project?.address}</div> */}
                            <div>Gói thầu:</div>
                            <div>{taskInfo.contract?.name}</div>
                          </div>
                        </header>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <main className="space-y-5">
                          {/* Nội dung */}
                          <section>
                            <div className="mt-2.5 mb-5">
                              <div
                                className=""
                                dangerouslySetInnerHTML={{
                                  __html: nl2p(comment?.content)
                                }}
                              />
                            </div>
                          </section>
                        </main>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      {/* <td className="w-6/12">CÁN BỘ GIÁM SÁT CỦA CHỦ ĐẦU TƯ</td>
                <td className="w-6/12">CÁN BỘ PHỤ TRÁCH THI CÔNG</td> */}
                      <div className="w-full h-28">
                        <div className="w-6/12 inline-block text-center font-bold">CÁN BỘ GIÁM SÁT CỦA CHỦ ĐẦU TƯ</div>
                        <div className="w-6/12 inline-block text-center font-bold">CÁN BỘ PHỤ TRÁCH THI CÔNG</div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div> : <div />
            )
          })}
          <tfoot>
            <tr>
              <td>
                <footer id="pageFooter">
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
        </div>
      </div>
    </div>
  );
};

export default PcmPrintTaskTypeFive;