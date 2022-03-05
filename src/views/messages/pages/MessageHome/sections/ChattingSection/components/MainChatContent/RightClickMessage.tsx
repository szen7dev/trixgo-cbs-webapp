import React, {FC, useCallback, useContext, useState} from "react";
import ForwardIcon from "assets/images/icons8-reply-arrow-100.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import PinIcon from "assets/images/icons8-pin-96.svg";
import DownloadIcon from "assets/images/icons8-download-thin-96.svg";
import ShareIcon from "assets/images/icons8-share-100.svg";
import IconSelected from "assets/images/icons-web-select.svg";
import GroupIcon from "assets/images/icons8-group-90.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import UnPinnedIcon from "assets/images/icons8-unpin-96.svg";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {useDispatch, useSelector} from "react-redux";
import {setReplyMessage, setSelectedMessages} from "redux/reducer/messages/ListMessage";
import {shareMessageToConversation} from "redux/reducer/messages/ShareMessage";
import {deleteAndRevokeMessageOfConversation} from "redux/reducer/messages/DeleteAndRevokeMessage";

import {UseConversation} from "services/hooks/messages/useConversation";
import {RootState} from "redux/reducer";
import {map as _map} from "lodash";
import {listEmoji} from "./MainChatContent";
import {useRightClickMenu} from "services/hooks/useRightClickMenu";
import {UsersSeenDetail} from "./UsersSeenDetails";
type Props = {
    message: ItemMessage;
    socket: any;
    editor: any;
    isMini?: boolean;
}

export const RightClickMessage:FC<Props> = ({message, socket, editor, isMini}) => {
    const dispatch = useDispatch();
    const {updatePinMessage} = UseConversation();
    const {closeRightClick} = useRightClickMenu()
    const [showDetailSeen, setShowDetailSeen] = useState(false);

    const listPinnedMessage = useSelector((state: RootState) => state.listMessage.data.listMessagePinned[message.conversation]);
    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[message.conversation]);

    const isPin = useCallback(() => {
        if (!listPinnedMessage) return false;
        const pinIds = listPinnedMessage.map(message => message._id);
        return pinIds.includes(message._id)
    }, [message, listPinnedMessage]);

    const usersSeen = useCallback(() => {
        if (!message.usersSeen) return [];
        const users : {_id: string; bizfullname: string; fullname: string; image: string}[] = [];
        message.usersSeen.forEach((user: string|{_id: string; bizfullname: string; fullname: string; image: string}) => {
            if (typeof user === "string") {
                const find = chat.members.find(member => member._id === user);
                users.push(find);
            } else {
                users.push(user)
            }
        })

        return  users;
    }, [message])

    const doUpdatePinMessage = () => {
        updatePinMessage({conversationID: message.conversation, messageID: message._id, isPin: !isPin()}).then((data) => {
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage);
        });
    }

    return (
        <>
            <div
                className={"flex items-center mb-[5px] min-w-max bg-white rounded-full shadow-lg p-2 absolute reaction-right-click"} style={{top: -50}}>
                {
                    _map(listEmoji, emoji => (
                        <button
                            onClick={() => {
                                socket.emit('CHATTING_CSS_REACTION_MESSAGE',{messageID: message._id, typeReaction: emoji.value, select: JSON.stringify({reactions: {userCreate:"bizfullname"}})});
                                setTimeout(() => {
                                    closeRightClick();
                                }, 100)
                            }}
                            key={emoji.id} className={"mr-[5px]"}>
                            <img src={emoji.icon} className={"w-[24px] h-[24px]"} alt={"-----"}/>
                        </button>
                    ))
                }
            </div>
            <div className={"rounded-md shadow-lg bg-white w-[216px] text-gray-500"}>
                <button
                    onClick={() => {
                        dispatch(setReplyMessage({conversationId: message.conversation, messageData: message}));
                        editor.focus();
                        closeRightClick();
                    }}
                    className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full reply-right-click"}>
                    <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={ForwardIcon}/>
                    <div className={"mr-2 ml-4"}>Reply</div>
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(message.content);
                        closeRightClick()
                    }}
                    className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full copy-right-click"}>
                    <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={CopyIcon}/>
                    <div className={"mr-2 ml-4"}>Copy Text</div>
                </button>
                <button
                    onClick={() => {
                        doUpdatePinMessage();
                        closeRightClick()
                    }}
                    className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full pin-right-click"}>
                    <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={isPin()?UnPinnedIcon:PinIcon}/>
                    <div className={"mr-2 ml-4"}>{isPin()?"Unpin":"Pin"}</div>
                </button>
                <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full download-right-click"}>
                    <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={DownloadIcon}/>
                    <div className={"mr-2 ml-4"}>Download</div>
                </button>
                {
                    !isMini&&
                    <button
                        onClick={() => {
                            // setShareMessage(message);
                            dispatch(shareMessageToConversation({messageData: [message]}));
                            setTimeout(() => {
                                closeRightClick()
                            }, 100)
                        }}
                        className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full forward-right-click"}>
                        <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={ShareIcon}/>
                        <div className={"mr-2 ml-4"}>Forward</div>
                    </button>
                }
                {
                    !isMini &&
                    <button
                        onClick={() => {
                            dispatch(setSelectedMessages({
                                selectedMessages: [message],
                                conversationId: message.conversation
                            }));
                            closeRightClick()
                        }}
                        className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full select-right-click"}>
                        <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={IconSelected}/>
                        <div className={"mr-2 ml-4"}>Select</div>
                    </button>
                }
                <button
                    onClick={() => setShowDetailSeen(true)}
                    className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full user-seen-right-click"}>
                    <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={GroupIcon}/>
                    <div className={"mr-4 ml-4"}>{usersSeen().length} đã xem</div>
                    {
                        usersSeen().length > 0&&
                        <div className={"flex -space-x-1"}>
                            {
                                _map(usersSeen().slice(0, 5), (user, index) => (
                                    <img key={index} alt={"------"}
                                         src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`}
                                         className={"w-[16px] h-[16px] rounded-full overflow-hidden border border-white"}/>
                                ))
                            }
                            {
                                usersSeen().length - 5 > 0 &&
                                <div
                                    className={"w-[16px] h-[16px] text-xs rounded-full overflow-hidden bg-gray-300 text-gray-500 border border-white"}>
                                    {usersSeen().length - 5}+
                                </div>
                            }
                        </div>
                    }
                </button>
                <button
                    onClick={() => {
                        dispatch(deleteAndRevokeMessageOfConversation({messageIds: [message], conversationId: message.conversation}))
                        setTimeout(() => {
                            closeRightClick()
                        }, 100)
                    }}
                    className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full delete-right-click"}>
                    <img  className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon} alt={"exit"}/>
                    <div className={"flex-1 text-left ml-4 text-negative"}>Delete</div>
                </button>
                <UsersSeenDetail usersSeen={usersSeen()} isOpen={showDetailSeen} setCloseDetail={() => setShowDetailSeen(false)}/>
            </div>
        </>
    )
}
