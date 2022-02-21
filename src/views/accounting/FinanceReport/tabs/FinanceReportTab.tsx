import { FC } from "react";

import BalanceSheet from "../components/BalanceSheet";

type Props = {
  toggleTab: number;
};

const FinanceReportTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <BalanceSheet />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <p>Bảng cân đối kế toán</p>
      </div>

      <div className={toggleTab === 3 ? "block" : "hidden"}>
        <p>Kết quả kinh doanh</p>
      </div>

      <div className={toggleTab === 4 ? "block" : "hidden"}>
        <p>Lưu chuyển tiền tệ</p>
      </div>
    </section>
  );
};

export default FinanceReportTab;
