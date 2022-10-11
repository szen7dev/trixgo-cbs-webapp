import React, {FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import businessBuilding from "assets/images/icons8-business-building-48.svg";
import debounce from 'lodash/debounce';
import downloadIcon from "assets/images/icons8-download-64.svg";
import pencilIcon from "assets/images/icons8-pencil-96.svg";
import {DropdownSearchableV2, ModalContainer, GroupActions, Paginate} from "shareComponents/common";

import nextIcon from "assets/images/icons-arrow-next.svg";
import userAvatar from "assets/images/task-user.svg";
import { useQueryListCompany } from 'services/hooks/useCompanies';
import { useDepartmentDirectory } from 'services/hooks/items/useDepartmentDirectory';
import iconChevronRight from "assets/images/icon-chevron-right.png";
import ModalCreateDepartmentDirectory from "../../../ppt/pages/ProjectDirectoryPageV2/components/ModalCreateDepartmentDirectory";
import ModalUpdateDepartmentDirectory from "../../../ppt/pages/ProjectDirectoryPageV2/components/ModalUpdateDepartmentDirectory";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { useProject } from 'services/hooks/items/useProject';

// Phân trang
import PaginateV2 from "shareComponents/common/PaginateV2";
import { AnyARecord } from "dns";
import {useAppSelector} from "redux/reducer";

const DEPARTMENT_DIRECTORY_TYPE = [
    { id: 1, text: "Trợ lý viên" },
    { id: 2, text: "Chủ đầu tư" },
    { id: 3, text: "Tư vấn Quản lý dự án" },
    { id: 4, text: "Tư vấn giám sát" },
    { id: 5, text: "Tư vấn thiết kế" },
    { id: 6, text: "Nhà thầu thi công" },
    { id: 7, text: "Tư vấn thẩm tra" },
    { id: 8, text: "Tư vấn khác" },
]

const DEPARTMENT_DIRECTORY_LOCK = [
    { id: 0, text: "Bình thường" },
    { id: 1, text: "Khóa" },
]
const ProjectDirectoryPageV2:FC = () => {
    const [keywordCompany, setKeywordCompany] = useState('');
    const [companySelected, setCompanySelected] = useState('');
	const { id: projectID } = useParams<{ id: string }>();
    const [pageParam, setPageParam] = useState("");
    const [prevCursor, setPrevCursor] = useState([null]);

    const {keywordInput} = useAppSelector(
        (state) => state.documentProject.data
    );

    useEffect(() => {
        setPageIndex(0);
        ref.current&&ref.current.resetPaginate();
    }, [keywordInput]);

    const { data: listCompanies, fetchNextPage } = useQueryListCompany({ keyword: keywordCompany, limit: 20 });
    const {
        isLoading,
        hasNextPage,
        list: listDepartmentDirectory, 
        listDepartmentDirectoryWithPager,
        totalRecord,
        totalPage,
        fetchNextPage: fetchNextPageDepartmentDirectory,
        refetch,
        nextCursor
    } = useDepartmentDirectory({ params: { companyID: companySelected, projectID, limit: 10, lastestID: pageParam }, isFetchList: true });

    const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "name sign",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Danh bạ dự án`
	}, []);
    
    const [departmentDirectoryIdSelected, setDepartmentDirectoryIdSelected] = useState("");

    const { assigned, checked, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(listDepartmentDirectory);
    useEffect(() => {
        const assignedEntries = Object.entries(assigned);
        if (!assignedEntries.length) return;
    
        const cashBookSelected = assignedEntries.filter(([_, value]) => value);
    
        if (cashBookSelected.length === 1) {
          setDepartmentDirectoryIdSelected(cashBookSelected[0][0]);
        }
      }, [assigned]);

    const handleSearch = debounce((value) => setKeywordCompany(value), 500);

    const handleChangeCompany = (value: any) => {
        setCompanySelected(value.id);
    }

    const [modalShow, setModalShow] = useState({
        create: false,
        update: false,
    });

    const toggleModalCreateOrUpdate = (modalType: "create" | "update") => {
        setModalShow((prevValue) => ({
            ...prevValue,
            [modalType]: !modalShow[modalType],
        }));
    };

    // const prevPageAction = () => {
    //     if (!nextCursor) {
    //       setPageParam(prevCursor[prevCursor.length - 2] || '')
    //     } else {
    //       const prev = prevCursor.findIndex(item => item === nextCursor)
    //       setPageParam(prevCursor[prev - 2] || '')
    //     }
    //   };

    // const nextPageAction = () => {
    //     setPageParam(nextCursor || "")
    // }
     
    // const toggleDeleteModal = () => {
    //     openModal(
    //       <div
    //         className={
    //           "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
    //         }
    //       >
    //         <ModalConfirm onConfirm={handleConfirmDelete} onCancel={closeModal} />
    //       </div>
    //     );
    //   };
    // Phân trang
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    return (
        <div className={"project-directory"}>
            <div className={"flex px-4 py-2 items-center justify-between"}>
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
                    placeholder={"Đơn vị"}
                    showTriangle={true}
                    data={listCompanies?.map(company =>({ id: company._id, text: company.name }))}
                    prefixIcon={<img className={"mr-2"} src={businessBuilding} alt={"icon"}/>}
                    onSearchInputChange={handleSearch}
                    onchangeValue={handleChangeCompany}
                />
                <button className={"bg-cbs-green rounded h-[32px] px-4 text-white font-bold"} 
                    onClick={toggleModalCreateOrUpdate.bind(null, "create")}
                >
                    Tạo mới
                </button>
            </div>
            <div className={"flex items-center mt-2"}>
                {/* <div className={"flex items-center"}>
                    <button className={"mx-4"}>
                        <img src={downloadIcon} alt={"----"} className={"w-[18px] h-[18px] min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px]"}/>
                    </button>
                    <button className={"mx-4"}>
                        <img src={pencilIcon} alt={"----"} className={"w-[18px] h-[18px] min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px]"}/>
                    </button>
                </div> */}
                {/* <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} /> */}
                <GroupActions
                    className="flex items-center flex-1"
                    // onClickTrash={toggleDeleteModal}
                    onClickPencil={toggleModalCreateOrUpdate.bind(null, "update")}
                    types={["edit"]}
                    disabled={{
                        pencil: Object.values(assigned).filter(Boolean).length !== 1,
                        trash: !Object.values(assigned).some((value) => value),
                    }}
                />
        
                {/* XỬ LÝ PHẤN TRANG */}
                <PaginateV2
                    ref={ref}
                    totalRecord={totalRecord}
                    totalPages={totalPage}
                    limit={10}
                    hasNextPage={hasNextPage}
                    isFetching={isLoading}
                    nextPageAction={() => {
                        fetchNextPageDepartmentDirectory();
                        setPageIndex(oldState => oldState+1)
                    }}
                    prevPageAction={() => {
                        setPageIndex(oldState => oldState-1)
                    }}
                />
              
            </div>

            <div className={"table-project-directory mt-2"}>
                <table className={"w-full table-fixed tasks border-collapse"}>
                    <thead className={"bg-cbs-table-header sticky top-0 z-10"}>
                        <tr>
                            <th className={"w-[46px] border-0.5 border-primary-border px-2"}>
                                <div className={"flex items-center justify-center py-3"}>
                                    <input className="form-check-input" type="checkbox" value="" id="check"/>
                                </div>
                            </th>
                            <th className={"w-3/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Họ và tên
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Đơn vị
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Chức vụ trong dự án
                            </th>
                            <th className={"w-1/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Điện thoại
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Email
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Ghi chú
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {listDepartmentDirectoryWithPager[pageIndex]?.map((departmentDirectory: any, i: any) => (
                            <tr key={i}>
                                <td
                                    className="pt-2.5 pb-3 px-2 border-b-0.5 border-cbs-border text-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <input
                                    className="cbs-checkbox"
                                    type="checkbox"
                                    value={departmentDirectory._id}
                                    checked={Boolean(assigned[departmentDirectory._id])}
                                    onChange={(e) => handleChangeCheckbox(e, departmentDirectory)}
                                    />
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <div className={"flex items-center py-2"}>
                                        <img  src={`${process.env.REACT_APP_URL_S3_USER}/${departmentDirectory?.member?.image}`} alt={"---"} className={"w-[40px] h-[40px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full overflow-hidden"}/>
                                        <p className={"ml-2"}>
                                            {departmentDirectory?.member?.fullname}
                                        </p>
                                    </div>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p>
                                        {departmentDirectory?.company?.name}
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p>
                                        { DEPARTMENT_DIRECTORY_TYPE[departmentDirectory?.type - 1]?.text} - {departmentDirectory.name}
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p className={"truncate"}>
                                        { departmentDirectory?.member?.phone }
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    { departmentDirectory?.member?.email }
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p>
                                        {departmentDirectory.description}
                                    </p>
                                    <p>
                                        { DEPARTMENT_DIRECTORY_LOCK[departmentDirectory.lock].text}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Create danh bạ dự án */}
            <ModalContainer
                isModalOpen={modalShow.create}
                toggle={toggleModalCreateOrUpdate.bind(null, "create")}
            >
                <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
                <ModalCreateDepartmentDirectory
                    toggle={toggleModalCreateOrUpdate.bind(null, "create")}
                    onConfirm={refetch}
                    projectID={ projectID }
                />
                </div>
            </ModalContainer>

            {/* Modal Update danh bạ dự án */}
            <ModalContainer
                isModalOpen={modalShow.update}
                toggle={toggleModalCreateOrUpdate.bind(null, "update")}
            >
                <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
                <ModalUpdateDepartmentDirectory
                    departmentDirectoryID={departmentDirectoryIdSelected}
                    toggle={toggleModalCreateOrUpdate.bind(null, "update")}
                    onConfirm={refetch}
                    projectID={ projectID }
                />
                </div>
            </ModalContainer>
        </div>
    )
}

export default ProjectDirectoryPageV2;