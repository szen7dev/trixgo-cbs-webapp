import React, { FC, useState, useEffect, ChangeEvent, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { DropdownSearchableV2, Loader } from "shareComponents/common";

// ========== Utils ========== //
import { GENDER_TYPES, CONTACT_STATUS2 } from 'apis/localdb';
// import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setFilterDropdown } from "redux/reducer/DocumentProjectSlice";
import iconPlus from "assets/images/icons8-plus-math-96 3.svg";
import { useModal } from "services/hooks/useModal";
import { useUpload } from 'services/hooks/useUpload';
import CameraIcon from "assets/images/camera-icon.svg";

// ========== Hooks ========== //
import { useHumanCustom, useListHuman } from "services/hooks/human/useHuman";
import { useContact } from "services/hooks/items/useContact";
import { useProjectCustom } from "services/hooks/items/useProject";
import { ModalCreateOrUpdateCustomer } from 'views/item/shareComponents/common';
import { useCustomer } from "services/hooks/items/useCustomer";

interface HumanHomePageProps {
    type?: number
}

type PaginateHandle = React.ElementRef<typeof PaginateV2>;
type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
// type TimeRangeHandle = React.ElementRef<typeof TimeRangeDropdown>;

export const CrmCustomerPage: FC<HumanHomePageProps> = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const { openModal } = useModal()
    const { updateAsync } = useCustomer({})

    const initialValues = {
        contactID: '',
        type: '',
        name: '',
        address: '',
        note: '',
        taxid: '',
        phone: '',
        description: '',
        funda: '',
        gender: 1,
        birthday: ''
    }

    const ref = useRef<PaginateHandle>(null);
    const datahubRef = useRef<DropdownHandle>(null);
    const typeRef = useRef<DropdownHandle>(null);

    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        document.title = `Trixgo | CRM`;
    });

    const location = useLocation()

    const [genders, setGenders] = useState<string[]>([]);
    const [statuss, setStatuss] = useState<string[]>([]);

    const [projectKeyword, setProjectKeyword] = useState("");
    const [contactKeyword, setContactKeyword] = useState("");
    const [supportsID, setSupportsID] = useState<string[]>([]);
    const [departmentsID, setDepartmentsID] = useState<string[]>([]);

    const { listProjectsUserIsMember } = useProjectCustom({
        paramsProjectsUserIsMember: { keyword: projectKeyword },
        isFetchProjectsUserIsMember: true
    });

    const { list: listCustomer } = useContact({
        params: { keyword: contactKeyword, limit: 20 },
        isFetchList: true
    })

    const { listHumanWithPager, isLoading, isFetching, totalRecord, totalPage, fetchNextPageHuman, hasNextPage, lastestIDs, refetchListHuman } = useListHuman({
        params: {
            // ...fromToDate,
            limit: 10,
            genders,
            statuss,
            departmentsID,
            supportsID,
            keyword,
        },
        isFetchList: true
    })

    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }, 500)

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {

        let initValues: any = { ...initialValues };

        // Mở modal tạo mới
        if (modalType === 'create') {
            initValues = {
                contactID: '',
                type: '',
                name: '',
                address: '',
                taxid: '',
                phone: '',
                description: '',
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[620px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "720px",
                }}
            >
                <ModalCreateOrUpdateCustomer
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    const handleConfirmCreateOrUpdate = () => refetchListHuman();

    const { addFileToUpload } = useUpload({
        typeUpload: 'contact'
    })

    const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>, param: any) => {
        const files = event.target.files;
        if(!files || !files.length) return toast.warning("Vui lòng chọn ảnh đại diện");

        const { name } = await addFileToUpload({
            files: files[0] as any,
            fileType: 1,
            useCompress: true
        })

        if(name){
            const { error, message, data } = await updateAsync({
                image: name, 
                contactID: param
            })
            if (error) {
                if(data.message){
                return toast.error(data.message)
                }
                return toast.error(message)
            }
            refetchListHuman()
            toast.success('Cập nhật thành công', { autoClose: 1500 })
        }
    }

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
           <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-2 py-1"}>
                    <div className={"flex items-center flex-1"}>
                        <div className="relative flex items-center">
                            <input
                            placeholder="Tìm kiếm"
                            className="pl-3 pr-3 mr-1 w-[175px] h-[32px] bg-cbs-table-header border border-primary-border rounded-lg mb-2"
                            onChange={onChangeSearch}
                            />
                        </div>

                        <DropdownSearchableV2
                            ref={datahubRef}
                            className={"mr-1 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Support chăm sóc"}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listCustomer}
                            formatItem={{
                                id: "_id",
                                text: "name"
                            }}
                            onSearchInputChange={debounce(
                                (valueSearch) => setContactKeyword(valueSearch),
                                500
                            )}
                            onchangeValue={item => {
                                const cloneIDs = [...supportsID];
                                cloneIDs.push(item._id);
                                setSupportsID(cloneIDs);
                                dispatch(setFilterDropdown({keyFilter: "supportsID", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setSupportsID([]);
                                dispatch(setFilterDropdown({keyFilter: "supportsID", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...supportsID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setSupportsID(newList);
                                dispatch(setFilterDropdown({keyFilter: "supportsID", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />

                        <DropdownSearchableV2
                            ref={typeRef}
                            className={"mr-1 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Trạng thái"}
                            isMultiple={true}
                            disableSearch={true}
                            allowClearValueSingleInput={true}
                            data={CONTACT_STATUS2}
                            formatItem={{
                                "id": "value"
                            }}
                            onchangeValue={item => {
                                const cloneIDs = [...statuss];
                                cloneIDs.push(item.value);
                                setStatuss(cloneIDs);
                                dispatch(setFilterDropdown({keyFilter: "statuss", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setStatuss([]);
                                dispatch(setFilterDropdown({keyFilter: "statuss", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...statuss];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setStatuss(newList);
                                dispatch(setFilterDropdown({keyFilter: "statuss", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />

                        <DropdownSearchableV2
                            ref={typeRef}
                            className={"mr-1 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Giới tính"}
                            isMultiple={true}
                            disableSearch={true}
                            allowClearValueSingleInput={true}
                            data={GENDER_TYPES}
                            formatItem={{
                                "id": "value"
                            }}
                            onchangeValue={item => {
                                const cloneIDs = [...genders];
                                cloneIDs.push(item.value);
                                setGenders(cloneIDs);
                                dispatch(setFilterDropdown({keyFilter: "genders", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setGenders([]);
                                dispatch(setFilterDropdown({keyFilter: "genders", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...genders];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setGenders(newList);
                                dispatch(setFilterDropdown({keyFilter: "genders", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />

                        <DropdownSearchableV2
                            ref={datahubRef}
                            className={"mr-1 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Phòng ban"}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listProjectsUserIsMember}
                            formatItem={{
                                id: "_id",
                                text: "name"
                            }}
                            onSearchInputChange={debounce(
                                (valueSearch) => setProjectKeyword(valueSearch),
                                500
                            )}
                            onchangeValue={item => {
                                const cloneIDs = [...departmentsID];
                                cloneIDs.push(item._id);
                                setDepartmentsID(cloneIDs);
                                dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setDepartmentsID([]);
                                dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...departmentsID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setDepartmentsID(newList);
                                dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />

                        <div className="flex justify-between text-primary-gray px-4 py-1 cursor-pointer hover:bg-slate-200 mb-2">
                            <div>
                                <span className="ml-2 mr-4 text-[14px] align-middle">Tạo mới</span>
                            </div>
                            <button
                                onClick={() => handleOpenModalCreateOrUpdate('create')}
                            >
                                <img src={iconPlus} alt="" />
                            </button>
                        </div>
                    </div>

                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={10}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPageHuman();
                            setPageIndex(oldState => oldState+1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState-1)
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
            {isLoading || isFetching && <Loader absolute={true} className="border-primary" />}
                {(!listHumanWithPager[pageIndex] || listHumanWithPager[pageIndex].length === 0) && !isLoading && !isFetching && (
                    <h2 className="text-center">Không có kết quả được trả về</h2>
                )}

                {!isLoading && listHumanWithPager[pageIndex] && listHumanWithPager[pageIndex].length > 0 && (
                    <table
                        className="text-black border-separate space-x-0 space-y-0 w-full"
                        style={{ borderSpacing: 0 }}
                    >
                        <thead className="">
                        <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                            <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '30px' }}>
                                TT
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Khách hàng
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Ngày tham gia
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Điện thoại
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Email
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Mã số thuế
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Tuyến trên
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Nguồn dữ liệu
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Ghi chú
                            </th>
                        </tr>
                        </thead>
                        <tbody className="">
                        {listHumanWithPager[pageIndex].map((item, index) => {
                            let linkRef, str
                            if(location.pathname.includes("/crm/customer/")){
                                linkRef = `/crm/customer/cid=${item._id}`
                            }else{
                                linkRef = `/crm/customer/cid=${item._id}`
                            }
                            if(item?.dataSource){
                                str = 'py-1 px-2 rounded-md border border-primary-border text-white bg-cbs-secondary text-left'
                            }else{
                                str = 'hidden'
                            }

                            return (
                                <tr
                                    key={index}
                                    className="text-left hover:bg-cbs-active-comment"
                                >
                                    <td className="px-4 py-2.5 border-b border-cbs-border">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-2.5 border-b border-cbs-border">
                                        <img
                                            src={item?.image ? `${process.env.REACT_APP_URL_S3_CONTACT}/${item?.image}` : `${process.env.REACT_APP_URL_S3_CONTACT}/contact_default.png`}
                                            alt="User Avatar"
                                            className="w-14 h-14 rounded-full"
                                        />
                                       <div className="bg-primary-light relative bottom-10 left-8 h-9 w-9 rounded-full flex items-center justify-center">
                                            <label>
                                                <div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
                                                    <img
                                                        src={CameraIcon}
                                                        alt="Camera"
                                                        className="w-[15px] h-[13px]"
                                                    />
                                                    <input type="file" name="files" id="file" className="hidden" accept="image/*" onChange={(event)=>handleChangeAvatar(event, item._id)} />
                                                </div>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2.5 border-b border-cbs-border">
                                        <Link to={linkRef}>
                                            <p className="text-cbs-highlight-color text-medium">
                                                {`${item.name}`}
                                                - {(item?.gender && item?.gender >= 1) && GENDER_TYPES[item?.gender -1].text}
                                            </p>
                                            <p className="mt-1">Support: { item?.support != null && item?.support?.name}</p>
                                            <p className="text-primary-gray mt-1">{item?.identity != null && item?.identity }</p>
                                            <p className="text-primary-gray mt-1">Ngày sinh: { item?.birthday != null && moment(item?.birthday).format("DD/MM/YYYY")}</p>
                                        </Link>
                                        <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {moment(item?.joinedDate).format('DD/MM/YYYY HH:mm')}
                                        <div><button className={str}>Affiliate</button></div>
                                        {item.status == 2 ? <div><button className="text-[10px] text-white rounded px-1 bg-red-400">Tạm dừng</button></div> : <></>}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {item?.phone}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {item?.email != null && item?.email }
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        <p>{item?.taxid}</p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 w-24">
                                        <p>{item?.parent?.name}</p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 w-24">
                                        <p>{item?.dataSource?.name}</p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {item.note}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}