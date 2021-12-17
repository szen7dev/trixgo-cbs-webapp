import { FC } from "react";

import cn from "classnames";

import styles from "../../styles.module.css";

const ProfileAndProductReport: FC = () => {
  return (
    <>
      <p className="font-bold text-primary-gray text-lg">Hồ sơ, sản phẩm</p>
      <div
        className={cn(
          "h-16 w-40 flex flex-col items-center justify-around rounded my-6",
          styles.backgroundGray
        )}
      >
        <p className="text-base">2.632</p>
        <p className="text-primary-gray">Hồ sơ văn bản</p>
      </div>
      <div
        className={cn(
          "h-16 w-40 flex flex-col items-center justify-around rounded",
          styles.backgroundGray
        )}
      >
        <p className="text-base">8</p>
        <p className="text-primary-gray">Hồ sơ thanh toán</p>
      </div>
    </>
  );
};

export default ProfileAndProductReport;
