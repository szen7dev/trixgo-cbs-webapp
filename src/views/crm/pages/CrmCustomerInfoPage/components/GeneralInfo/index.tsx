import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';

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

export const GeneralInfo: FC<Props> = memo((props) => {
  const { t: i18n } = useTranslation(["human"]);
  const { info } = props;

  return (
    <div className="px-4 mt-5">
      {/* Thông tin khách hàng */}
      <p className="text-bold text-primary-gray text-lg mb-2">A1. Thông tin khách hàng</p>
      <div className="text-[13px]">
        <table className="table-fixed border w-full">
          <tbody>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("id")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?._id}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("phone")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.phone}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("sign")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.sign}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("email")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.email}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("gender")}
              </td>
              <td className="border w-2/6 pl-4">
                {info.gender == 1 && "Nam"}
                {info.gender == 2 && "Nữ"}
                {info.gender == 3 && "Khác"}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("department")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.department?.name}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("birthday")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.birthday).isValid() && moment(info?.birthday).format(DATE_FORMAT)}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("position")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.position?.name}
              </td>
            </tr>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Mô tả
              </td>
              <td className="border w-2/6 pl-4">
                {info?.description}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Ghi chú
              </td>
              <td className="border w-2/6 pl-4">
                {info?.note}
              </td>
            </tr>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Danh mục cha
              </td>
              <td className="border w-2/6 pl-4">
                {info?.parent?.name}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Nguồn dữ liệu
              </td>
              <td className="border w-2/6 pl-4">
                {info?.dataSource?.name}
              </td>
            </tr>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Link tài khoản
              </td>
              <td className="border w-2/6 pl-4">
                {info?.linkUser?.fullname}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Cập nhật lần cuối
              </td>
              <td className="border w-2/6 pl-4">
                {info?.userUpdate?.fullname} - {moment(info?.modifyAt).isValid() && moment(info?.modifyAt).format("DD/MM/YYYY hh:mm")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

GeneralInfo.displayName = "GeneralInfo"