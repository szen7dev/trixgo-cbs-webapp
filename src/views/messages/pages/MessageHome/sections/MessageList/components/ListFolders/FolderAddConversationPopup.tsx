import React, {FC, Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {dismissAddConversationToFolder} from "redux/reducer/messages/AddConversationToFolder";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {map as _map} from "lodash";
import moment from "moment";

export const FolderAddConversationPopup:FC = () => {
    const {listFolders, hasMoreData, nextCursor} = useSelector((state: RootState) => state.listFolders.data);
    const {isOpenAddConversationToFolder} = useSelector((state: RootState) => state.addConversationToFolder.data);
    const dispatch = useDispatch();
    const {addFolder, getListFoldersConversation} = UseListConversation();
    const [selectedFolder, setSelectedFolder] = useState<{[key: string]: any}>({});

    const focusElementRef = useRef<HTMLDivElement>(null);

    const nexListFolder = () => {
        nextCursor&&getListFoldersConversation({nextCursor: nextCursor, limit:10})
    }
    const handlePressConfirmFolder = () => {
        dispatch(dismissAddConversationToFolder())
    }

    const handleSelectFolder = (value: boolean, folder: any) => {
        const selected = {...selectedFolder};
        if (value) {
            selected[folder._id] = folder;
        } else {
            delete selected[folder._id];
        }
        setSelectedFolder(selected);
    }

    return (
        <Transition appear show={isOpenAddConversationToFolder} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissAddConversationToFolder())}
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
                                    onClick={() => dispatch(dismissAddConversationToFolder())}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Thêm vào thư mục
                                </div>
                                <button
                                    onClick={() => handlePressConfirmFolder()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <div className={"p-[22px] mb-5 min-h-[240px] max-h-[500px]"}>
                                {_map(Object.values(listFolders).sort((a,b) => (moment(b.createdAt).toDate().getTime() > moment(a.createdAt).toDate().getTime())?1:-1),
                                    folder => (
                                        <div key={folder._id} className={"flex items-center mb-3"}>
                                            <input
                                                defaultChecked={Object.values(selectedFolder).includes(folder._id)}
                                                id={folder._id}
                                                onChange={event => handleSelectFolder(event.target.checked, folder)} type="checkbox"
                                               className="form-check-input transition duration-200 rounded-full cursor-pointer min-w-[20px] min-h-[20px] w-[20px] h-[20px] bg-transparent border-gray-100 checked:bg-primary" />
                                            <label htmlFor={folder._id} className={"flex-1 ml-4"}>{folder.name}</label>
                                        </div>
                                    )
                                )}
                                {
                                    hasMoreData &&
                                    <button
                                        onClick={() => nexListFolder()}
                                        className={"rounded-lg flex flex-col items-center justify-center"}>
                                        <span className={"text-primary"}>Xem thêm</span>
                                    </button>
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}