import React, { UIEvent, FC, useState, useCallback } from "react"
import debounce from "lodash/debounce";

import CloseIcon from "assets/images/icon-small-bold-close.svg";

import { toast } from "react-toastify";
import { captureException } from "@sentry/react";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import { useContract } from "services/hooks/items/useContract";
import { useModal } from "services/hooks/useModal";
import { DropdownSearchable } from "shareComponents/common";

type Props = {
    item: any;
    projectID: string;
    onConfirm: () => void;
}

const UpdateGroup: FC<Props> = ({ item, projectID, onConfirm }) => {
    const [keyword, setKeyword] = useState('');
    const [formData, setFormData] = useState({
        name: item.name,
        sign: item.sign
    })

    const { updatePcmPlanGroupMutateAsync } = usePcmPlanGroup({});
    const {
        listContracts,
        hasNextPage,
        fetchNextPage,
    } = useContract({
        params: { keyword, projectID },
        isFetch: !!projectID
    })

    const { closeModal } = useModal();

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const bottom = scrollHeight - scrollTop >= clientHeight - 10;
        if (!bottom || !hasNextPage) return;

        fetchNextPage();
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(previous => ({
            ...previous,
            [name || 'sign']: value
        }))
    }

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.sign) {
                return toast.warning("Vui lòng nhập đầy đủ tên nhóm và mã hiệu.");
            }

            const result = await updatePcmPlanGroupMutateAsync({
                groupID: item._id,
                ...formData
            });

            if (result.error) return toast.error(result?.data?.message);

            toast.success('Cập nhật dữ liệu thành công');
            closeModal();
            onConfirm();
        } catch (error) {
            captureException(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <main className="relative h-full">
            <header className="px-5 py-9 flex items-center justify-between">
                <p className="font-bold text-xl">Cập nhật</p>
                <img
                    src={CloseIcon}
                    alt="Close"
                    className="cursor-pointer"
                    onClick={closeModal}
                />
            </header>

            <div className={"pb-2 px-5"}>
                <input
                    className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
                    placeholder={"Nhập tên nhóm dữ liệu"}
                    defaultValue={item.name}
                    onChange={onChangeInput}
                />
                <textarea
                    placeholder={"Nhập mã hiệu"}
                    rows={3}
                    className={"w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
                    defaultValue={item.sign}
                    onChange={onChangeInput}
                ></textarea>

                <DropdownSearchable
                    onchangeValue={(value: any) => {
                        setFormData(previous => ({
                            ...previous,
                            contractID: value?.id
                        }))
                    }}
                    onClearData={() => {
                        setFormData(previous => ({
                            ...previous,
                            contractID: ""
                        }))
                    }}
                    onSearchInputChange={debounce((value: any) => setKeyword(value), 600)}
                    onScroll={handleScroll}
                    className="w-full mt-2 rounded-md border border-primary-border px-1 py-1 placeholder-primary-gray bg-cbs-table-header"
                    placeholder="Tìm kiếm hợp đồng thuộc dự án"
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-full"
                    renderSelectedItem={(item: any) => (
                        <div className="max-w-full">
                            <p className={"truncate"}>{item.text}</p>
                        </div>
                    )}
                    data={listContracts.map((contract) => ({
                        label: `${contract.sign}.${contract.name}`,
                        value: contract._id,
                    }))}
                    initialValue={{
                        label: `${item.contract?.sign}.${item.contract?.name}`,
                        value: item.contract?._id
                    }}
                    formatItem={{
                        id: "value",
                        text: "label",
                    }}
                    inlineSearch={true}
                />

                {/* <div className='relative border-cbs-border border-0.5 flex items-center mt-2 hidden'>
                    <SearchIcon className='absolute left-3 w-4 h-4' />
                    <input
                        type="text"
                        placeholder='Tìm kiếm hợp đồng thuộc dự án'
                        className='pl-9 py-3 text-medium w-full focus:outline-none bg-cbs-table-header'
                        onChange={debounce((e: any) => setKeyword(e.target.value), 600)}
                    />
                </div>

                <div className='flex items-center mt-4 mb-4 ml-2 hidden'>
                    <input
                        type='checkbox'
                        className='cbs-checkbox inline-block'
                        checked={getStateCheckedAll()}
                        onChange={onClickCheckAll}
                    />
                    <span className="font-normal ml-2">Chọn tất cả</span>
                </div>

                <div className='text-small overflow-auto hidden' style={{ height: '470px' }}>
                    <table>
                        <tbody className='overflow-y-auto'>
                            {(listContracts && !!listContracts.length) &&
                                listContracts.map((item: any) =>
                                    <tr key={item._id}>
                                        <td className='px-1.5 align-middle'>
                                            <input
                                                type='checkbox'
                                                className='cbs-checkbox'
                                                checked={getStateChecked(item._id)}
                                                onChange={onClickCheckButton.bind(null, item._id)}
                                            />
                                        </td>
                                        <td>
                                            <div className='flex items-center py-1'>
                                                <div>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div> */}
            </div>

            <footer className="absolute right-0 bottom-0 px-10 py-5">
                <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
                    onClick={handleSubmit}>
                    Xác nhận
                </button>
            </footer>
        </main>
    )
}

export default UpdateGroup;