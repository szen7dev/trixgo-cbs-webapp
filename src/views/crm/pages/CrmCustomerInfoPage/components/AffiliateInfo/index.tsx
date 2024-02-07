import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';

type Props = {
  info: Human
};

export const AffiliateInfo: FC<Props> = memo((props) => {
  const { t: i18n } = useTranslation(["human"]);

  const { info } = props;
  // console.log(info)

  return (
    <div className="px-4">
      {/* Tiếp thị liên kết */}
      <p className="text-bold text-primary-gray text-lg mb-2 mt-5">Tiếp thị liên kết</p>
      <div className="text-[13px]">
        <p>Danh sách đăng ký chờ duyệt</p>
        <p>Các đơn hàng do khách giới thiệu</p>
        <p>Tuyến dưới của khách hàng xây dựng</p>
      </div>
    </div>
  );
});

AffiliateInfo.displayName = "AffiliateInfo"