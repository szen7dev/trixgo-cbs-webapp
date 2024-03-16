import { FC, useState, useCallback } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";

/**
 * Components
 */
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdatePosition, ModalConfirm } from '../../../sharedComponents/common';

/**
 * Assets
 */
import styles from "views/support/styles/support.module.css";
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { usePosition } from "services/hooks/items/usePosition";
import { Position } from "typings/items/position";

const ProjectAdminPositionTab: FC = () => {
    const { closeModal, openModal } = useModal();
    const [keywordPosition, setKeywordPosition] = useState('');
    const [positionsChecked, setPositionsChecked] = useState<Array<Position>>([]);
    const [initialValues, setInitialValues] = useState({
        positionID: '',
        name: '',
        description: '',
    });

    const {
        deletePositionAsync,
        data: listPositions,
        hasNextPage: hasNextPagePosition,
        refetch: refetchListPosition,
        fetchNextPage: fetchNextPagePosition,
        totalRecord
    } = usePosition({ keyword: keywordPosition }, true);

    const handleConfirmCreateOrUpdatePosition = () => refetchListPosition();

    const onChangeSearchPosition = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeywordPosition(event.target.value);
    }, 500);

    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            positionID: '',
            name: '',
            description: ''
        }))
    }

    const onClickCheckButton = (position: Position) => {
        const check = positionsChecked.find(item => item._id === position._id);
        let newListIDChecked = [];

        if (check) {
            newListIDChecked = positionsChecked.filter(item => item._id !== position._id)
            setPositionsChecked(newListIDChecked);
        } else {
            newListIDChecked = [...positionsChecked, position];
            setPositionsChecked(newListIDChecked);
        };

        if (newListIDChecked.length === 1) {
            const { _id, name, description } = newListIDChecked[0];
            setInitialValues({
                positionID: _id,
                name,
                description
            });
        } else {
            clearData();
        }
    };

    const getStateChecked = useCallback((id: string) => {
        const user = positionsChecked.find(item => item._id === id);
        return user ? true : false;
    }, [positionsChecked]);

    const getStateCheckedAll = useCallback(() => {
        return positionsChecked.length == listPositions.length;
    }, [positionsChecked]);

    const onClickCheckAll = () => {
        if (positionsChecked.length == listPositions.length) {
            setPositionsChecked([]);
        } else {
            setPositionsChecked(listPositions);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const ids = positionsChecked.map(item => item._id);
            const { error, data } = await deletePositionAsync(ids);

            if (error) {
                return toast.warn(data?.message);
            }

            toast.success('Xoá dữ liệu thành công', { autoClose: 1500 });
            closeModal();
            clearData();
            refetchListPosition();
            setPositionsChecked([]);
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {
        let initValues: any = {...initialValues};
        setPositionsChecked([]);

        if(modalType === 'create') {
            clearData();
            initValues = {
                positionID: '',
                name: '',
                description: ''
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
            >
                <ModalCreateOrUpdatePosition
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdatePosition}
                />
            </div>
        )
    }

    return (
        <main className="relative h-full overflow-auto">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <p className="text-lg">Danh sách</p>
                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearchPosition}
                        />

                        {positionsChecked.length === 1 ? (
                            <button
                                className="mr-3"
                                onClick={() => handleOpenModalCreateOrUpdate('update')}
                            >
                                <img src={iconPencil} alt="icon pencil" />
                            </button>
                        ) : ''}

                        {positionsChecked.length ? (
                            <button
                                onClick={() =>
                                    openModal(
                                        <div
                                            className={
                                                "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                                            }
                                        >
                                            <ModalConfirm onConfirm={handleConfirmDelete} />
                                        </div>
                                    )
                                }>
                                <img src={DeleteIcon} alt="Delete" />
                            </button>
                        ) : ''}
                    </div>
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
                </div>
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                    <tr className="text-left text-sm">
                        <th className="pb-1 pt-1 text-center" style={{ width: "1.5%" }}>
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
                                Nội dung
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mô tả
                            </div>
                        </th>
                        <th className="w-1/12 py-1 font-normal">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Cập nhật lần cuối
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listPositions.length ? listPositions.map(position => (
                        <tr key={position._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(position._id)}
                                    onChange={() => onClickCheckButton(position)}
                                />
                            </td>
                            <td className="py-1 px-2">
                                {position.name}
                                <p className="text-primary-gray"><i>{position._id}</i></p>
                            </td>
                            <td className="py-1 px-2">{position.description}</td>
                            <td className="py-1 px-2">
                                {position.modifyAt ? moment(position.modifyAt).format('DD/MM/YYYY - HH:mm') : ''}
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            {hasNextPagePosition && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPagePosition}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listPositions.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    );
};

export default ProjectAdminPositionTab;