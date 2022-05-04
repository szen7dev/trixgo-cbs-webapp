import React, { FC, useState } from "react";
import { CheckListItem } from "views/pcm/pages/PcmDetailTask/components";

import styles from "../styles/style.module.css";
import IconPlus from "assets/images/icons8-plus-math-100.png";
import ReactDatePicker from "react-datepicker";
import { ReplyCommentField, RootCommentsList } from "views/pcm/shareComponents/common";

// Services
import { useAuth } from "services/hooks/auth/useAuth";
import { useCommentPcm } from "services/hooks/useTask";
import { useParams } from "react-router-dom";

// Repositories
import TaskRepository from "apis/task";
import { useQuery } from "react-query";

type Props = {
  //
};

const PCMPrintTask: FC<Props> = (props) => {
  const { id } = useParams<{ id: string }>();

  const [visibleForm, setVisibleForm] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [taskData, setTaskData] = useState({
    percentComplete: "0%",
    amountComment: 0,
    status: 1,
    priority: 1,
  });

  const { user } = useAuth();
  const { listComments, totalRecord, limit } = useCommentPcm({
    key: `list_comments.${id}`,
    params: { taskID: id, type: 1 },
    isFetchComment: true,
  });
  const {
    data: { data: taskInfo } = {},
    refetch: refetchInfoTask,
    isLoading,
    isSuccess,
  } = useQuery(`task_info.${id}`, () => TaskRepository.taskInfo(id), {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-cbs-gray h-full overflow-hidden">
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md space-y-5">
          <header>
            <div className={styles.headerTitle}>
              <div className="row-span-2 flex space-x-2.5">
                <div className={styles.headerImageContainer}>
                  <img
                    src="https://dntdurzwr12tp.cloudfront.net/root/storage/5df4ce16506d9b3c587948ca/6046add8b55525368b108ce2/3652CE1F-50BA-44EB-8EBF-7C3F7E45A6B4.jpg___3e94ebed-338b-4c64-98b7-ed3f5c9860c9___MEDIA.jpg"
                    alt="logo1"
                    className="border-cbs-border border-0.5"
                  />
                </div>
                <div className={styles.headerImageContainer}>
                  <img
                    src="https://dntdurzwr12tp.cloudfront.net/root/storage/5df4ce16506d9b3c587948ca/6046add8b55525368b108ce2/3652CE1F-50BA-44EB-8EBF-7C3F7E45A6B4.jpg___3e94ebed-338b-4c64-98b7-ed3f5c9860c9___MEDIA.jpg"
                    alt="logo2"
                    className="border-cbs-border border-0.5"
                  />
                </div>
                <div className={styles.headerImageContainer}>
                  <img
                    src="https://dntdurzwr12tp.cloudfront.net/root/storage/5df4ce16506d9b3c587948ca/6046add8b55525368b108ce2/3652CE1F-50BA-44EB-8EBF-7C3F7E45A6B4.jpg___3e94ebed-338b-4c64-98b7-ed3f5c9860c9___MEDIA.jpg"
                    alt="logo3"
                    className="border-cbs-border border-0.5"
                  />
                </div>
              </div>
              <div className="text-x-small">XÂY DỰNG CỤM TRƯỜNG TIỂU HỌC VÀ THCS TÂY HỒ TÂY</div>
              <div className="row-span-2">
                <div className={styles.headerImageContainer}>
                	<img src="https://dntdurzwr12tp.cloudfront.net/root/storage/5df4ce16506d9b3c587948ca/6046add8b55525368b108ce2/3652CE1F-50BA-44EB-8EBF-7C3F7E45A6B4.jpg___3e94ebed-338b-4c64-98b7-ed3f5c9860c9___MEDIA.jpg" alt="logo1" className="border-cbs-border border-0.5" />
								</div>
              </div>
              <div className="text-large align-middle text-cbs-secondary">BIÊN BẢN HỌP</div>
            </div>
            <div className={styles.headerInfo}>
              <div className="col-span-2 flex">
                <div className="whitespace-nowrap mr-2.5">Tiêu đề:</div>
                <div className="text-cbs-highlight-color">
                  Đệ trình phê duyệt Danh sách ngắn nhà thầu dự kiến mời tham gia chào giá gói thầu
                  Vệ sinh công nghiệp dự án
                </div>
              </div>
              <div>
                <p>Số hiệu:</p>
                <p className="font-normal">CHG.MOM.20220304</p>
              </div>
              <div>
                <p>
                  <span>Khởi tạo: </span>
                  <span className="font-normal">
                    <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle">
                      <img src="" className="h-full w-full" alt="" />
                    </span>
                    Nguyễn Phan Thanh Hương-CPMI
                  </span>
                </p>
                <p>Thời gian: 12/3/2022 08:41</p>
              </div>
              <div>
                <p>Bắt đầu: </p>
                <p className="mt-2.5 font-normal">12/3/2022 08:41</p>
              </div>
              <div>
                <p>Kết thúc:</p>
                <p className="mt-2.5 font-normal">12/3/2022 08:41</p>
              </div>
              <div className="col-span-3 py-2">
                <p className="space-x-1">
                  Liên quan:
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle border-cbs-border border-0.5">
                    <img src="" className="h-full w-full" alt="" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle border-cbs-border border-0.5">
                    <img src="" className="h-full w-full" alt="" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle border-cbs-border border-0.5">
                    <img src="" className="h-full w-full" alt="" />
                  </span>
                </p>
              </div>
            </div>
          </header>
          <main className="space-y-5">
            {/* Nội dung */}
            <section>
              <div className="font-bold">
                <span>NỘI DUNG</span>
              </div>
              <div className="mt-2.5">
                <div className="border-cbs-border border-0.5 min-h-[300px]"></div>
              </div>
            </section>
            {/* Việc xử lý */}
            <section>
              <div className="font-bold">
                <span>VIỆC XỬ LÝ</span>
              </div>
              <div className="border-cbs-border border-0.5 mt-2.5">
                <div className="pl-5 divide-y divide-cbs-border">
                  <CheckListItem
                    userID=""
                    data={
                      {
                        _id: "123",
                        actualFinishTime: "20/12/2022",
                        assignee: {
                          _id: "123",
                          fullname: "test",
                          image: "3222c61c-d206-44c2-aa5d-bd315407344f.jpg",
                        },
                        expiredTime: "Sat Apr 23 2022 13:09:41 GMT+0700 (Giờ Đông Dương)",
                        type: "1",
                        name: "Cán bộ thanh toán kiểm tra hồ sơ thanh toán đợt 9 (Tư vấn B.I.M đợt 4)",
                      } as any
                    }
                  />
                  <CheckListItem
                    userID=""
                    data={
                      {
                        _id: "123",
                        actualFinishTime: "20/12/2022",
                        assignee: {
                          _id: "123",
                          fullname: "test",
                          image: "3222c61c-d206-44c2-aa5d-bd315407344f.jpg",
                        },
                        expiredTime: "Sat Apr 23 2022 13:09:41 GMT+0700 (Giờ Đông Dương)",
                        type: "1",
                        name: "Cán bộ thanh toán kiểm tra hồ sơ thanh toán đợt 9 (Tư vấn B.I.M đợt 4)",
                      } as any
                    }
                  />
                </div>
                {visibleForm && (
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
                )}

                <div className="shadow-lg mt-5 pb-5 px-5">
                  <button onClick={() => setVisibleForm(true)}>
                    <div className="flex items-center text-green-success font-bold">
                      <img src={IconPlus} alt="icon" className="w-4 h-4" />
                      <span className="ml-1">Tạo mới</span>
                    </div>
                  </button>
                </div>
              </div>
            </section>
            {/* Xác nhận */}
            <section>
              <div className="flex justify-between">
                <span className="font-bold">XÁC NHẬN</span>
                <button className="px-4 py-2 rounded-cbs-sm bg-cbs-completed text-white">
                  Đồng ý
                </button>
              </div>
              <div className="mt-2.5">
                <table className="border-collapse border-cbs-border border-0.5 w-full">
                  <tbody>
                    <tr className="border-b-0.5 border-cbs-border align-top">
                      <td className="pl-5 pb-3 pt-2.5">
                        <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle">
                          <img src="" className="h-full w-full" alt="" />
                        </span>
                      </td>
                      <td className="pl-5 pb-3 pt-4 text-cbs-highlight-color">
                        Nguyễn Phan Thanh Hương-CPMI
                      </td>
                      <td className="pl-5 pb-3 pt-4 text-cbs-primary">21/04/2022 08:12</td>
                      <td className="pl-5 pb-3 pt-4">
                        <div className="w-28 h-11">
                          <img alt="Chữ ký" className="h-full w-full object-cover" />
                        </div>
                      </td>
                      <td className="pl-5 pb-3 pt-4">
                        <button className="px-2.5 py-1.5 bg-cbs-gray">Khoá</button>
                      </td>
                    </tr>
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
                <div className="text-x-large py-3 px-6 font-bold">Bình luận 0</div>
                <RootCommentsList
                  className="px-5"
                  userID={user?._id}
                  comments={listComments}
                  totalRecord={totalRecord}
                  limit={limit}
                  taskID={id}
                />
                <div className="flex flex-col w-full max-h-full overflow-y-auto">
                  <ReplyCommentField
                    attachFile
                    inputContainerClassName="flex w-full p-2"
                    fileContainerClassName="border-0.5 border-l-0 border-cbs-border mr-7 divide-y-0.5 divide-cbs-border"
                    projectID={taskInfo?.project?._id}
                    groupID={taskInfo?.group?._id}
                    taskID={id}
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
              </div>
            </section>
          </main>
          <footer>
            <p>
              <i>In từ nền tảng https://app.trixgo.com: 21/04/2022 06:49</i>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PCMPrintTask;
