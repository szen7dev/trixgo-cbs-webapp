import React, { FC, useState, useCallback, useEffect, ChangeEvent } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
// import { read, utils } from 'xlsx';
// import { formatNumberMoney } from "utils/cmcs";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import iconPencil from 'assets/images/icons8-pencil-96 1.png';
import CameraIcon from "assets/images/camera-icon.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateCC } from "./components/ModalCreateOrUpdateCC";
import { ModalZoomView } from "shareComponents/common";

/*=====5.TYPINGS=====*/
import { Storage } from "typings/items";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { DropdownSearchableV2 } from "shareComponents/common";
import { ImageProps } from "typings/common";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { FilterDateGroup }  from "views/accounting/shareComponents/common";
import { useAuth } from "services/hooks/auth/useAuth";
import { useUpload } from "services/hooks/useUpload";
import { APP_ID } from "apis/localdb";
import API from "apis/repository";
import { useQueryListDoctype } from "services/hooks/useHuman";

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";
import { validateFiles } from 'validation/file';
import { useFnbAffiliateSignup, useCustomerCareByProperty } from "services/hooks/fnb/useFnbAffiliateSignup";

const BACKGROUND = [
	{ value: 1, color: "bg-red-400", color2: "F11F20" },
	{ value: 2, color: "bg-yellow-300", color2: "fa6b07" },
	{ value: 3, color: "bg-green-400", color2: "C55B11" },
	{ value: 4, color: "bg-blue-400", color2: "00AF50" },
	{ value: 5, color: "bg-purple-400", color2: "169150" },
	{ value: 6, color: "bg-pink-600", color2: "1F4E78" },
	{ value: 7, color: "bg-gray-600", color2: "262626" },
	{ value: 8, color: "bg-teal-400", color2: "262626" },
	{ value: 9, color: "bg-teal-400", color2: "262626" },
	{ value: 10, color: "bg-teal-400", color2: "262626" },
	{ value: 11, color: "bg-teal-400", color2: "262626" },
	{ value: 12, color: "bg-teal-400", color2: "262626" },
	{ value: 13, color: "bg-teal-400", color2: "262626" },
	{ value: 14, color: "bg-teal-400", color2: "262626" },
	{ value: 15, color: "bg-teal-400", color2: "262626" },
]

export const CrmAffiliatePage: FC = () => {
    const { user } = useAuth();
    const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

	const [defaultState, setDefaultState] = useState({
	    mediaID: '',
	    images: [] as ImageProps[],
	    index: 0,
	    createAt: ""
  	});

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { addFileToUpload } = useUpload({
		appID: APP_ID.FNB.id,
		companyID: user?.company?._id,
	})

    // const STATUS = [
    //     { _id: 1, text: 'Chưa, đang xử lý' },
    //     { _id: 2, text: 'Hoàn thành'}
    // ]

    // const TYPE = [
    //     { _id: 1, text: 'Lỗi của nhân viên' },
    //     { _id: 2, text: 'Lỗi khách quan'}
    // ]

    const CHANNEL = [
        { _id: 1, text: 'Offline' },
        { _id: 2, text: 'Grab Food'},
        { _id: 3, text: 'Shopee Food'},
        { _id: 4, text: 'Gojek'},
        { _id: 5, text: 'Baemin'},
        { _id: 6, text: 'Loship'},
        { _id: 7, text: 'Bee'},
        { _id: 8, text: 'TikTok'},
        { _id: 9, text: 'Shopee'},
        { _id: 10, text: 'Lazada'},
        { _id: 11, text: 'Reels'},
    ]

    const [pageIndex, setPageIndex] = useState(0)
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const accountRef = React.useRef<DropdownHandle>(null);

    const [journeyID, setJourneyID] = useState<string | null>();
    const [customerID, setCustomerID] = useState<string | null>();
    const [userID, setUserID] = useState<string | null>();
    const [managerID, setManagerID] = useState<string | null>();
    const [status, setStatus] = useState<string | null>();
    const [type, setType] = useState<string | null>();
    const [channel, setChannel] = useState<string | null>();

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

    const [searchDoctypeKeyword, setSearchDoctypeKeyword] = useState("");
	const { listDoctypes } = useQueryListDoctype({
		limit: 10,
		type: 11,
		keyword: searchDoctypeKeyword,
	});
  
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
        journey: '',
        name: '',
        description: '',
        note: '',
        rating: 1,
        amount: 0,
        status: 1,
        type: 1,
    })

    const { listCustomerCareByProperty, refetchListCustomerCareByProperty } = useCustomerCareByProperty({
        params: {
            option: 5,
            fromDate: inputFilter.fromDate,
            toDate: inputFilter.toDate,
        },
        isFetchList: true
    })

    const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useFnbAffiliateSignup({
        params: { 
            option: 1,
            keyword, 
            status,
            type,
            channel,
            journeyID,
            customerID,
            userCreateID: userID,
            managerID,
            fromDate: inputFilter.fromDate,
            toDate: inputFilter.toDate,
            limit: 20,
            populates: JSON.stringify({
                path: 'userCreate userUpdate customer mistake journey funda order manager images',
                select: '_id image name sign phone taxid address fullname createAt author path',
                populate: {
					path: 'author',
					select: 'fullname bizfullname image'
				}
            }),
        },
        isFetchList: true
    })

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
    const handleConfirmCreateOrUpdate = () => {
        refetch()
        refetchListCustomerCareByProperty()
    }

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
            const { _id, mistake, customer, order, journey, name, description, note, amount, rating, status, type } = newListIDChecked[0];
            // console.log({ _id, mistake, customer, order, journey, name, description, note, amount, rating, status, type })
            setInitialValues({
                customerCareID: _id,
                mistake,
                customer,
                order,
                journey,
                name,
                description,
                note,
                rating,
                amount,
                status,
                type,
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
                journey: '',
                name: '',
                description: '',
                note: '',
                rating: 1,
                amount: 0,
                status: 1,
                type: 1,
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[400px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "500px",
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
    const { exportExcelAsync } = useFnbAffiliateSignup({});

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

    const handleOnChangeDate = useCallback((date, input) => {
        if (input) {
          setInputFilter((value) => ({ ...value, toDate: date }))
        } else {
          setInputFilter((value) => ({ ...value, fromDate: date }))
        }
        }, [])
      
    const handleUploadAttach = async (filesSelected: FileList | null, customerCareID: string) => {
        if (!filesSelected || !filesSelected.length) return;

        const validation = await validateFiles(filesSelected);
        if (validation.error) return toast.warn(validation.message);

        // Clear input file
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        const imagesID: any = [];

        // Upload images
        for (const [_, file] of Object.entries(filesSelected)) {
            const { _id } = await addFileToUpload({
                files: file as any,
                fileType: 1,
                progress: percentCompleted => {
                    console.info(`${percentCompleted}%`)
                }
            })
            _id && imagesID.push(_id);
        }
        // console.log(imagesID)

        // Update image to customer_cares
        await API.put(
            `/api/fnb/affiliate_signups`,
            {
                customerCareID,
                imagesID,
            }
        );
        refetch();
    }

    return (
        <main className="relative h-full">
            <div className="flex flex-wrap mb-1">
                { 
                    listCustomerCareByProperty?.map((item: any, index: any) => {
                        const color = `cursor-pointer max-w-sm rounded overflow-hidden shadow-lg mb-2 mr-1`
                        const color2 = `#${BACKGROUND[index].color2}`

                        return (
                            <div key={index} className={color} style={{background: color2}}>
                                {/* <img className="w-full" src="/path/to/your/image" alt="Step 1"/> */}
                                <div className="px-2 py-1">
                                    <div className="font-bold text-sm mb-1 text-white">{item._id.journey.name} ({item.quantity})</div>
                                    <p className="text-white text-x-small">
                                    {item._id.journey.name}
                                    </p>
                                </div>
                            </div>
                        ) 
                    })
                }
            </div>

            <header className="sticky top-0 bg-primary-light z-10">
              <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                  <div className="flex items-center">
                    <SearchInput
                        classNameWrapper="mr-2"
                        classNameInput="outline-none w-[150px]"
                        onChange={onChangeSearch}
                    />
                    <DropdownSearchableV2
                        ref={accountRef}
                        className={"mr-1 border border-primary-border rounded-lg"}
                        placeholder={"Hành trình"}
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        data={listDoctypes}
                        formatItem={{
                            id: "_id",
                            text: "name",
                        }}
                        onSearchInputChange={debounce(
                            (valueSearch) => setSearchDoctypeKeyword(valueSearch),
                            500
                        )}
                        onClearData={() => {
                            setJourneyID("");
                        }}
                        onchangeValue={item => {
                            setJourneyID(item._id);
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
                        placeholder={"Khách"}
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
                        placeholder={"Tạo"}
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
                    <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />

                      <button className={"flex items-center justify-center mx-3 ml-3 mr-10"}
                              onClick={handleExportExcel}
                          >
                              Tải báo cáo Excel
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
                              className="flex items-center justify-center text-primary-light bg-cbs-green w-[70px] h-8 rounded font-bold"
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
                      <th className="py-1 w-[90px]">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Ngày
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Khách hàng
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Hành trình trải nghiệm
                          </div>
                      </th>
                      <th className="py-1 w-1/6">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Nội dung
                          </div>
                      </th>
                      <th className="py-1 w-1/6">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Đơn hàng
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Ghi chú
                          </div>
                      </th>
                      <th className="py-1">
                          <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Đính kèm
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
                                {moment(item.createAt).format('DD/MM/YYYY')}
                                <p><i>{moment(item.createAt).format('HH:mm')}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item?.customer?.name} - {item?.customer?.phone}
                            </td>
                            <td className="py-1 px-2 text-cbs-highlight-color">
                                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border text-white bg-cbs-secondary text-left">{item?.journey?.name}</button>
                            </td>
                            <td className="py-1 px-2">
                                {item?.name}
                                <p className="text-primary-gray"><i>{item?.userCreate ? `Tạo: ${item?.userCreate?.fullname}` : ''}</i></p>
                                <p className="text-primary-gray"><i>{item?.userUpdate ? `Cập nhật: ${item?.userUpdate?.fullname}` : ''}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item?.order ? `${item?.order?.name} - Thời gian: ${moment(item?.order?.createAt).format('DD/MM/YYYY HH:mm')}` : ''}
                                {
                                    (item?.channel && Number(item?.channel ) >= 1) ?
                                    <div className="py-1 px-1 text-cbs-primary">
                                        Kênh: {CHANNEL[Number(item?.channel) - 1]?.text}
                                    </div>
                                    : <></>
                                }
                                <p><i>{item?.funda?.name}</i></p>
                                <p className="text-cbs-highlight-color"><i>{item?.manager ? `Quản lý: ${item?.manager?.fullname}` : ''}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item.note}
                            </td>
                            <td className="py-1 px-2">
                                {/* {
                                    item?.status == 1 ?
                                    <div className="w-[110px] rounded-md py-1 px-2 bg-cbs-schedule-expired text-white" style={{ fontSize: "12px" }}>
                                        {STATUS[Number(item?.status) - 1]?.text}
                                    </div>
                                    :
                                    <div className="w-[85px] rounded-md py-1 px-2 bg-cbs-schedule-after-7days text-white" style={{ fontSize: "12px" }}>
                                        {STATUS[Number(item?.status) - 1]?.text}
                                    </div>
                                } */}
                                <div style={{display: "flex"}}>
									{item?.images?.map((image: any, i: number) => {
										return (
											<div
												key={image._id}
												className="mt-2 cursor-pointer relative w-[75px] h-[75px]"
												onClick={() => {
													setDefaultState({
														mediaID: image._id,
														images: item?.images,
														index: i,
														createAt: image.createAt
													});
													setIsShowImageFullScreen(true);
												}}
											>
												<img className="w-[75px] h-[75px]" src={`${process.env.REACT_APP_URL_S3}${image?.path}`} />
											</div>
										)
									})}

									<label className="ml-2">
										<div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
											<img
											src={CameraIcon}
											alt="Camera"
											className="w-[15px] h-[13px]"
											/>
											<input 
												type="file" 
												className="hidden" 
												accept="image/*"
												onChange={(e: ChangeEvent<HTMLInputElement>) => handleUploadAttach(e.target.files, item._id)}
											/>
										</div>
									</label>
								</div>
                            </td>
                        </tr>
                      )
                    })
                  }
              </tbody>
          </table>
          <ModalZoomView
		        isShow={isShowImageFullScreen}
		        toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
		        initialData={defaultState}
		    />
        </main>
    )
}