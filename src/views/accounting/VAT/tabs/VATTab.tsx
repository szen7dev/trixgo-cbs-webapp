import { FC } from "react";

import PurchaseList from "../components/PurchaseList";

type Props = {
  toggleTab: number;
};

const VATTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <PurchaseList />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <p>Bảng kê bán ra</p>
      </div>
    </section>
  );
};

export default VATTab;
