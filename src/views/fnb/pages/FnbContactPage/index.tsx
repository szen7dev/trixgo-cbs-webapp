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
import { useFnbCustomerCare } from "services/hooks/fnb/useFnbCustomerCare";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

export const FnbContactPage: FC = () => {
    const STATUS = [
        { _id: 1, text: 'Đang xử lý' },
        { _id: 2, text: 'Hoàn thành'}
    ]

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
    const [status, setStatus] = useState<string | null>();

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
        customerCareID: '',
        mistake: '',
        customer: '',
        order: '',
        name: '',
        description: '',
        note: '',
        rating: 1,
        amount: 0,
        status: 1,
    })

    const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useFnbCustomerCare({
        params: { 
            keyword, 
            status,
            customerID,
            userCreateID: userID
        },
        isFetchList: true
    })
    // console.log(listDataWithPager)

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            customerCareID: '',
            name: '',
            description: '',
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
            const { _id, mistake, customer, order, name, description, note, amount, rating, status } = newListIDChecked[0];
            setInitialValues({
                customerCareID: _id,
                mistake,
                customer,
                order,
                name,
                description,
                note,
                rating,
                amount,
                status,
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
                customerCareID: '',
                mistake: '',
                customer: '',
                order: '',
                name: '',
                description: '',
                note: '',
                rating: 1,
                amount: 0,
                status: 1,
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[400px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "750px",
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
    const { exportExcelAsync } = useFnbCustomerCare({});

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
                        placeholder={"Khách hàng"}
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
                        placeholder={"Người chăm sóc"}
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

                    <DropdownSearchableV2
                        ref={accountRef}
                        className={"mr-1 border border-primary-border rounded-lg"}
                        placeholder={"Trạng thái"}
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        data={STATUS}
                        formatItem={{
                            id: "_id",
                            text: "text",
                        }}
                        onSearchInputChange={debounce(
                            (valueSearch) => setUserKeyword(valueSearch),
                            500
                        )}
                        onClearData={() => {
                            setStatus("");
                        }}
                        onchangeValue={item => {
                            setStatus(item._id);
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />

                      {/* <button className={"flex items-center justify-center mx-3 ml-3"}
                              onClick={handleExportExcel}
                          >
                              Tải Excel
                      </button> */}

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
                      <th className="py-1 w-1/12">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Ngày
                          </div>
                      </th>
                      <th className="py-1 w-1/6">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Nội dung
                          </div>
                      </th>
                      <th className="py-1 w-1/6">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Khách hàng
                          </div>
                      </th>
                      <th className="py-1 w-1/6">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Phân loại lỗi
                          </div>
                      </th>
                      <th className="py-1 w-1/6">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Đơn hàng
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Đánh giá 1-5*
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
                        let cl = 'red'
                        if(item.status == 2){
                            cl = 'green'
                        }
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
                                <p><i>{moment(item.createAt).format('DD/MM/YYYY')}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item?.name}
                            </td>
                            <td className="py-1 px-2">
                                {item?.customer?.name} - {item?.customer?.phone}
                            </td>
                            <td className="py-1 px-2 text-cbs-highlight-color">
                                {item?.mistake?.name}
                            </td>
                            <td className="py-1 px-2">
                                {item?.order?.name}
                                <p><i>{item?.funda?.name}</i></p>
                                <p className="text-cbs-highlight-color"><i>{item?.manager ? `Quản lý: ${item?.manager?.fullname}` : ''}</i></p>
                                <p><i>{item?.order ? moment(item?.order?.createAt).format('DD/MM/YYYY') : ''}</i></p>
                            </td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.rating)}
                            </td>
                            <td className="py-1 px-2">
                                {item.note}
                            </td>
                            <td className="py-1 px-2" style={{color: cl}}>
                                {(item.status == 1 ? "Đang xử lý" : "Hoàn thành")}
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