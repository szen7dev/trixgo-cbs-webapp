import React, {FC, Fragment, useRef, useEffect, useCallback, useState, useMemo} from "react"
import iconChat from "assets/images/icons8-chat-48.svg";
import iconSearch from "assets/images/icons8-search.svg";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import TriangleDown from "assets/icons/TriangleDown";
import userAvt from "assets/images/task-user.svg";
import { Task } from "typings/task";
import { useUsersProject } from "services/hooks/users/useUserSystem";
import { useTask } from "services/hooks/useTask";
import { toast } from "react-toastify";
import { captureException } from "@sentry/react";
import { debounce } from "lodash";
import { UserSystemProps } from "typings/users/userSystem";
import iconAddUser from "assets/images/icons8-add-user-male-96 1.png";

type Props = {
    task: Task;
    onConfirmAddUserRelated?: () => void;
}

export const AddUserRelated: FC<Props> = ({ task, onConfirmAddUserRelated }) => {
	const relatedsID = useMemo(() => {
        return task.related?.map(user => user._id)
    }, [task.related]);

    const [isShow, setIsShow] = useState(false);
    const [collapse, setCollapse] = useState(true);
    const focusElementRef = useRef<HTMLDivElement>(null);
	const [keyword, setKeyword] = useState("");
    const [hasDefault, setHasDefault] = useState(false);
	const [idsChecked, setIdsChecked] = useState<Array<string>>(relatedsID || []);

    const { data: listUsersProject, hasNextPage, fetchNextPage, totalRecord } = useUsersProject({
		projectID: task.project?._id,
		keyword
	}, true);

	const { addRelationUserAsync } = useTask({});

	const getStateChecked = useCallback((id: string) => {
		if(!hasDefault && relatedsID?.includes(id)) {
			return true;
		}

		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		const check = idsChecked.includes(id);
		if (check) {
			const newList = [...idsChecked];
			newList.splice(newList.findIndex((e: any) => e == id), 1);
			setIdsChecked(newList);
		} else {
			const newList = [...idsChecked, id];
			setIdsChecked(newList);
		};
	};

	const getStateCheckedAll = useCallback(() => idsChecked.length == listUsersProject.length, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listUsersProject.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listUsersProject.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const handleConfirmAddRelationUser = async () => {
		try {
            if (!idsChecked || !idsChecked.length) {
                return toast.warning('Vui lòng chọn người liên quan');
            }

            const result = await addRelationUserAsync({
                taskID: task._id, related: idsChecked
            });

            if(result.error) {
                return toast.warning(result?.data?.message);
            }

            setIdsChecked([]);
            onConfirmAddUserRelated?.();
            toast.success('Thêm người liên quan thành công');
        } catch(error) {
            captureException(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setIsShow(false);
        }
	};

	useEffect(() => {
		setHasDefault(true);
	}, [])

    return (
        <>
            <button onClick={() => setIsShow(!isShow)} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                <img src={iconAddUser} alt={"----"} className={"w-[18px]"}/>
            </button>
            <Transition appear show={isShow} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                    onClose={() => setIsShow(false)}
                    initialFocus={focusElementRef}
                >
                    <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={"max-w-[500px] min-w-[500px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                                <div className={"flex w-full items-center"}>
                                    <div className={"flex items-center flex-1"}>
                                        <span className={"text-xl font-bold"}>Thêm người liên quan</span>
                                    </div>
                                    <button
                                        className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                        onClick={() => setIsShow(false)}
                                    >
                                        <Close/>
                                    </button>
                                </div>
                                <div className={"relative my-4"}>
                                    <input
                                        className={"w-full rounded-md border-0.5 border-primary-border px-2 py-3 pl-10 placeholder-primary-gray bg-cbs-table-header"}
                                        placeholder={"Nhập từ khóa tìm kiếm"}
							            onChange={debounce((event: any) => setKeyword(event.target.value), 500)}
                                    />
                                    <span className={"absolute left-0 h-full top-0 flex items-center px-2"}>
                                        <img src={iconSearch} alt={"-----"}/>
                                    </span>
                                </div>
                                <div className={"border-0.5 border-primary-border px-4 py-2"}>
                                    {task.related?.map(user => user.bizfullname).join(', ')}
                                </div>
                                <div className={"my-4 flex items-center"}>
                                    <input
                                        className="form-check-input line mr-2"
                                        type="checkbox"
                                        checked={getStateCheckedAll()}
                                        onChange={onClickCheckAll}
                                    />
                                    <button onClick={e => { e.stopPropagation(); setCollapse(!collapse) }} className="ml-1.5">
                                        <TriangleDown />
                                    </button>
                                    <span className={"ml-2"}>Chọn tất cả</span>
                                </div>
                                <div className={"max-h-[500px] min-h-[320px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                    {(listUsersProject.length && collapse) ? listUsersProject.map((user: UserSystemProps) => (
                                        <div key={user._id} className={"flex items-center"}>
                                            <input
                                                className="form-check-input mr-8"
                                                type="checkbox"
                                                checked={getStateChecked(user._id)}
                                                onChange={() => onClickCheckButton(user._id)}
                                            />
                                            <img
                                                src={user.image ? `${process.env.REACT_APP_URL_S3_USER}/${user.image}` : userAvt}
                                                alt={user.bizfullname}
                                                className={"w-[40px] h-[40px] rounded-full overflow-hidden"}
                                            />
                                            <div className={"flex-1 ml-4"}>
                                                {user.bizfullname}
                                            </div>
                                        </div>
                                    )) : <></>}

                                    {/* <div className={"flex items-center"}>
                                        <input className="form-check-input mr-8" type="checkbox" value="" id="check"/>
                                        <img src={userAvt} alt={"-----"} className={"w-[40px] h-[40px] rounded-full overflow-hidden"}/>
                                        <div className={"flex-1 ml-4"}>
                                            Nguyễn Trung Hiếu-CPMI
                                        </div>
                                    </div> */}
                                </div>
                                {hasNextPage && (
                                    <div className="w-full flex justify-center my-5">
                                    <button onClick={fetchNextPage}>
                                        <span className="text-primary">{`Xem thêm (${totalRecord - listUsersProject.length
                                        })`}</span>
                                    </button>
                                    </div>
                                )}
                                <div className={"flex items-center justify-end"}>
                                    <button className={"bg-primary rounded px-4 py-2 text-white"} onClick={handleConfirmAddRelationUser}>Xác nhận</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}