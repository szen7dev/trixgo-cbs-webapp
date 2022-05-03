import classNames from "classnames";
import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "../../styles/pcm_print.module.css";
import ZoomViewV2, { zoomview } from "shareComponents/common/ZoomView/ZoomViewV2";
import { generateIamgePath } from "utils";

type Props = {
  //
};

const PcmPrintTaskTypeThree: FC<Props> = (props) => {
  const { id } = useParams<{ id: string }>();
  // const {
  //   data: { data: taskInfo } = {},
  //   refetch: refetchInfoTask,
  //   isLoading,
  //   isSuccess,
  // } = useQuery(`task_info.${id}`, () => TaskRepository.taskInfo(id), {
  //   refetchOnWindowFocus: false,
  // });

  return (
    <div className="bg-cbs-gray h-full overflow-hidden">
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md space-y-5">
          <header className="mt-3">
            <p className="font-bold">PHỤ LỤC ẢNH</p>
            <p>
              <i>(Đính kèm Đóng góp về hệ thống TRIXGO-PCM, số hiệu: )</i>
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
                  <tr>
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
                  </tr>
                </tbody>
              </table>
            </section>
            <div className="text-center">
              <button className="text-small text-cbs-primary">Xem thêm 134</button>
            </div>
          </main>
          <footer>
            <p>
              <i>
                In từ nền tảng{" "}
                <Link className="text-cbs-primary" to="/">
                  https://app.trixgo.com: 21/04/2022 06:49
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