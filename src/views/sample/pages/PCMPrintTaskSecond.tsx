import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/style.module.css";

type Props = {
  //
};

const PCMPrintTaskSecond: FC<Props> = (props) => {
  return (
    <div className="bg-cbs-gray h-full overflow-hidden">
      <div className="h-full overflow-auto py-6">
        <div className="max-w-[791px] bg-white w-full mx-auto pl-[3.75rem] pr-6 py-6 shadow-cbs-md space-y-5">
          <header>
            <div className={styles.reportTitle}>
              <div className="flex space-x-2.5">
                <div className={styles.headerImageContainer}>
                  <img src="" alt="logo1" className="border-cbs-border border-0.5" />
                </div>
              </div>
              <div className="text-smalll text-center font-normal">
                <p className="text-medium text-cbs-primary font-bold">BÁO CÁO TUẦN CÔNG TÁC QLDA</p>
                <p className="mt-2">SỐ HIỆU: 01BCT</p>
                <p className="mt-1.5">Thời gian: Từ ngày 1/1/2021 - ngày 14/11/2021</p>
              </div>
            </div>
            <div className={classNames(styles.reportInfo, "mt-2")}>
              <div>Dự án:</div>
              <div>
                Đệ trình phê duyệt Danh sách ngắn nhà thầu dự kiến mời tham gia chào giá gói thầu Vệ
                sinh công nghiệp dự án
              </div>
              <div>Chủ đầu tư:</div>
              <div>Công ty Cổ phần đầu tư ABC</div>
              <div>Địa điểm xây dựng:</div>
              <div>Phường Xuân Tảo, Quận Bắc Từ Liêm, Thành phố Hà Nội</div>
              <div>Gói thầu/Hợp đồng:</div>
              <div>Thi công san lấp mặt bằng</div>
              <div>Người lập:</div>
              <div>
                <span className={styles.imageContainer}>
                  <img src="" className="h-full w-full" alt="" />
                </span>
                Nguyễn Phan Thanh Hương-CPMI
              </div>
              <div>Liên quan:</div>
              <div className="space-x-1">
                <span className={styles.imageContainer}>
                  <img src="" className="h-full w-full" alt="" />
                </span>
                <span className={styles.imageContainer}>
                  <img src="" className="h-full w-full" alt="" />
                </span>
                <span className={styles.imageContainer}>
                  <img src="" className="h-full w-full" alt="" />
                </span>
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
            {/* Ký */}
            <section className="font-bold flex justify-end text-center">
              <div className="px-14">
                <p>ĐOÀN TƯ VẤN</p>
                <p className="mt-14">Trưởng đoàn tư vấn</p>
              </div>
            </section>
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
    </div>
  );
};

export default PCMPrintTaskSecond;
