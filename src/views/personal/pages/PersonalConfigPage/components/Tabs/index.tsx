import { FC } from "react";

import { ConfigList } from "../ConfigList";
import { Shared } from "../Shared";

type Props = {
  toggleTab: number;
};

export const ConfigTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <ConfigList />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <Shared />
      </div>
    </section>
  );
};
