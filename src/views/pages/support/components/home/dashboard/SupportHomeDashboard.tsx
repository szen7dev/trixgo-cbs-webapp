import { FC } from "react";

import SortByDeviceSupport from "./SortByDeviceSupport";
import StatisticsByApp from "./StatisticsByApp";
import StatisticsByDeviceSupport from "./StatisticsByDeviceSupport";
import DetailsByAppDeviceSupport from "./DetailsByAppDeviceSupport";
import AccessList from "./AccessListSupport";
import ByBusinessSupport from "./ByBusinessSupport";
type Props = {
    timeType: string;
    typeYear: number
};
const SupportHomeDashboard: FC<Props> = (props) => {
    const { timeType, typeYear } = props;
  return (
    <section className="flex h-max">
      <div className="w-2/3 p-3">
        <StatisticsByDeviceSupport typeYear={typeYear} />

        <StatisticsByApp timeType={timeType}/>

        {/*<AccessList />*/}
      </div>

      <div className="w-1/3 pr-3 pt-3 pb-3">
        <SortByDeviceSupport />

        <DetailsByAppDeviceSupport />

        {/*<ByBusinessSupport />*/}
      </div>
    </section>
  );
};

export default SupportHomeDashboard;
