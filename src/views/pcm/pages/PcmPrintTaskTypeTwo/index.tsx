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
import { useTask } from "services/hooks/useTask";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import usePrintComponent from "services/hooks/ppt/usePrintComponent";

const PcmPrintTaskTypeTwo: FC = () => {
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

  const assigneeAndRelated = [taskInfo.assignee, ...taskInfo.related];

  return (
    <div className="bg-cbs-gray overflow-auto" style={{ height: '100vh' }}>
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md">
          <table
            ref={componentRef}
            className="print_area space-y-5 border-separate"
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
                  <header>
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
                        <p className="text-large text-cbs-primary font-bold">{taskInfo.name}</p>
                        <p className="mt-2">SỐ HIỆU: {taskInfo.sign}</p>
                        <p className="mt-1.5">
                          Thời gian: Từ ngày {moment(taskInfo.actualStartTime).format(DATE_FORMAT)}{" "}
                          - ngày {moment(taskInfo.actualFinishTime).format(DATE_FORMAT)}
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
                      <div>Địa điểm xây dựng:</div>
                      <div>{taskInfo.project?.address}</div>
                      <div>Gói thầu/Hợp đồng:</div>
                      <div>{taskInfo.contract?.name}</div>
                      <div>Người lập:</div>
                      <div>
                        <span className={styles.imageContainer}>
                          <img
                            src={`${process.env.REACT_APP_URL_S3_USER}/${taskInfo.author?.image}`}
                            className="h-full w-full"
                            alt={taskInfo.author?.bizfullname}
                          />
                        </span>
                        <span className="ml-2">{taskInfo.author.bizfullname}</span>
                      </div>
                      <div>Liên quan:</div>
                      <div className="space-x-1">
                        {assigneeAndRelated?.map((item) => (
                          <span key={item._id} className={styles.imageContainer}>
                            <img
                              src={`${process.env.REACT_APP_URL_S3_USER}/${item.image}`}
                              className="h-full w-full"
                              alt={item?.bizfullname}
                            />
                          </span>
                        ))}
                        {/* <span className={styles.imageContainer}>
                  <img src="" className="h-full w-full" alt="" />
                </span>
                <span className={styles.imageContainer}>
                  <img src="" className="h-full w-full" alt="" />
                </span> */}
                      </div>
                    </div>
                  </header>
                </td>
              </tr>
              <tr>
                <td>
                  <main className="space-y-5">
                    {/* Nội dung */}
                    <section>
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
                    {/* Ký */}
                    <section className="font-bold flex justify-end text-center">
                      <div className="px-14">
                        <p>ĐƠN VỊ LẬP BÁO CÁO</p>
                        <p className="mt-14">...............</p>
                      </div>
                    </section>
                  </main>
                </td>
              </tr>
            </tbody>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default PcmPrintTaskTypeTwo;
