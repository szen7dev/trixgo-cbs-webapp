import React, {FC} from "react";
import ForwardIcon from "assets/images/icons8-reply-arrow-100.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import PinIcon from "assets/images/icons8-pin-96.svg";
import DownloadIcon from "assets/images/icons8-download-thin-96.svg";
import ShareIcon from "assets/images/icons8-share-100.svg";
import IconSelected from "assets/images/icons-web-select.svg";
import SampleAvatar from "assets/images/sample_avt.svg";
import GroupIcon from "assets/images/icons8-group-90.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {useDispatch} from "react-redux";
import {setReplyMessage, setSelectedMessages} from "redux/reducer/messages/ListMessage";
import {shareMessageToConversation} from "redux/reducer/messages/ShareMessage";
import {useRightClickMenu} from "services/hooks/useRightClickMenu";
type Props = {
    message: ItemMessage
}

const RightClickMessage:FC<Props> = ({message}) => {
    const dispatch = useDispatch();
    const {closeRightClick} = useRightClickMenu();
    return (
        <div className={"rounded-md shadow-lg bg-white w-[216px] text-gray-500"}>
            <button
                onClick={() => {
                    dispatch(setReplyMessage({conversationId: message.conversation, messageData: message}))
                    closeRightClick();
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={ForwardIcon}/>
                <div className={"mr-2 ml-4"}>Reply</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={CopyIcon}/>
                <div className={"mr-2 ml-4"}>Copy Text</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={PinIcon}/>
                <div className={"mr-2 ml-4"}>Pin</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={DownloadIcon}/>
                <div className={"mr-2 ml-4"}>Download</div>
            </button>
            <button
                onClick={() => {
                    // setShareMessage(message);
                    dispatch(shareMessageToConversation({messageData: [message]}));
                    setTimeout(() => {
                        closeRightClick();
                    }, 100)
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={ShareIcon}/>
                <div className={"mr-2 ml-4"}>Forward</div>
            </button>
            <button
                onClick={() => {
                    dispatch(setSelectedMessages({selectedMessages: [message], conversationId: message.conversation}));
                    closeRightClick();
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={IconSelected}/>
                <div className={"mr-2 ml-4"}>Select</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={GroupIcon}/>
                <div className={"mr-4 ml-4"}>5 Seen</div>
                <div className={"flex"}>
                    <img alt={"------"} src={SampleAvatar} className={"w-[16px] h-[16px] rounded-full overflow-hidden"}/>
                    <img alt={"------"} src={SampleAvatar} className={"w-[16px] h-[16px] rounded-full overflow-hidden"}/>
                    <img alt={"------"} src={SampleAvatar} className={"w-[16px] h-[16px] rounded-full overflow-hidden"}/>
                </div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img  className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon} alt={"exit"}/>
                <div className={"flex-1 text-left ml-4 text-negative"}>Delete</div>
            </button>
        </div>
    )
}

export default RightClickMessage;
