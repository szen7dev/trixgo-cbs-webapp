import { FC, useRef, useState, useCallback, memo } from "react";
import { HumanInfoHeader } from "views/human/shareComponents/common";
import { useModal } from "services/hooks/useModal";
import { useQueryListTimeSheetParent } from "services/hooks/useTimeSheet";
import moment from "moment";
import { NavLink } from 'react-router-dom';
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
const DATE_FORMAT = "DD/MM/YYYY HH:mm";

interface CertificateProps {
  humanId: string;
  linkUserID: any;
  companyID: any;
}

export const Onleave: FC<CertificateProps> = memo((props) => {
    const { openModal, closeModal } = useModal();
    const { humanId, companyID, linkUserID } = props;
    const [pageIndex, setPageIndex] = useState(0);
    const ref = useRef<RefPaginateHandle>(null);

    const {
        dataNotFilter,
        refetch,
        totalPages,
        totalRecord,
        fetchNextPage,
        fetchPrevPage,
        limit,
        loading,
        hasNextPage,
    } = useQueryListTimeSheetParent({ humanID: linkUserID, sortOption: 2, type: 3, subtype: 2 });

    const handleClickAddNew = useCallback(() => {
        openModal(
        <div
            className={
            "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
            }
        >
            
        </div>
        );
    }, [ openModal]);

    return (
        <div className="border-accent-light px-4 py-6">
            <div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center text-bold text-primary-gray text-lg uppercase">
                        7-LỊCH SỬ NGHỈ PHÉP
                    </span>
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPages}
                        limit={limit}
                        hasNextPage={hasNextPage}
                        isFetching={loading}
                        nextPageAction={() => {
                            setPageIndex((oldState) => oldState + 1);
                            fetchNextPage();
                        }}
                        prevPageAction={() => {
                            setPageIndex((oldState) => oldState - 1);
                            fetchPrevPage();
                        }}
                    />
                </div>
                <div className="relative flex-1 overflow-y-auto">
                    {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any, index: any) => (
                        <div className={"body-table table-row"} key={item._id}>
                            <div
                                className={
                                    "px-4 py-2 table-cell box-border border-b align-middle w-3"
                                }
                            >
                                {Number(index + 1)}
                            </div>
                            <div
                                className={
                                "px-1 py-2 table-cell box-border border-b align-middle"
                                }
                            >
                                {moment(item.date).format('DD/MM/YYYY')}
                                <p>{item.name}</p>
                                <p><i>{item?.assignee?.fullname}</i></p>
                            </div>
                            <div className={"px-2 py-2 table-cell box-border border-b w-2/6"}>
                                {item.note}
                            </div>
                            <div
                                className={
                                "px-2 py-2 table-cell box-border border-b text-right"
                                }
                            >
                                {item?.hours}
                            </div>
                            <div
                                className={
                                "px-1 py-2 table-cell box-border border-b align-middle"
                                }
                            >
                                <NavLink  to={`/timesheet/home/${item?.parent?._id}`}>
                                    <p>{item?.parent?.name}</p>
                                </NavLink>
                                <p className={"mt-1 text-gray-500"}>
                                    <i>Tạo: {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}</i>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>     
    );
});

Onleave.displayName = 'Onleave'