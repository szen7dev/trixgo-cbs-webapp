import React, {FC, Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {dismissDeleteConfirmFolder} from "redux/reducer/messages/DeleteConfirmFolder";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {setCurrentSelectedFolders} from "redux/reducer/messages/ListFolders";

export const FolderDeleteConfirmPopup:FC = () => {
    const {isOpenDeleteConfirmFolder, folderId} = useSelector((state: RootState) => state.deleteConfirmFolder.data);
    const dispatch = useDispatch();
    const {deleteFolder, getListFoldersConversation} = UseListConversation();
    const focusElementRef = useRef<HTMLDivElement>(null);

    const handlePressConfirmFolder = () => {
        dispatch(dismissDeleteConfirmFolder())
        dispatch(setCurrentSelectedFolders({
            currentSelectedFolders: null
        }))
        deleteFolder({folderID: folderId}).then(data => {
            getListFoldersConversation({limit: 10})
        })
    }

    return (
        <Transition appear show={isOpenDeleteConfirmFolder} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissDeleteConfirmFolder())}
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
                        <div className={"w-[400px] rounded-md shadow-lg bg-white z-51"}>
                            <div className={"flex w-full items-center p-[22px]"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={() => dispatch(dismissDeleteConfirmFolder())}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Xóa thư mục?
                                </div>
                                <button
                                    onClick={() => handlePressConfirmFolder()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <div className={"p-[22px] mb-5"}>
                                Are you sure you want to remove this folder? Your chats will not be deleted.
                                <br/>
                                <br/>
                                Bạn có chắc chắn muốn xóa thư mục này. Dữ liệu chat của bạn sẽ không bị xóa
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}