import React, { FC } from "react";
import { CheckListItem } from "views/pcm/pages/PcmDetailTask/components";

import styles from "../styles/style.module.css";

type Props = {
  //
};

const PCMPrintTask: FC<Props> = (props) => {
  return (
    <div className="bg-cbs-gray h-full overflow-hidden">
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md">
          <header>
            <div></div>
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
                    <div className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle">
                      <img src="" className="h-full w-full" alt="" />
                    </div>
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
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle">
                    <img src="" className="h-full w-full" alt="" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle">
                    <img src="" className="h-full w-full" alt="" />
                  </span>
                  <span className="inline-block w-8 h-8 rounded-full overflow-hidden align-middle">
                    <img src="" className="h-full w-full" alt="" />
                  </span>
                </p>
              </div>
            </div>
          </header>
          <main>
            {/* Nội dung */}
            <section>
              <div>
                <span>NỘI DUNG</span>
              </div>
              <div>
                <div className="border-cbs-border border-0.5 min-h-[300px]"></div>
              </div>
            </section>
            {/* Việc xử lý */}
            <section>
              <div>
                <span>VIỆC XỬ LÝ</span>
              </div>
              <div>
                <CheckListItem
                  userID=""
                  data={
                    {
                      _id: "123",
                      actualFinishTime: "20/12/2022",
                      assignee: { _id: "123", fullname: "test" },
                      expiredTime: "20/12/2022",
                      type: "1",
                    } as any
                  }
                />
              </div>
            </section>
            {/* Xác nhận */}
            <section>
              <div>
                <span>XÁC NHẬN</span>
              </div>
            </section>

            {/* Thảo luận */}
            <section>
              <div>
                <span>THẢO LUẬN</span>
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
