import { FC, useState } from "react";
import moment from "moment";

import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import IconPencil from "assets/images/icons8-pencil.svg";
import LinkIcon from "assets/images/icon-linking.png";

import { TypeStatusLabel } from "./components/TypeStatusLabel";
import { CheckList } from "typings/task";

type Props = {
  data: CheckList;
};

export const CheckListItem: FC<Props> = ({ data }) => {
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
            <span className="text-[13px]">{data.name}</span>

            <div className="flex">
              <img
                src={`${process.env.REACT_APP_URL_S3_USER}/${data.assignee.image}`}
                alt="Avatar"
                className="w-5 h-5 rounded-full"
              />
              <span className="text-primary-gray text-[13px] ml-2">
                {data.assignee.bizfullname || data.assignee.fullname}
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
            <TypeStatusLabel status={data.status} />
            <span className="ml-2 text-[13px]">
              {moment(data.expiredTime).format("DD/MM/YYYY")}
            </span>
          </div>
        )}
      </div>
      <div className="w-full h-px bg-gray-200" />
    </div>
  );
};
