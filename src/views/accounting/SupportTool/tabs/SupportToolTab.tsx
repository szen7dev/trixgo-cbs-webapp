import { FC } from "react";

import CostAnalysis from "../components/CostAnalysis";

type Props = {
  toggleTab: number;
};

const SupportToolTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <CostAnalysis />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <p>Tool 2</p>
      </div>

      <div className={toggleTab === 3 ? "block" : "hidden"}>
        <p>Tool 3</p>
      </div>

      <div className={toggleTab === 4 ? "block" : "hidden"}>
        <p>Tool 4</p>
      </div>
    </section>
  );
};

export default SupportToolTab;
