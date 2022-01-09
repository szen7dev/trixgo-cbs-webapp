import { FC } from "react";

import cn from "classnames";

import FakeUser from "assets/images/fake-user.png";
import Thumbnail1 from "assets/images/thumbnail1.jpg";
import Thumbnail2 from "assets/images/thumbnail2.png";

import styles from "../../style.module.css";

const AllNoti: FC = () => {
  return (
    <main className="h-full py-4 flex flex-col">
      <div
        className={cn(
          "flex justify-between px-4 py-2 cursor-pointer",
          styles.noti
        )}
      >
        <div className="flex">
          <img
            src={FakeUser}
            alt="User"
            className="w-[60px] h-[60px] rounded-full mr-5"
          />
          <div>
            <p>
              Kính gửi nhà thầu Xuân Tài! Đến thời điểm hiện tại, BĐH DA chưa
              thấy nhà thầu bổ sung...
            </p>
            <p className="text-secondary-gray">
              Hà Tiến Dũng-CHG | CHG.THT-Hồ sơ thanh toán đợt 01 - thuộc HĐ Thi
              công san lấp của...
            </p>
          </div>
        </div>
        <p className="text-secondary-gray">14:15</p>
      </div>

      <div
        className={cn(
          "flex justify-between px-4 py-2 cursor-pointer",
          styles.noti
        )}
      >
        <div className="flex">
          <img
            src={Thumbnail1}
            alt="Thumbnail1"
            className="w-[60px] h-[60px] rounded-full mr-5"
          />
          <div>
            <p>
              Kính gửi nhà thầu Xuân Tài! Đến thời điểm hiện tại, BĐH DA chưa
              thấy nhà thầu bổ sung...
            </p>
            <p className="text-secondary-gray">
              Hà Tiến Dũng-CHG | CHG.THT-Hồ sơ thanh toán đợt 01 - thuộc HĐ Thi
              công san lấp của...
            </p>
          </div>
        </div>
        <p className="text-secondary-gray">14:15</p>
      </div>

      <div
        className={cn(
          "flex justify-between px-4 py-2 cursor-pointer",
          styles.noti
        )}
      >
        <div className="flex">
          <img
            src={Thumbnail2}
            alt="Thumbnail2"
            className="w-[60px] h-[60px] rounded-full mr-5"
          />
          <div>
            <p>
              Kính gửi nhà thầu Xuân Tài! Đến thời điểm hiện tại, BĐH DA chưa
              thấy nhà thầu bổ sung...
            </p>
            <p className="text-secondary-gray">
              Hà Tiến Dũng-CHG | CHG.THT-Hồ sơ thanh toán đợt 01 - thuộc HĐ Thi
              công san lấp của...
            </p>
          </div>
        </div>
        <p className="text-secondary-gray">14:15</p>
      </div>
    </main>
  );
};

export default AllNoti;
