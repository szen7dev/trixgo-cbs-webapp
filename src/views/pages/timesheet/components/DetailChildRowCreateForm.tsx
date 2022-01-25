import React, { FC, useRef } from "react";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import moment from "moment";

import DropdownSearchable from "components/common/DropdownSearch";

import { useQueryListFriend } from "services/hooks/users/useFriend";

import type { InsertTimeSheetChildPayload } from "typings/time-sheet";

type DetailChildRowCreateFormProps = {
  collapsed?: boolean;
  isLastRow?: boolean;
  onInsert: (values: InsertTimeSheetChildPayload) => Promise<boolean>;
};

const DetailChildRowCreateForm: FC<DetailChildRowCreateFormProps> = ({
  collapsed,
  isLastRow,
  onInsert,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [searchAssigneeStr, setSearchAssigneeStr] = React.useState("");

  const { data: listFriend } = useQueryListFriend({
    keyword: searchAssigneeStr,
  });

  const handleClickUpdateTimeSheet = React.useCallback(
    async (value) => {
      const isCreated = await onInsert({
        ...value,
      });
      return isCreated;
    },
    [onInsert]
  );

  return (
    <div
      ref={wrapperRef}
      style={
        collapsed
          ? {
              transform: "scaleY(0)",
              transformOrigin: "top center",
              height: 0,
              visibility: "collapse",
            }
          : {}
      }
      className={
        "transition duration-300 ease-in-out child-row table-row " +
        (collapsed ? "collapsed " : "not-collapsed ") +
        (isLastRow ? "last-child-row" : "")
      }
    >
      <div
        className={
          "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell relative align-middle border border-gray-300"
        }
      ></div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 px-2 py-5"}
        >
          {""}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <input
          // contentEditable={"true"}
          // suppressContentEditableWarning={true}
          placeholder='Nhập nội dung...'
          className={"w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"}
          onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const isCreated = await handleClickUpdateTimeSheet({
              name: value,
            });
            if (isCreated) {
              e.target.value = "";
            }
          }}
        />
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        {/* <DatePicker
          className="w-16"
          selected={null}
          placeholderText="Chọn thời gian"
          onChange={(date: Date | null) => {
            if (moment(date).isValid())
              handleClickUpdateTimeSheet({
                date: moment(date).toJSON(),
              });
          }}
        /> */}
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 text-end bg-white"
        }
      >
        <p className={"w-full h-full focus:outline-blue-600 p-2"}>
          {/* <input type="checkbox" className="form-check-input cursor-pointer" /> */}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          // contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
          // onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          //   const value = e.target.innerText;
          //   handleClickUpdateTimeSheet({
          //     hours: `${value}`,
          //   });
          // }}
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white w-1/12"
        }
      >
        <p
          // contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
          // onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          //   const value = e.target.innerText;
          //   handleClickUpdateTimeSheet({
          //     unitprice: `${value}`,
          //   });
          // }}
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white w-1/12"
        }
      >
        <p
          // contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
          // onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          //   const value = e.target.innerText;
          //   handleClickUpdateTimeSheet({
          //     amount: `${value}`,
          //   });
          // }}
        />
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        {/* <DropdownSearchable
          id="ticket-creator"
          className={"w-full flex-1 py-1 px-3"}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Người thực hiện"
          renderSelectedItem={(item) => <span>{item.text}</span>}
          data={listFriend}
          formatItem={{
            id: "_id",
            text: "fullname",
          }}
          onSearchInputChange={debounce(
            (value) => setSearchAssigneeStr(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateTimeSheet({
              assigneeID: value,
            })
          }
        /> */}
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <p
          // contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
          // onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          //   const value = e.target.innerText;
          //   handleClickUpdateTimeSheet({
          //     note: value,
          //   });
          // }}
        />
      </div>
    </div>
  );
};

export default DetailChildRowCreateForm;
