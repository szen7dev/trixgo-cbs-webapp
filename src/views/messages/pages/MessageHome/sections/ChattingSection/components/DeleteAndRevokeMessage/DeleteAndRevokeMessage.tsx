import {FC, Fragment, useContext, useRef, useState} from "react";

import { Dialog, Transition } from "@headlessui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissDeleteRevoke} from "redux/reducer/messages/DeleteAndRevokeMessage";
import {UseConversation} from "services/hooks/messages/useConversation";
import {removeAllSelectedMessage} from "redux/reducer/messages/ListMessage";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {populates} from "../../../../index";

type Props = {
    context: any
}
export const DeleteAndRevokeMessageConfirm: FC<Props> = ({context}) => {
    const dispatch = useDispatch();
    const {isOpenDeleteRevoke, deleteAndRevokeMessage, conversationId} = useSelector((state: RootState) => state.deleteAndRevokeMessage.data);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {deleteMessage} = UseConversation();
    const [isRevoke, setIsRevoke] = useState(false);
    const {socketRef} = useContext(context);
    const socket = socketRef.current;

    // const currentUser = localStorage.getItem("currentUser")??"{}";
    // const profileId = JSON.parse(currentUser)?._id;

    const handleConfirm = () => {
        // const fileIds : string[] = [];
        // deleteAndRevokeMessage.forEach((item: ItemMessage) => {
        //     if (item.files&&item.files.length>0) {
        //         item.files.forEach(file => {
        //             // if (!file.usersDelete||!file.usersDelete.includes(profileId)) {
        //                 fileIds.push(file._id)
        //             // }
        //         })
        //     }
        // })
        if (isRevoke) {
            socket.emit("CHATTING_CSS_REVOKE_MESSAGE",{
                conversationID: conversationId,
                messagesID: deleteAndRevokeMessage.map((item:ItemMessage) => item._id),
                // filesID: fileIds
            })
        } else {
            deleteMessage({
                messagesID: deleteAndRevokeMessage.map((item:ItemMessage) => item._id),
                conversationID: conversationId,
                // filesID: fileIds
            })
        }
        socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
            conversationID: conversationId,
            populates
        });
        dispatch(dismissDeleteRevoke({}))
        dispatch(removeAllSelectedMessage({conversationId: conversationId}))
        setIsRevoke(false)
    }
    return (
        <Transition appear show={isOpenDeleteRevoke} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissDeleteRevoke({}))}
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
                            <div className={"w-[400px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                                <div className={"font-bold text-lg"}>Xoá tin nhắn</div>
                                <div className={"mt-[14px]"}>
                                    Bạn có chắc muốn xóa tin nhắn này?
                                </div>
                                <div className={"flex items-center mt-4"}>
                                    <input onChange={event => setIsRevoke(event.target.checked)} type="checkbox" id="revoke" className={"form-check-input mt-0"}/>
                                    <label htmlFor="revoke" className={"text-left ml-5 whitespace-nowrap"}>Xoá tin nhắn đối với tất cả thành viên trong nhóm chat</label>
                                </div>
                                <div className={"flex justify-end mt-[20px]"}>
                                    <button
                                        className={"w-[95px] h-[32px] rounded-md mr-[10px] text-primary font-semibold"}
                                        onClick={() => dispatch(dismissDeleteRevoke({}))}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={() => handleConfirm()}
                                        className={"w-[95px] h-[32px] rounded-md bg-negative text-white font-semibold"}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};