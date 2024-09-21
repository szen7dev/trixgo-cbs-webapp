import React, { FC, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
import { convertCurrency } from "utils/converter";
import moment from "moment";
import { DropdownSearchable } from "shareComponents/common";
// import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useQueryListBudgetWork } from "services/hooks/cmcs/useContractIncome";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import { useAuth } from "services/hooks/auth/useAuth";
import { useGoods } from "services/hooks/items/useGoods";
import {
	// useQueryListWarehouse,
	useQueryListContact,
	// useQueryListContract,
	// useQueryListBudgetWork,
	useQueryListAccount,
	// useQueryListGood
} from "services/hooks/cmcs/useContractIncome";
import {
	useDoctype,
} from "services/hooks/items/useDoctype";
import { useFunda } from "services/hooks/items/useFunda";

import type {
  StoreChild,
  StoreParent,
  UpdateStoreChildPayload,
} from "typings/store";
// import { toast } from "react-toastify";

type Props = {
  parent?: StoreParent;
  rowData: StoreChild;
  collapsed: boolean;
  isLastRow: boolean;
  index: number;
  onUpdatedStoreChild: (values: UpdateStoreChildPayload) => void;
  hasPermission: boolean;
};

export const DetailChildRow: FC<Props> = ({
  parent,
  rowData,
  collapsed,
  index,
  hasPermission,
  onUpdatedStoreChild,
}) => {
  // const { user } = useAuth();
  // const [keywordWoods, setKeywordWoods] = useState('');
  const [keywordAccount, setKeywordAccount] = useState('');
  const [keywordWork, setKeywordWork] = useState('');
  const [keywordDoctype, setKeywordDoctype] = useState('');
  const [contactKeyword, setContactKeyword] = useState("");
  const [fundaKeyword, setFundaKeyword] = useState("");

  // const {
  //   list: listGoods
  // } = useGoods({
  //     params: { 
  //         keyword: keywordWoods 
  //     },
  //     isFetchList: true
  // })

  const { listBudgetWork } = useQueryListBudgetWork({
		limit: LIMIT_DROPDOWN,
		keyword: keywordWork,
	});

  const { listAccount } = useQueryListAccount({
		limit: LIMIT_DROPDOWN,
		keyword: keywordAccount,
    type: 2,
    status: 1,
	});

	const { list: listSubType } = useDoctype({
		params: {
			limit: LIMIT_DROPDOWN,
			type: 23,
			keyword: keywordDoctype
		 },
		isFetchList: true
	})

  const {
      list: listFundas,
  } = useFunda({
      params: { 
        keyword: fundaKeyword
      },
      isFetchList: true
  });

  const { listContact } = useQueryListContact({
    limit: LIMIT_DROPDOWN,
    keyword: contactKeyword,
  })

  const handleClickUpdateStore = React.useCallback(
    (value) => {
      // if(!hasPermission) {
      //   return toast.warn('Bạn không có quyền cập nhật nội dung này')
      // }
      onUpdatedStoreChild({
        ...rowData,
        ...value,
      });
    },
    [onUpdatedStoreChild, rowData, hasPermission]
  );

  return (
    <div
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
      className={"transition duration-300 ease-in-out child-row table-row "}
      data-row-index={rowData._id}
    >
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 px-[16px] py-[9px]"}
        >
          {index + 1}
        </p>
      </div>

      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
        style={{width: "25%"}}
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateStore({
              ...rowData,
              name: value,
            });
          }}
        >
          {rowData.name}
        </p>
        <p className="text-gray-400 px-2"><i>{rowData?.userUpdate?.fullname ? rowData?.userUpdate?.fullname : rowData?.userCreate?.fullname}</i></p>
        <p className="text-gray-400 px-2"><i>{moment(rowData?.modifyAt).format("DD/MM/YYYY HH:mm")}</i></p>
      </div>
      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 -mb-1 outline-none "}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Tài khoản tiền mặt/ngân hàng"
          renderSelectedItem={(item) => (
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "100%",
                minWidth: "100px",
                // width: "150px",
                // whiteSpace: "nowrap",
                // width: "125px",
                whiteSpace: "normal",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          data={listAccount}
          initialValue={rowData?.account}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (value) => setKeywordAccount(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateStore({
              ...rowData,
              accountID: value.id,
            })
          }
        />
      </div>

      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateStore({
              ...rowData,
              unitPrice: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.unitPrice)}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white hidden"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
        >
          {convertCurrency(rowData.amount)}
        </p>
      </div>

      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
        }
        style={{width: "15%"}}
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 px-[16px] py-[9px]"}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateStore({
              ...rowData,
              note: value,
            });
          }}
        >
          {rowData.note}
        </p>
      </div>

      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 -mb-1 outline-none "}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Khoản mục phí"
          renderSelectedItem={(item) => (
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "100%",
                minWidth: "100px",
                // width: "150px",
                // whiteSpace: "nowrap",
                // width: "125px",
                whiteSpace: "normal",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          data={listSubType}
          initialValue={rowData?.subtype}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (value) => setKeywordDoctype(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateStore({
              ...rowData,
              subtypeID: value.id,
            })
          }
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white hidden"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateStore({
              ...rowData,
              quantity: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.quantity)}
        </p>
      </div>

      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 -mb-1 outline-none "}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Cơ sở"
          renderSelectedItem={(item) => (
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "100%",
                minWidth: "100px",
                // width: "150px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          data={listFundas}
          initialValue={rowData?.funda}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (value) => setFundaKeyword(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateStore({
              ...rowData,
              fundaID: value.id,
            })
          }
        />
      </div>

      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 -mb-1 outline-none "}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Mã khách"
          renderSelectedItem={(item) => (
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "100%",
                minWidth: "100px",
                // width: "150px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          data={listContact}
          initialValue={rowData?.customer}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (value) => setContactKeyword(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateStore({
              ...rowData,
              customerID: value.id,
            })
          }
        />
      </div>
      
      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 -mb-1 outline-none "}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Ngân sách"
          renderSelectedItem={(item) => (
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "100%",
                minWidth: "100px",
                // width: "125px",
                whiteSpace: "normal",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          initialValue={rowData?.budgetWork}
          data={listBudgetWork}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (value) => setKeywordWork(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateStore({
              ...rowData,
              workID: value.id,
            })
          }
        />
      </div>

      {/* <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 -mb-1 outline-none "}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Tài khoản đối ứng"
          renderSelectedItem={(item) => (
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "100%",
                minWidth: "100px",
                // width: "150px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          data={listAccount}
          initialValue={rowData?.contra}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (value) => setKeywordAccount(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateStore({
              ...rowData,
              contraID: value.id,
            })
          }
        />
      </div> */}
    </div>
  )
}