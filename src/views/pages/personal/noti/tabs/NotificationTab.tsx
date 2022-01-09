import { FC } from "react";

import AllNoti from "../components/AllNoti";
import TodayNoti from "../components/TodayNoti";
import UnreadNoti from "../components/UnreadNoti";

type Props = {
  toggleTab: number;
};

const NotificationTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <AllNoti />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <TodayNoti />
      </div>

      <div className={toggleTab === 3 ? "block" : "hidden"}>
        <UnreadNoti />
      </div>
    </section>
  );
};

export default NotificationTab;
