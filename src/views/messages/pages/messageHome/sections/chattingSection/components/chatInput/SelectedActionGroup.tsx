import React, {FC, useContext} from "react"
import Close from "assets/icons/Close";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import ForwardIcon from "assets/images/icons8-reply-arrow-100.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {MessageContext} from "../../../../MessageHome";
import {removeAllSelectedMessage} from "redux/reducer/messages/ListMessage";
import {shareMessageToConversation} from "redux/reducer/messages/ShareMessage";
import {deleteAndRevokeMessageOfConversation} from "redux/reducer/messages/DeleteAndRevokeMessage";

export const SelectedActionGroup:FC = () => {
    const {currentChat} = useContext(MessageContext);
    const listSelectedMessage = useSelector((state: RootState) => state.listMessage.data.listSelectedMessage[currentChat]);
    const dispatch = useDispatch();

    if (!listSelectedMessage||Object.keys(listSelectedMessage).length <= 0) return null;
    return (
        <div className={"absolute w-full h-full flex items-center bg-white z-10 rounded-md py-[16px] px-[26px]"}>
            <button
                onClick={() => dispatch(removeAllSelectedMessage({conversationId: currentChat}))}
            >
                <Close/>
            </button>
            <div className={"flex-1 text-black ml-[16px]"}>
                {Object.keys(listSelectedMessage).length} Tin nhắn được lựa chọn
            </div>
            <div className={"flex items-center justify-between"}>
                {
                    Object.keys(listSelectedMessage).length === 1 &&
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(listSelectedMessage[0].content);
                        }}
                        className={"mx-[5px]"}
                    >
                        <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={CopyIcon}/>
                    </button>
                }
                <button
                    onClick={() => {
                        dispatch(shareMessageToConversation({messageData: Object.values(listSelectedMessage)}));
                    }}
                    className={"mx-[5px]"}
                >
                    <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={ForwardIcon}/>
                </button>
                <button
                    onClick={() => {
                        dispatch(deleteAndRevokeMessageOfConversation({messageIds: Object.values(listSelectedMessage), conversationId: currentChat}))
                    }}
                    className={"mx-[5px]"}
                >
                    <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon}/>
                </button>
            </div>
        </div>
    )
}