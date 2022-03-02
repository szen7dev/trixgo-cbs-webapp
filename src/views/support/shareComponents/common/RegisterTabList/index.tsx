import { FC } from "react";

import { RegisterList, RegisterDashboard } from "./components";

type Props = {
  toggleTab: number;
};

export const RegisterTabsList: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <RegisterDashboard />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <RegisterList />
      </div>
    </section>
  );
};