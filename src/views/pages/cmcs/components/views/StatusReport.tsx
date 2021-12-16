import { FC } from "react";

import cn from "classnames";

import styles from "../../styles.module.css";

const StatusReport: FC = () => {
  return (
    <>
      <div
        className={cn(
          "bg-primary-light",
          styles.borderBottom,
          styles.borderRight,
          styles.borderTop,
          styles.topDiv
        )}
      >
        <p className="font-bold text-lg px-6 py-4 text-primary-gray">
          Tình trạng triển khai
        </p>
      </div>
    </>
  );
};

export default StatusReport;
