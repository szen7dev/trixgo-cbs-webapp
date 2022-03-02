import { FC } from "react";

import { SupportHomeActivity, SupportHomeDashboard } from "./components";

type Props = {
    toggleTab: number;
    timeType: string;
    typeYear: number
};

export const HomeTabsList: FC<Props> = (props) => {
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