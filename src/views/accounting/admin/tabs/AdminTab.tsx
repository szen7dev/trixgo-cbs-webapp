import { FC } from "react";

import OtherConfig from "../components/OtherConfig";

type Props = {
  toggleTab: number;
};

const AdminTab: FC<Props> = (props) => {
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
    </section>
  );
};

export default AdminTab;
