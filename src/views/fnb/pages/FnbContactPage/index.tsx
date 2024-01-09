/*=====1.LIBRARY=====*/
import React, { FC, useState, useCallback, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import { read, utils } from 'xlsx';
import { formatNumberMoney } from "utils/cmcs";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateCC } from "./components/ModalCreateOrUpdateCC"

/*=====5.TYPINGS=====*/
import { Storage } from "typings/items";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { DropdownSearchableV2 } from "shareComponents/common";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCashPayment } from "services/hooks/financial/useCashPayment";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

export const FnbContactPage: FC = () => {
    const [showOption, setShowOption] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const history = useHistory();
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const accountRef = React.useRef<DropdownHandle>(null);

    const [customerID, setCustomerID] = useState<string | null>();
    const [userID, setUserID] = useState<string | null>();

    const [inputFilter, setInputFilter] = useState({
      keyword: '',
      fromDate: new Date(new Date().getFullYear(), 0, 1),
      toDate: new Date(new Date().getFullYear(), 11, 31)
    });  

    const [contactKeyword, setContactKeyword] = useState("");
    const [userKeyword, setUserKeyword] = useState("");  

    const { list: listCustomer } = useContact({
      params: { keyword: contactKeyword, limit: 10 },
      isFetchList: true
    })
  
    const { data: listUser } = useUserSystem({
      keyword: userKeyword,
      limit: 10,
      isFetch: true
    }, true)

    const [itemsChecked, setItemsChecked] = useState<Array<any>>([]);
    const [initialValues, setInitialValues] = useState({
      cashPaymentID: '',
      customer: '',
      name: '',
      note: '',
      amount: 0,
      payment: 0,
      active: 1,
    })

    const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useCashPayment({
        params: { 
            keyword, 
            customerID,
            userCreateID: userID,
        },
        isFetchList: true
    })
    // console.log(listPayment)

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            cashPaymentID: '',
            name: '',
            note: '',
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Làm việc với update mẩu tin
    const onClickCheckButton = (doc: Storage.Storage) => {
        const check = itemsChecked.find(item => item._id === doc._id);
        let newListIDChecked = [];

        if (check) {
            newListIDChecked = itemsChecked.filter(item => item._id !== doc._id)
            setItemsChecked(newListIDChecked);
        } else {
            newListIDChecked = [...itemsChecked, doc];
            setItemsChecked(newListIDChecked);
        };

        if (newListIDChecked.length === 1) {
            const { _id, name, note, amount, payment, active, customer } = newListIDChecked[0];
            setInitialValues({
                cashPaymentID: _id,
                name,
                note,
                amount,
                payment,
                active,
                customer,
            });
        } else {
            clearData();
        }
    };

    // Check chọn 1 hoặc nhiều mẩu tin
    const getStateChecked = useCallback((id: string) => {
        const user = itemsChecked.find(item => item._id === id);
        return user ? true : false;
    }, [itemsChecked]);

    const getStateCheckedAll = useCallback(() => {
        return itemsChecked.length == listDataWithPager.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listDataWithPager.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listDataWithPager);
        }
    }

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {

        let initValues: any = {...initialValues};
        setItemsChecked([]);

        // Mở modal tạo mới
        if(modalType === 'create') {
            clearData();
            initValues = {
                cashPaymentID: '',
                customer: '',
                name: '',
                note: '',
                amount: 0,
                payment: 0,
                active: 1,
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[400px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "550px",
                }}
            >
                <ModalCreateOrUpdateCC
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    //_____Import, export excel
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    const { exportExcelAsync } = useCashPayment({});

    const handleExportExcel = async () => {
		try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportExcelAsync({
                customerID,
                userCreateID: userID,
            });

            if(error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
        }
	}

    return (
      <main className="relative h-full">
          <header className="sticky top-0 bg-primary-light z-10">
              <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                  <div className="flex items-center">
                      <p className="text-lg ml-2">Danh sách</p>

                      <SearchInput
                          classNameWrapper="ml-4 mr-2 border border-primary-border"
                          classNameInput="outline-none w-[296px]"
                          onChange={onChangeSearch}
                      />

                      <DropdownSearchableV2
                        ref={accountRef}
                        className={"mr-1 border border-primary-border rounded-lg"}
                        placeholder={"Mã khách"}
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        data={listCustomer}
                        formatItem={{
                            id: "_id",
                            text: "name",
                        }}
                        onSearchInputChange={debounce(
                            (valueSearch) => setContactKeyword(valueSearch),
                            500
                        )}
                        onClearData={() => {
                          setCustomerID("");
                        }}
                        onchangeValue={item => {
                            setCustomerID(item._id);
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <DropdownSearchableV2
                        ref={accountRef}
                        className={"mr-1 border border-primary-border rounded-lg"}
                        placeholder={"Người tạo"}
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        data={listUser}
                        formatItem={{
                            id: "_id",
                            text: "fullname",
                        }}
                        onSearchInputChange={debounce(
                            (valueSearch) => setUserKeyword(valueSearch),
                            500
                        )}
                        onClearData={() => {
                          setUserID("");
                        }}
                        onchangeValue={item => {
                            setUserID(item._id);
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />

                      <button className={"flex items-center justify-center mx-3 ml-3"}
                              onClick={handleExportExcel}
                          >
                              Tải Excel
                      </button>

                      {/* Nếu chọn 1 phẩn tử => chỉ cho update */}
                      {itemsChecked.length === 1 ? (
                          <button
                              className="mr-3"
                              onClick={() => handleOpenModalCreateOrUpdate('update')}
                          >
                              <img src={iconPencil} alt="icon pencil" />
                          </button>
                      ) : ''}

                      <div className="flex items-center">
                          <button
                              className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
                              onClick={() => handleOpenModalCreateOrUpdate('create')}
                              >
                              Tạo mới
                          </button>
                          {/* <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
                              <img src={`${process.env.PUBLIC_URL}/images/common/icon-3dots-vertical-gray.svg`} alt="Three Dot" />
                          </div> */}
                      </div>

                      <div className="absolute right-0">
                        <PaginateV2
                            ref={ref}
                            totalRecord={totalRecord}
                            totalPages={totalPage}
                            limit={20}
                            hasNextPage={hasNextPage}
                            isFetching={isLoading}
                            nextPageAction={() => {
                              fetchNextPage();
                                setPageIndex(oldState => oldState+1)
                            }}
                            prevPageAction={() => {
                                setPageIndex(oldState => oldState-1)
                            }}
                        />
                      </div>
                  </div>
              </div>
          </header>

          <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
              <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                  <tr className="text-left text-sm">
                      <th className={cn("py-1 text-center", styles.theadInput)}>
                          <div className="border-r-2 border-gray-300 flex items-center justify-center">
                              <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultChecked={getStateCheckedAll()}
                                  onClick={onClickCheckAll}
                              />
                          </div>
                      </th>
                      <th className="w-1/6 py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Ngày thanh toán
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Mã khách
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Nội dung
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Giá trị thanh toán
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                            Giá trị sử dụng
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Ghi chú
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Trạng thái
                          </div>
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  (listDataWithPager[pageIndex] ?? []).map((item: any, index: any) => {  
                      return (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                />
                            </td>
                            <td className="py-1 px-2">
                                <p><i>{moment(item.date).format('DD/MM/YYYY')}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item?.customer?.name} - {item?.customer?.phone}
                            </td>
                            <td className="py-1 px-2">
                                {item?.name}
                                <p><i>{item.modifyAt ? moment(item.modifyAt).format('DD/MM/YYYY HH:mm') : ''} - {item?.userUpdate?.fullname}</i></p>
                            </td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.payment)}
                            </td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.amount)}
                            </td>
                            <td className="py-1 px-2">
                                {item.note}
                            </td>
                            <td className="py-1 px-2">
                                {(item.active == 1 ? "Hoạt động" : "Hủy")}
                            </td>
                        </tr>
                      )
                    })
                  }
              </tbody>
          </table>
      </main>
  )
}