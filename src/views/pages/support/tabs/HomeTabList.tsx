import { FC } from "react";

import SupportHomeActivity from "../components/home/activity/SupportHomeActivity";
import SupportHomeDashboard from "../components/home/dashboard/SupportHomeDashboard";

type Props = {
    toggleTab: number;
    timeType: string;
};

const TabsList: FC<Props> = (props) => {
  const { toggleTab } = props;
  const { timeType } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <SupportHomeDashboard timeType={timeType} />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <SupportHomeActivity />
      </div>
    </section>
  );
};

export default TabsList;
