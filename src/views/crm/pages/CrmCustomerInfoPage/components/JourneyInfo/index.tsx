import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import { useFnbCustomerCare, useCustomerJourneyByProperty } from "services/hooks/fnb/useFnbCustomerCare";

type Props = {
  info: Human
};

const DATE_FORMAT = 'DD/MM/YYYY';

export enum CONTACT_POLICY {
  'Không' = 1,
  'Bộ đội phục viên' = 2,
  'Con thương bệnh binh' = 3,
  'Gia đình chính sách' = 4,
};

export enum INSURANCE_STATUS {
  'Chưa nộp' = 1,
  'Đã nộp' = 2,
  'Thêm mới' = 3,
}

export const JourneyInfo: FC<Props> = memo((props) => {
  const { t: i18n } = useTranslation(["human"]);

  const { info } = props;
  // console.log(info)

  const { listCustomerJourneyByProperty, refetchListCustomerJourneyByProperty } = useCustomerJourneyByProperty({
    params: {
        option: 5,
        // fromDate: inputFilter.fromDate,
        // toDate: inputFilter.toDate,
    },
    isFetchList: true
})
console.log(listCustomerJourneyByProperty)

  return (
    <div className="px-4">
      {/* Hành trình trải nghiệm */}
      <p className="text-bold text-primary-gray text-lg mb-2 mt-5">Hành trình trải nghiệm</p>
      <div className="text-[13px]">

      </div>

    </div>
  );
});

JourneyInfo.displayName = "JourneyInfo"