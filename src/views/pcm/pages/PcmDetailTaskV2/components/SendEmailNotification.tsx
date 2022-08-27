import React, { FC, Fragment, useMemo, useRef, useState, useCallback } from "react"
import { Dialog, Transition } from "@headlessui/react";
import debounce from "lodash/debounce";

import SearchIcon from 'assets/icons/SearchIcon';
import Close from "assets/icons/Close";
import iconSendMail from "../../../../../assets/images/icons8-send-email-96.svg";
import { Task } from "typings/task";
import { usePcm } from 'services/hooks/pcm/usePcm';
import { toast } from "react-toastify";
import { captureException } from "@sentry/react";
// import iconChecklist from "assets/images/icons8-checklist-64.svg";
// import {DropdownSearchableV2} from "shareComponents/common";
// import nextIcon from "assets/images/icons-arrow-next.svg";
// import userIcon from "assets/images/icon-user-avatar.svg";

type Props = {
    task: Task;
    userId?: string;
}

export const SendEmailNotification: FC<Props> = ({ task, userId = '' }) => {
    const accessUsers = useMemo(() => {
        const accessUsersID = task.accessUsers?.map(user => user._id);
        return accessUsersID.filter(userID => userID !== userId);
    }, [task._id, task.accessUsers]) || [];

    const focusElementRef = useRef<HTMLDivElement>(null);

    const [isShow, setIsShow] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [emails, setEmails] = useState('');
    const [idsChecked, setIdsChecked] = useState<Array<string>>([]);

    const { sendMailDetailTaskAsync } = usePcm();

    const getStateChecked = useCallback((id: string) => {
        return idsChecked.includes(id) ? true : false;
    }, [idsChecked]);

    const onClickCheckButton = (id: string) => {
        const check = idsChecked.includes(id);
        if (check) {
            const newList = [...idsChecked];
            const index = newList.findIndex((e: any) => e == id);
            newList.splice(index, 1);
            setIdsChecked(newList);
        } else {
            const newList = [...idsChecked, id];
            setIdsChecked(newList);
        };
    };

    const getStateCheckedAll = useCallback(() => {
        if (!idsChecked.length && !accessUsers.length) return false;
        return idsChecked.length == accessUsers.length;
    }, [idsChecked.length, accessUsers.length]);

    const onClickCheckAll = () => {
        if (idsChecked.length == accessUsers.length) {
            setIdsChecked([]);
        } else {
            setIdsChecked(accessUsers);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!title.trim())
                return toast.warning('Vui lòng nhập tiêu đề');

            if (!content.trim())
                return toast.warning('Vui lòng nhập nội dung');

            // let usersSendMail = task.accessUsers?.map(user => user._id);

            // if (!usersSendMail) {
            //     const usersRelated = task.related.map(user => user._id);
            //     usersSendMail = [task.author?._id, task.assignee?._id, ...usersRelated];
            // }

            const result = await sendMailDetailTaskAsync({
                taskID: task._id,
                title,
                notice: content,
                members: idsChecked,
                emails
            });

            if (result.error) {
                if (result.data?.keyError === 'params_mail_invalid') {
                    return toast.error(result.data?.message);
                }

                return toast.error('Gửi email thất bại');
            }

            setIsShow(false);
            setEmails('');
            setTitle('');
            setContent('');
            setIdsChecked([]);

            toast.success('Gửi email thành công');
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
        <>
            <button onClick={() => setIsShow(!isShow)} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                <img src={iconSendMail} alt={"----"} className={"w-[18px]"} />
            </button>
            <Transition appear show={isShow} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                    onClose={() => {
                        setIsShow(false)
                    }}
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
                            <div className={"max-w-[768px] min-w-[768px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                                <div className={"flex w-full items-center"}>
                                    <div className={"flex items-center flex-1"}>
                                        <span className={"text-xl font-bold"}>Thông báo email</span>
                                    </div>
                                    <button
                                        className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                        onClick={() => {
                                            setIsShow(false)
                                        }}
                                    >
                                        <Close />
                                    </button>
                                </div>
                                <div className={"mt-4 pb-2"}>
                                    <input
                                        className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
                                        placeholder={"Tiêu đề email"}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    <textarea
                                        placeholder={"Nội dung email"}
                                        rows={3}
                                        className={"w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
                                        onChange={e => setContent(e.target.value)}
                                    ></textarea>
                                    <textarea
                                        placeholder={"Nhập email ngoài hệ thống"}
                                        rows={3}
                                        className={"w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
                                        onChange={e => setEmails(e.target.value)}
                                    ></textarea>

                                    <div className='relative border-cbs-border border-0.5 flex items-center mt-2'>
                                        <SearchIcon className='absolute left-3 w-4 h-4' />
                                        <input
                                            type="text"
                                            placeholder='Nhập từ khóa tìm kiếm'
                                            className='pl-9 py-3 text-medium w-full focus:outline-none bg-cbs-table-header'
                                            onChange={debounce((e: any) => setKeyword(e.target.value), 600)}
                                        />
                                    </div>

                                    <div className='flex items-center mt-4 mb-4 ml-2'>
                                        <input
                                            type='checkbox'
                                            className='cbs-checkbox inline-block'
                                            checked={getStateCheckedAll()}
                                            onChange={onClickCheckAll}
                                        />
                                        <span className="font-normal ml-2">Chọn tất cả</span>
                                    </div>

                                    <div className='text-small overflow-auto' style={{ height: '470px' }}>
                                        <table>
                                            <tbody className='overflow-y-auto'>
                                                {
                                                    task.accessUsers?.map((item, index) => {
                                                        if (item._id !== userId) {
                                                            const textSearch = keyword?.toLowerCase();
                                                            const fullname = item.bizfullname?.toLowerCase();

                                                            if (textSearch && !fullname.includes(textSearch)) {
                                                                return <></>;
                                                            }

                                                            return (
                                                                <tr key={index}>
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
                                                                            <div className='w-10 h-10 object-cover rounded-full overflow-hidden mr-4'>
                                                                                <img className='w-full h-full' src={`${process.env.REACT_APP_URL_S3_USER}/${item.image}`} alt="" />
                                                                            </div>
                                                                            <div>
                                                                                {item.bizfullname}
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex justify-end w-full mt-3">
                                        <button
                                            className="rounded bg-cbs-primary w-[100px] h-[36px] text-white flex items-center justify-center"
                                            onClick={handleSubmit}
                                        >
                                            Gửi
                                        </button>
                                    </div>
                                </div>
                                {/* <div className={"max-h-[500px] mt-[15px] no-webkit-scrollbar overflow-auto"}>

                                </div> */}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}