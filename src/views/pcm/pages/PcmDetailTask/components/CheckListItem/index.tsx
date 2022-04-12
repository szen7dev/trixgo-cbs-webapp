import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import cn from "classnames";

// import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import IconPencil from "assets/images/icons8-pencil.svg";
import LinkIcon from "assets/images/icon-linking.png";

import { TypeStatusLabel } from "./components/TypeStatusLabel";
import { CheckList, ChildTask, UpdateStatusCheckListPayload } from "typings/task";

type Props = {
  data: CheckList | ChildTask;
  onUpdateStatusCheckList?: (payload: UpdateStatusCheckListPayload) => void;
  hasPermission: boolean;
};

export const CheckListItem: FC<Props> = ({ data, onUpdateStatusCheckList, hasPermission }) => {
  const history = useHistory();
  const [isHover, setIsHover] = useState(false);
  const [isDisabled, setIsDisabled] = useState(data.status === 3 || !hasPermission);

  const handleUpdateStatusChecklist = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked && data.status !== 3 && hasPermission) {
      onUpdateStatusCheckList && onUpdateStatusCheckList({
        checklistID: data._id,
        status: 3
      });
      setIsDisabled(true);
    }
  }

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex justify-between pt-4 pb-3">
        <div className="flex items-start w-3/4">
          <input
            type="checkbox"
            className={cn('cbs-checkbox checked:bg-green-500 checked:border-none checked:opacity-75', {
              'disabled:opacity-75 border-none': data.status === 3
            })}
            disabled={isDisabled}
            defaultChecked={data.status === 3}
            onChange={handleUpdateStatusChecklist}
          />
          <div className="ml-2 truncate">
            <span className="text-[13px]">{data.name}</span>

            <div className="flex">
              <img
                src={`${process.env.REACT_APP_URL_S3_USER}/${data.assignee.image}`}
                alt="Avatar"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-primary-gray text-[13px] ml-2">
                {data.assignee.bizfullname || data.assignee.fullname}
              </span>
            </div>
          </div>
        </div>
        {(isHover && data.type !== 2) ? (
          <>
            {/* {(data.type === 2 && !isDisabled) ? (
              <div className="flex w-1/4 justify-end">
                <button className="mx-2">
                  <img className="w-6" src={IconPencil} alt="Pencil icon" />
                </button>
              </div>
            ) : ''} */}
            {data.type === 1 ? (
              <div className="flex w-1/4 justify-end">
                <button className="mx-2" onClick={() => history.push(`/pcm/detail/${data._id}`)}>
                  <img className="w-6" src={LinkIcon} alt="Link icon" />
                </button>
              </div>
            ) : ''}
            {/* <button className="mx-2">
              <img className="w-6" src={SendEmailIcon} alt="Send email icon" />
            </button> */}
          </>
        ) : (
          <div className="flex justify-end w-1/4">
            {!isDisabled && (<TypeStatusLabel expiredTime={data.expiredTime} />)}
            <span
              className={cn('ml-2 text-[13px]', {
                'text-green-300': isDisabled
              })}>
              {moment(data.expiredTime).format("DD/MM/YYYY")}
            </span>
          </div>
        )}
      </div>
      {/* <div className="w-full h-px bg-gray-200" /> */}
    </div>
  );
};