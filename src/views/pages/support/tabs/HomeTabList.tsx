import React, { FC } from "react";

import SupportHomeActivity from "../components/home/activity/SupportHomeActivity";
import SupportHomeDashboard from "../components/home/dashboard/SupportHomeDashboard";

type Props = {
    toggleTab: number;
    timeType: string;
    typeYear: number
};

const TabsList: FC<Props> = (props) => {
  const { toggleTab, timeType, typeYear } = props;
  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <SupportHomeDashboard timeType={timeType} typeYear={typeYear} />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <SupportHomeActivity timeType={timeType} />
      </div>
    </section>
  );
};

export default TabsList;
