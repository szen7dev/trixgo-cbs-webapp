import { FC } from "react";

import styles from "../style.module.css";

type Props = {
  open: boolean;
};

const EditNote: FC<Props> = ({ open }) => {
  return (
    <main className={`w-[680px] h-full ${styles.filterShadow}`}>
      <header className={`h-9 ${styles.bgBoldYellow}`}>{""}</header>
      <section
        className={`p-4 text-[15px] ${styles.bgLightYellow}`}
        style={{ height: "calc(100% - 72px)" }}
      >
        <textarea
          defaultValue="Hồ sơ thanh toán tháng 8 năm 2021, tất cả cần chuyển sớm thông tin"
          className="bg-transparent h-max w-full max-w-full outline-none"
        />
      </section>
      <footer className={`h-9 ${styles.bgBoldYellow}`}>{""}</footer>
    </main>
  );
};

export default EditNote;
