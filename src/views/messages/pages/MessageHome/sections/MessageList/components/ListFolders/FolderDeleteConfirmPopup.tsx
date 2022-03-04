import React, {FC, Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {dismissCreateUpdateFolder} from "redux/reducer/messages/CreateUpdateFolder";
import {addSingleFolder, updateSingleFolder} from "redux/reducer/messages/ListFolders";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseListConversation} from "services/hooks/messages/useListConversation";

export const FolderDeleteConfirmPopup:FC = () => {
    const {isCreateUpdateFolder, folder} = useSelector((state: RootState) => state.createUpdateFolder.data);
    const dispatch = useDispatch();
    const {addFolder, updateFolder} = UseListConversation();
    const focusElementRef = useRef<HTMLDivElement>(null);
    const [folderName, setFolderName] = useState("")

    useEffect(() => {
        if (folder) {
            setFolderName(folder.name)
        }
    }, [folder])

    const handlePressConfirmFolder = () => {
        dispatch(dismissCreateUpdateFolder())
        if (folder) {
            updateFolder({
                folderID: folder._id,
                name: folderName
            }).then((folder) => {
                dispatch(addSingleFolder({folderId: folder._id, folderData: folder}))
            })
        } else {
            addFolder({
                name: folderName
            }).then((folder) => {
                dispatch(updateSingleFolder({folderId: folder._id, folderData: folder}))
            })
        }
        setFolderName("");
    }

    return (
        <Transition appear show={isCreateUpdateFolder} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissCreateUpdateFolder())}
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
                                    onClick={() => dispatch(dismissCreateUpdateFolder())}
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
                                Are you sure you want to remove this folder? Your chats will not be deleted.<br/>
                                Bạn có chắc chắn muốn xóa thư mục này. Dữ liệu chat của bạn sẽ không bị xóa
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}