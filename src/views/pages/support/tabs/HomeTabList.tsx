import { FC } from "react";

import SupportHomeActivity from "../components/home/activity/SupportHomeActivity";
import SupportHomeDashboard from "../components/home/dashboard/SupportHomeDashboard";

type Props = {
  toggleTab: number;
};

const TabsList: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <SupportHomeDashboard />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <SupportHomeActivity />
      </div>
    </section>
  );
};

export default TabsList;
