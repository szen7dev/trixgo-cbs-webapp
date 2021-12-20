import { FC } from "react";

import RegisterList from "../components/registerList";
import SupportDashboard from "./SupportDashboard";

type Props = {
  toggleTab: number;
};

const TabsList: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <SupportDashboard />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <RegisterList />
      </div>
    </section>
  );
};

export default TabsList;
