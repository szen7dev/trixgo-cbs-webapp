import React, {FC, Fragment, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import BulletListIcon from "assets/images/icons8-bulleted-list-90.svg";
import {ItemMessage} from "typings/apis/messages/listMessage";
import MyMessage from "./MyMessage";
import OthersMessage from "./OthersMessage";
import Reminder from "./reminder/Reminder";
import NotificationCenter from "./NotificationCenter";
import {map as _map} from "lodash"
import moment from "moment";
type Props = {
    listPinnedMessage: ItemMessage[]
}

const ListPinnedMessage:FC<Props> = ({listPinnedMessage}) => {
    const [isOpenList, setIsOpenList] = useState(false);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const renderMessage = (message: ItemMessage, previousMessage: ItemMessage|null|undefined, shouldRenderDate = true) => {
        const messageCreatedAt = moment(message.createdAt);
        return (
            <div key={message._id}>
                {
                    shouldRenderDate&&previousMessage&&!messageCreatedAt.isSame(moment(previousMessage.createdAt), 'date')?
                        <NotificationCenter content={messageCreatedAt.format("DD/MM/YYYY")}/>:
                        (
                            !previousMessage?
                                <NotificationCenter content={messageCreatedAt.format("DD/MM/YYYY")}/>:
                                null
                        )
                }
                {renderPrimaryMessage(message)}
            </div>
        )
    }

    const renderPrimaryMessage = (message: ItemMessage) => {
        switch (message.type) {
            case 0:
            case 1:
            case 2:
                if (message.sender._id === profileId) {
                    return <MyMessage message={message}/>
                } else {
                    return <OthersMessage message={message} bgMessage={"bg-gray-100"}/>
                }
            case 4:
                return <div>
                    <Reminder message={message}/>
                </div>;
            case 108:
                return <NotificationCenter content={`${(message.sender.bizfullname||message.sender.fullname)} đã ghim một tin nhắn`}/>
            case 116:
            case 117:
                return <NotificationCenter content={`${(message.sender.bizfullname||message.sender.fullname)} đã ${message.reminder.accepts.includes(message.sender._id)&&!message.reminder.rejects.includes(message.sender._id)?"xác nhận":"từ chối"} tham gia hội thoại: <b class="text-primary">${message.reminder.content}</b>`}/>
        }
    }

    return (
        <>
            <button
                onClick={
                    () => setIsOpenList(true)
                }
                className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center ml-[10px]"}>
                <img  src={BulletListIcon} alt={"ham"}/>
            </button>
            <Transition appear show={isOpenList} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto share-message"
                    onClose={() => setIsOpenList(false)}
                    initialFocus={focusElementRef}
                >
                    <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51 share-message">
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
                            <div className={"max-w-[600px] min-w-[550px] rounded-md shadow-lg bg-white z-51 overflow-hidden"}>
                                <div className={"sticky top-0 w-full bg-white flex items-center p-[10px] text-lg"}>
                                    Tin đã ghim ({listPinnedMessage.length})
                                </div>
                                <div className={"max-h-[500px] no-webkit-scrollbar overflow-auto p-[22px] "}>
                                    {
                                        _map(listPinnedMessage, (message, index) => renderMessage(message, listPinnedMessage[index-1]))
                                    }
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
};

export default ListPinnedMessage;