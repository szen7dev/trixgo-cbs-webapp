import { FC } from "react";

import OtherConfig from "../OtherConfig";
import ItemAccountPage from "../ItemAccountPage";

type Props = {
  toggleTab: number;
};

export const AdminTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <p>Nhóm chức năng</p>
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <p>Phân quyền chức năng</p>
      </div>

      <div className={toggleTab === 3 ? "block" : "hidden"}>
        <OtherConfig />
      </div>

      <div className={toggleTab === 4 ? "block" : "hidden"}>
        <ItemAccountPage />
      </div>

      <div className={toggleTab === 5 ? "block" : "hidden"}>
        <p>Funda</p>
      </div>

      <div className={toggleTab === 6 ? "block" : "hidden"}>
        <p>Warehouse</p>
      </div>

      <div className={toggleTab === 7 ? "block" : "hidden"}>
        <p>Good</p>
      </div>
    </section>
  );
};
