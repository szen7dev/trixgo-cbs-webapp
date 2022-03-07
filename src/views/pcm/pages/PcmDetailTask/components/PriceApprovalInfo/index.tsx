import { FC } from "react";
import moment from "moment";
import { User } from "typings/user";

type Props = {
  valueApproved: number;
  timeApproved?: string;
  approver?: User;
};

export const PriceApprovalInfo: FC<Props> = ({
  valueApproved,
  timeApproved,
  approver,
}) => {
  return (
    <>
      {/* <p className="text-x-large my-5">Giá trị đệ trình/phê duyệt</p>
      <div className="flex items-center rounded p-5 bg-blue-100 border-2 border-primay-border">
        <div className="w-3/4">
          <div>
            <span className="text-[13px] text-primary-gray">
              Giá trị đệ trình:
            </span>
            <span className="text-[13px] ml-2">0</span>
          </div>
          <div>
            <span className="text-primary-gray">Giá trị phê duyệt:</span>
            <span className="ml-2 text-[13px] text-green-600">
              {valueApproved}
            </span>
          </div>
          <div>
            <span className="text-[13px] text-primary-gray">
              Thời gian phê duyệt:
            </span>
            <span className="ml-2 text[13px]">
              {timeApproved
                ? moment(timeApproved).format("HH:mm DD/MM/YYYY")
                : ""}
            </span>
          </div>
          <div>
            <span className="text-[13px] text-primary-gray">
              Người phê duyệt:
            </span>
            {approver && (
              <span className="ml-2 text[13px]">{approver.fullname}</span>
            )}
          </div>
        </div>
        <div className="w-1/4 flex justify-end">
          <button className="text-white rounded bg-green-600 px-3 py-2">
            Đồng ý
          </button>
        </div>
      </div> */}
    </>
  );
};