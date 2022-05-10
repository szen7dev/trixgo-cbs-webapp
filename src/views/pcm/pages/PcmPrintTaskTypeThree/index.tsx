import { FC, useEffect, useState } from "react";
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

const PcmPrintTaskTypeThree: FC = () => {
  const history = useHistory();
  const { id: taskId } = useParams<{ id: string }>();

  const { user } = useAuth();
  const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

  const [dataListImages, setDataListImages] = useState<any[]>([]);

  const { info: taskInfo, isLoadingInfo } = useTask({
    params: {
      taskID: taskId,
      select: "_id name sign"
    },
    isFetchInfo: true
  })

  const {
    list: listPcmComments,
    isLoading: isLoadingPcmComments,
    fetchNextPage,
    hasNextPage,
    totalRecord
  } = usePcmComment({
    params: {
      taskID: taskId,
      isHaveImage: true,
      limit: 2,
      select: '_id content images',
      populates: JSON.stringify({
        path: 'images',
        select: '_id nameOrg path description author',
        populate: {
          path: 'author',
          select: '_id bizfullname image'
        }
      })
    },
    isFetchList: true
  })

  useEffect(() => {
    if (!isSuccessApp || !taskInfo || !user || isLoadingInfo) return;

    if (isSuccessApp && !hasPermission) {
			toast.error("Bạn không có quyền truy cập tính năng này!");
			return history.push("/");
		};
  }, [taskInfo, isSuccessApp]);

  useEffect(() => {
    if(!listPcmComments || !listPcmComments.length || isLoadingPcmComments) return;

    const listDataImages = listPcmComments
      .map(item => {
        return item.images.map(image => {
          image.content = item.content;
          return image;
        });
      }).flat();

    setDataListImages(listDataImages);
  }, [JSON.stringify(listPcmComments)])

  if(isLoadingInfo) return <Loader className="border-primary" />

  return (
    <div className="bg-cbs-gray h-full overflow-hidden">
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md space-y-5">
          <header className="mt-3">
            <p className="font-bold">PHỤ LỤC ẢNH</p>
            <p>
              <i>(Đính kèm {taskInfo.name}, số hiệu: {taskInfo.sign})</i>
            </p>
          </header>
          <main className="space-y-5">
            <section>
              <table className={styles.imagesAppendix}>
                <thead>
                  <tr>
                    <th>Thứ tự</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                  </tr>
                </thead>
                <tbody>
                  {(dataListImages && dataListImages.length) ? dataListImages.map((image, index) => (
                    <tr key={image._id}>
                      <td>{index + 1}</td>
                      <td>{image.description || image.content}</td>
                      <td>
                        <img
                          src={generateIamgePath(image.path)}
                          alt={image.nameOrg}
                          className="cursor-pointer"
                          onClick={() => {
                            zoomview({
                              createAt: moment(image.createAt).format('DD/MM/YYYY'),
                              index: 0,
                              mediaID: image._id || '',
                              images: [image],
                            });
                          }}
                        />
                      </td>
                    </tr>
                  )) : <></>}
                  {/* <tr>
                    <td>1</td>
                    <td>Thi công khu vực bể bơi tầng hầm 3, nhà tiểu học</td>
                    <td>
                      <img
                        src={generateIamgePath(
                          "/root/storage/5df4ce16506d9b3c587948ca/5e60dffb2c43a444c5f8e227/Surface Pro 8 - 1.png___48576ba2-e73f-47de-a7c8-cf8908993506___MEDIA.png"
                        )}
                        alt="pic"
                        className="cursor-pointer"
                        onClick={() => {
                          zoomview({
                            createAt: "20/12/12",
                            index: 0,
                            mediaID: "62272bd0c4f42f474131f358",
                            images: [
                              {
                                _id: "62272bd0c4f42f474131f358",
                                type: "123",
                                name: "Surface Pro 8 - 1.png___48576ba2-e73f-47de-a7c8-cf8908993506___MEDIA.png",
                                nameOrg: "Surface Pro 8 - 1.png",
                                path: "/root/storage/5df4ce16506d9b3c587948ca/5e60dffb2c43a444c5f8e227/Surface Pro 8 - 1.png___48576ba2-e73f-47de-a7c8-cf8908993506___MEDIA.png",
                                size: 85006,
                                mimeType: "image/png",
                              },
                            ],
                          });
                        }}
                      />
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </section>

            {hasNextPage && (
              <div className="w-full flex justify-center my-5">
                  <button onClick={fetchNextPage}>
                      <span className="text-primary">
                        Xem thêm
                          {/* {`Xem thêm (${totalRecord - listPcmComments.length})`} */}
                      </span>
                  </button>
              </div>
            )}
          </main>
          <footer>
            <p>
              <i>
                In từ nền tảng{" "}
                <Link className="text-cbs-primary" to="/">
                  https://app.trixgo.com: {moment().format('DD/MM/YYYY HH:mm')}
                </Link>
              </i>
            </p>
          </footer>
        </div>
      </div>
      <ZoomViewV2 />
    </div>
  );
};

export default PcmPrintTaskTypeThree