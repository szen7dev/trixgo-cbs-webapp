import { FC, useState } from "react";

import HumanAvatar from "assets/images/human-avatar.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import IconPencil from "assets/images/icons8-pencil.svg";
import LinkIcon from "assets/images/icon-linking.png";

const CheckListItem: FC = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex justify-between px-5 pt-4 pb-3">
        <div className="flex items-start w-3/4">
          <input type="checkbox" />
          <div className="ml-2 truncate">
            <span className="text-[13px]">
              Cán bộ kỹ thuật kiểm tra hồ sơ thanh toán đợt 9 (Tư vấn B.I.M đợt
              4)
            </span>

            <div className="flex">
              <img src={HumanAvatar} alt="Avatar" className="w-5 h-5" />
              <span className="text-primary-gray text-[13px] ml-2">
                Hà Tiến Dũng-CHG
              </span>
            </div>
          </div>
        </div>
        {isHover ? (
          <div className="flex w-1/4 justify-end">
            <button className="mx-2">
              <img className="w-6" src={SendEmailIcon} alt="Send email icon" />
            </button>
            <button className="mx-2">
              <img className="w-6" src={IconPencil} alt="Pencil icon" />
            </button>
            <button className="mx-2">
              <img className="w-6" src={LinkIcon} alt="Link icon" />
            </button>
          </div>
        ) : (
          <div className="flex justify-end w-1/4">
            <div>
              <span className="px-3 py-1 rounded-xl bg-red-200 text-red-500">
                Quá hạn
              </span>
            </div>
            <span className="ml-2 text-[13px]">18/12/21</span>
          </div>
        )}
      </div>
      <div className="w-full h-0.5 bg-gray-200" />
    </div>
  );
};

export default CheckListItem;
