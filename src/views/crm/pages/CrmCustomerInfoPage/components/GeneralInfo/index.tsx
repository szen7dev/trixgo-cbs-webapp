import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
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
                ID Hệ thống/Mã hiệu/Ngày tham gia
              </td>
              <td className="border w-2/6 pl-4">
                {info?._id} | {info?.sign} | CCCD: {info?.identity} | {moment(info?.joinedDate).isValid() && moment(info?.joinedDate).format(DATE_FORMAT)} 
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
                Địa chỉ
              </td>
              <td className="border w-2/6 pl-4">
                {info?.area?.name}, {info?.area?.parent?.name}, {info?.area?.parent?.parent?.name}
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
                Ngày dậy thì
              </td>
              <td className="border w-2/6 pl-4">
                {info?.pubertyOnsetDate ? moment(info?.pubertyOnsetDate).isValid() && moment(info?.pubertyOnsetDate).format(DATE_FORMAT) : ''}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Tuổi xương thực
              </td>
              <td className="border w-2/6 pl-4">
                {info?.boneAge}
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
                Support, chăm sóc khách hàng
              </td>
              <td className="border w-2/6 pl-4">
                {info?.support?.name}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Lĩnh vực chuyên ngành
              </td>
              <td className="border w-2/6 pl-4">
                {info?.field?.name}
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
                Khởi tạo
              </td>
              <td className="border w-2/6 pl-4">
                {info?.userCreate?.fullname} - {moment(info?.createAt).isValid() && moment(info?.createAt).format("DD/MM/YYYY hh:mm")}
              </td>
            </tr>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Ghi chú
              </td>
              <td className="border w-2/6 pl-4">
                {info.status == 2 ? <div><button className="text-[10px] text-white rounded px-1 bg-red-400">Tạm dừng</button></div> : <></>}
                {info?.note}
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