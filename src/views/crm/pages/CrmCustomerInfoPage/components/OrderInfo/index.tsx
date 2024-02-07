import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';

type Props = {
  info: Human
};

export const OrderInfo: FC<Props> = memo((props) => {
  const { t: i18n } = useTranslation(["human"]);

  const { info } = props;
  // console.log(info)

  return (
    <div className="px-4">
      {/* Đơn hàng */}
      <p className="text-bold text-primary-gray text-lg mb-2 mt-5">Đơn hàng</p>
      <div className="text-[13px]">

      </div>
    </div>
  );
});

OrderInfo.displayName = "OrderInfo"