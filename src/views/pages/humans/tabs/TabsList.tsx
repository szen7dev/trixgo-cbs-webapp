import { FC } from "react";

import HumanList from "./HumanList";

type Props = {
  toggleTab: number;
};

const TabsList: FC<Props> = (props) => {
  const name = "Nguyễn Phan Thanh Hương";
  const role = "Cán bộ kế toán";
  const data = [];
  for (let i = 0; i <= 9; i++) {
    data.push({ name, role, id: i });
  }

  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <HumanList data={data} />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        Theo dõi thời hạn
      </div>
      <div className={toggleTab === 3 ? "block" : "hidden"}>
        Tra cứu năng lực
      </div>
      <div className={toggleTab === 4 ? "block" : "hidden"}>
        Tra cứu văn bằng
      </div>
      <div className={toggleTab === 5 ? "block" : "hidden"}>Tra cứu khác</div>
    </section>
  );
};

export default TabsList;
