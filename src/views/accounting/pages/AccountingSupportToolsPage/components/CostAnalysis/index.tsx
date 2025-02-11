import React, { FC, useState, useCallback, useEffect } from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { FilterDateGroup } from "views/accounting/shareComponents/common";
import { debounce } from "lodash";
import { DropdownSearchableV2, Loader } from "shareComponents/common";
import { useFunda } from "services/hooks/items/useFunda";
import { useJournal } from "services/hooks/accounting/useGeneralJournal";
import { useQueryListAccount } from "services/hooks/cmcs/useContractIncome";
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from "services/hooks/auth/useAuth";

type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;

const CostAnalysis: FC = () => {
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaID, setFundaID] = useState<string | null>();
  const [fundaKeyword, setFundaKeyword] = useState("");

  const [accountID, setAccountID] = useState<string | null>();
  const [searchAccount, setSearchAccount] = useState();
  const [vouchers, setVouchers] = useState<any>([]);

  const [inputFilter, setInputFilter] = useState({
    keyword: "",
    fromDate: new Date(new Date().getFullYear(), 0, 1),
    toDate: new Date(new Date().getFullYear(), 11, 31)
  });

  const { current: socket }: any = useSocket();
  const { user } = useAuth();

  const { list: listFunda } = useFunda({
    params: { keyword: fundaKeyword },
    isFetchList: true,
  });

  const { listAccount } = useQueryListAccount({
    limit: 10,
    keyword: searchAccount,
    arrNames: ['152','156'],
  });

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }));
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }));
    }
  }, []);

  const [stateAction, setStateAction] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });
  const { analysePrimeCostAsync } = useJournal({});

  const handleAnalysePrimeCost = async () => {
    try {
      setStateAction({ isExporting: true });
      const { error, data } = await analysePrimeCostAsync({
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        fundaID: fundaID,
        accountID: accountID,
      });

      if (error) {
        return toast.warn(data?.message);
      }

      setVouchers(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStateAction({ isExporting: false });
    }
  };

  const renderStatusVoucher = (voucher: any) => {
    switch (voucher.status) {
      case "success":
        return (
          <span className="bg-green-100 text-green-500 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            Done
          </span>
        );
      case "error":
        return (
          <span className="bg-red-100 text-red-500 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
            Error
          </span>
        );
      default:
        return (
          <span className="bg-gray-200 text-gray-500 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 primary-gray">
            Waiting
          </span>
        )
    }
  }

  const handleSocketsUpdateStatusAnalyseCost = (data: any) => {
    if(user?._id !== data?.receiverID) return;

    setVouchers((vouchers: any) => {
      const newVouchers = vouchers.map((voucher: any) => {
        if (voucher._id === data?.voucher?._id) {
          return {
            ...voucher,
            status: "success"
          }
        }

        return voucher
      });

      return newVouchers
    })
  }

  useEffect(() => {
    if(!socket) return;

    socket.on("ACCOUNTING_SSC_STATUS_UPDATE_COST_ANALYSIS", handleSocketsUpdateStatusAnalyseCost);

    return () => {
      socket.off("ACCOUNTING_SSC_STATUS_UPDATE_COST_ANALYSIS", handleSocketsUpdateStatusAnalyseCost);
    }
  }, [socket])

  if (stateAction.isExporting) {
    return <Loader className="border-primary" />;
  }

  return (
    <main className="h-full p-4">
      <section className="px-8 py-6 bg-primary-light flex items-center">
        <p className="text-lg font-bold text-primary-gray mr-5">
          Phân tích giá vốn xuất kho
        </p>
        <DropdownSearchableV2
          ref={accountRef}
          className={"mr-1 border border-primary-border rounded-lg"}
          placeholder={"Đơn vị cơ sở"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={listFunda}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (valueSearch) => setFundaKeyword(valueSearch),
            500
          )}
          onClearData={() => {
            setFundaID("");
          }}
          onchangeValue={(item) => {
            setFundaID(item._id);
          }}
          renderItem={(item) => <p className={"min-w-[300px]"}>{item.text}</p>}
          selectOneByOne={true}
        />
        <DropdownSearchableV2
          ref={accountRef}
          className={"mr-1 border border-primary-border rounded-lg"}
          placeholder={"Tài khoản"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={listAccount}
          formatItem={{
            id: "_id",
            text: "name",
            description: "description",
          }}
          onSearchInputChange={debounce(
            (valueSearch) => setSearchAccount(valueSearch),
            500
          )}
          onClearData={() => {
            setAccountID("");
          }}
          onchangeValue={(item) => {
            setAccountID(item._id);
          }}
          renderItem={(item) => (
            <p className={"min-w-[300px]"}>
              {item.text}-{item.description}
            </p>
          )}
          selectOneByOne={true}
        />
        <div className="flex items-center">
          <FilterDateGroup
            fromDate={inputFilter.fromDate}
            endDate={inputFilter.toDate}
            onChangeDate={handleOnChangeDate}
          />
        </div>
        <button
          className="bg-primary text-[15px] rounded w-[90px] h-[32px] text-primary-light hover:opacity-90"
          onClick={handleAnalysePrimeCost}
        >
          Cập nhật
        </button>
      </section>

      <section className="bg-primary-light mt-4 h-screen">
        <div className="flex items-center justify-between px-6 h-[53px]">
          <h2 className="text-lg">
            Kiểm tra hàng hóa xuất âm kho khi chạy giá vốn
          </h2>
          {/* <div className="h-10 w-10 rounded-full bg-cbs-table-header flex items-center justify-center">
            <img src={ThreeDotsVertical} alt="Three Dots" />
          </div> */}
        </div>

        <table className="table-fixed border-collapse w-full border-0.5 border-primary-border">
          <thead className="h-10 bg-cbs-table-header">
            <tr>
              <th className="py-2 font-normal text-primary-gray w-[70px] bg-cbs-table-header">
                <p>Hàng hóa/Nguyên vật liệu số liệu Xuất</p>
              </th>
              <th className="py-2 font-normal text-primary-gray w-[70px] bg-cbs-table-header">
                <p className="border-r-2 border-primary-border font-normal">
                  Ngày tháng
                </p>
              </th>
              <th className="w-1/6 pl-2">
                <p className="font-normal">Trạng thái</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!vouchers?.length &&
              vouchers.map((voucher: any) => (
                <tr
                  key={voucher._id}
                  className="border-b border-primary-border h-11 text-center"
                >
                  <td className="py-2 border-b-0.5 border-primary-border align-middle">
                    {voucher.name}
                  </td>
                  <td className="py-2 border-b-0.5 border-primary-border align-middle">
                    {moment(voucher.date).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 border-b-0.5 border-primary-border align-middle">
                    {renderStatusVoucher(voucher)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default CostAnalysis
