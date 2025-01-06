import { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney, convertDisplayDate } from "utils/cmcs";
import type { Human } from 'typings/human';
import { useAuth } from "services/hooks/auth/useAuth";
import { ACCESS_SALARY_TEMP } from "apis/localdb";
import { ModalHumanInformation } from 'shareComponents/common/ModalHumanInformation';

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
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [optionPopup, setOptionPopup] = useState();
  const [staffPopup, setStaffPopup] = useState();

  const { user } = useAuth();
  const { t: i18n } = useTranslation(["human"]);
  const { info } = props;
  // console.log(user)

  const toggleVisible = ({ option, staffID, contactID, goodsID, assetsID }: any) => {
		setVisibleDrawer(!visibleDrawer)
    setOptionPopup(option)
		setStaffPopup(staffID)
	}

  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <p className="text-bold text-primary-gray text-lg mb-4 uppercase">
        {i18n("general-info")}
      </p>
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
                {i18n("identity")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.identity}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("address")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.address}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("dateProvice")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.dateProvice).isValid() && moment(info?.dateProvice).format(DATE_FORMAT)}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("description")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.description}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("place")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.place}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("area2")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.area2?.name}, {info?.area2?.parent?.name}, {info?.area2?.parent?.parent?.name}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("area1")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.area1?.name}, {info?.area1?.parent?.name}, {info?.area1?.parent?.parent?.name}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("workplace")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.workplace?.map(elm => elm.name)}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("taxid")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.taxid}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("major")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.documents?.map((elm: any) => elm?.field2?.name ? elm?.field2?.name +",": "")}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("educationalBackground")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.documents?.map((elm: any) => elm?.educationalBackground2?.name ?  elm?.educationalBackground2?.name +"," : "" )}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("insuranceDate")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.insuranceDate && moment(info?.insuranceDate).isValid() && moment(info?.insuranceDate).format(DATE_FORMAT)}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Lương
              </td>
              <td className="border w-2/6 pl-4">
                {ACCESS_SALARY_TEMP.includes(`${user?._id.toString()}`) ? formatNumberMoney(info?.sallary) : ''}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Số người phụ thuộc
              </td>
              <td className="border w-2/6 pl-4">
                {info?.nods}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("insuranceStatus")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.insuranceSign}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("sallarySubFactor")}
              </td>
              <td className="border w-2/6 pl-4">
                {formatNumberMoney(info?.sallaryBasic)}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("sallaryFactor")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.sallaryFactor}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("contractType")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.contractType?.name}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("workStartDate")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.workStartDate).isValid() && moment(info?.workStartDate).format(DATE_FORMAT)}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("contractSign")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.contractSign}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("dayOff")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.dayOff).isValid() && moment(info?.dayOff).format(DATE_FORMAT)}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("contractDate")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.contractDate).isValid() && moment(info?.contractDate).format(DATE_FORMAT)}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("workingStatus")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.workingStatus?.name}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("contractValid")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.contractValid).isValid() && moment(info?.contractValid).format(DATE_FORMAT)}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("other")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.other?.name}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("contractExpire")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.contractExpire).isValid() && moment(info?.contractExpire).format(DATE_FORMAT)}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("appointDate")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.appointDate).isValid() && moment(info?.appointDate).format(DATE_FORMAT)}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("changeSallaryDate")}
              </td>
              <td className="border w-2/6 pl-4">
                {moment(info?.changeSallaryDate).isValid() && moment(info?.changeSallaryDate).format(DATE_FORMAT)}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("familyPolicy")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.familyPolicy && CONTACT_POLICY[info?.familyPolicy || 0]}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("family")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.family}
              </td>
            </tr>

            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("signerIn")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.signerIn}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                {i18n("signerOut")}
              </td>
              <td className="border w-2/6 pl-4">
                {info?.signerOut}
              </td>
            </tr>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Tài khoản ngân hàng
              </td>
              <td className="border w-2/6 pl-4">
                {info?.bankAccount} - {info?.bank}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Tiền đóng bảo hiểm
              </td>
              <td className="border w-2/6 pl-4">
                {formatNumberMoney(info?.insuranceFee)}
              </td>
            </tr>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Tiền đóng công đoàn
              </td>
              <td className="border w-2/6 pl-4">
                {formatNumberMoney(info?.union)}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Tiền góp quỹ tương thân tương ái
              </td>
              <td className="border w-2/6 pl-4">
                {formatNumberMoney(info?.share)}
              </td>
            </tr>
            <tr className="border h-7 leading-7">
              <td className="border text-primary-gray w-1/6 pl-4">
                Ghi chú
              </td>
              <td className="border w-2/6 pl-4">
                {info?.note}
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Số ngày tối đa được nghỉ phép năm
              </td>
              <td className="border w-2/6 pl-4">
                {info?.numberOnLeave}
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
                Số giờ làm quy định/năm
              </td>
              <td className="border w-2/6 pl-4">
                {formatNumberMoney(info?.annualWorkingHours)} | (365-52 tuần*1 ngày nghỉ/tuần)*8
              </td>
              <td className="border text-primary-gray w-1/6 pl-4">
                Số ngày nghỉ phép phát sinh (việc Hỉ, Sinh, Hiếu)
              </td>
              <td className="border w-2/6 pl-4">
                {info?.numberOnLeavePlus}
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
          <div onClick={() => toggleVisible({ option: 1, staffID: info?.linkUser?._id})} className="mt-5 text-cbs-highlight-color cursor-pointer">
            <p className="text-primary-gray">
                <p>
                    Bắt đầu làm việc từ tháng: <span className="font-bold">{Number(12 - info.numberOnLeave + 1)}</span> |
                    Số phép tối đa trong năm: <span className="text-green-500 font-bold"> {info.numberOnLeave}</span> | 
                    Tổng số phép được nghỉ tới hiện tại: <span className="font-bold">{Number(new Date().getMonth()) - Number(12 - info.numberOnLeave)}</span>
                </p>
                Số phép đã nghỉ: <span className="font-bold">{info?.linkUser?.numberOnLeave}</span> | 
                Số phép còn lại tới hiện tại:  
                <span className="text-red-500 font-bold ml-2"> 
                    {Number(new Date().getMonth() + 1) - Number(info?.linkUser?.numberOnLeave + 1) - (12 - Number(info.numberOnLeave))}
                </span>
            </p>
          </div>
      </div>

      <ModalHumanInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ optionPopup, staffPopup }}/>
    </div>
  );
});

GeneralInfo.displayName = "GeneralInfo"