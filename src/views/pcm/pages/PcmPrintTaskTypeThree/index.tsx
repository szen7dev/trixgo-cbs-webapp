import { FC, useEffect, useMemo, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Components, Assets
 */
import styles from "../../styles/pcm_print.module.css";
import ZoomViewV2, { zoomview } from "shareComponents/common/ZoomView/ZoomViewV2";
import { Loader } from "shareComponents/common";

/**
 * Utils
 */
import { generateIamgePath } from "utils";
import { APP_ID } from "apis/localdb";

/**
 * Hooks, Types
 */
import { useAuth } from "services/hooks/auth/useAuth";
import { useTask } from "services/hooks/useTask";
import { usePcmComment } from "services/hooks/pcm/usePcm";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import moment from "moment";
import usePrintComponent from "services/hooks/ppt/usePrintComponent";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const PcmPrintTaskTypeThree: FC = () => {
  const history = useHistory();
  const { id: taskId } = useParams<{ id: string }>();

  const { user } = useAuth();
  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const { info: taskInfo, isLoadingInfo } = useTask({
    params: {
      taskID: taskId,
      select: "_id name sign",
    },
    isFetchInfo: true,
  });

  const {
    list: listPcmComments,
    isLoading: isLoadingPcmComments,
    fetchNextPage,
    hasNextPage,
  } = usePcmComment({
    params: {
      taskID: taskId,
      isHaveImage: true,
      limit: 2,
      select: "_id content images",
      populates: JSON.stringify({
        path: "images",
        select: "_id nameOrg path description author",
        populate: {
          path: "author",
          select: "_id bizfullname image",
        },
      }),
    },
    isFetchList: true,
  });

  useEffect(() => {
    if (!isSuccessApp || !taskInfo || !user || isLoadingInfo) return;

    if (isSuccessApp && !hasPermission) {
      toast.error("Bạn không có quyền truy cập tính năng này!");
      return history.push("/");
    }

    document.title = `${taskInfo.name}`;
  }, [taskInfo, isSuccessApp, isLoadingInfo, hasPermission]);

  const listImagesComment = useMemo(() => {
    const listDataImages = listPcmComments
      .filter(Boolean)
      .map((item) => item.images)
      .flat();

    return listDataImages;
  }, [listPcmComments])

  const componentRef = useRef(null);
  usePrintComponent({ ref: componentRef });

  if (isLoadingInfo || isLoadingPcmComments) return <Loader className="border-primary" />;

  return (
    <div className="bg-cbs-gray overflow-auto" style={{ height: '100vh' }}>
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md">
          <table ref={componentRef} className="print_area w-full">
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
                    <h2 className="font-bold">PHỤ LỤC ẢNH</h2>
                    <p>
                      <i>
                        (Đính kèm {taskInfo.name}, số hiệu: {taskInfo.sign})
                      </i>
                    </p>
                  </header>
                </td>
              </tr>
              <tr>
                <td className="pt-5">
                  <main className="space-y-5">
                    <section>
                      <table className={styles.imagesAppendix}>
                        <thead>
                          <tr>
                            <th className="w-1">Thứ tự</th>
                            <th>Mô tả</th>
                            <th>Hình ảnh</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listImagesComment && listImagesComment.length ? (
                            listImagesComment.map((image, index) => (
                              <tr key={image._id}>
                                <td>{index + 1}</td>
                                <td>{image.description}</td>
                                <td align="center">
                                  <img
                                    src={generateIamgePath(image.path)}
                                    alt={image.nameOrg}
                                    className="cursor-pointer inline-block"
                                    onClick={() => {
                                      zoomview({
                                        createAt: moment(image.createAt).format("DD/MM/YYYY"),
                                        index: 0,
                                        mediaID: image._id || "",
                                        images: [image],
                                      });
                                    }}
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                    </section>

                    {hasNextPage && (
                      <div className="w-full flex justify-center my-5" style={{ marginBottom: '20px' }}>
                        <button onClick={fetchNextPage}>
                          <span className="text-primary">
                            Xem thêm
                            {/* {`Xem thêm (${totalRecord - listPcmComments.length})`} */}
                          </span>
                        </button>
                      </div>
                    )}
                  </main>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <footer id="pageFooter" style={{ marginTop: '15px' }}>
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
      <ZoomViewV2 />
    </div>
  );
};

export default PcmPrintTaskTypeThree;