import React, {FC, useContext} from "react";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {MessageContext} from "../../../home/index_v2";
import TextReply from "../chatContent/replyContent/textReply";
import FileReply from "../chatContent/replyContent/fileReply";
import ImageReply from "../chatContent/replyContent/imageReply";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {removeReplyMessage} from "redux/reducer/messages/ListMessage";

type Props = {
    replyData: ItemMessage;
}
const ReplyChat:FC<Props> = ({replyData}) => {
    const {currentChat} = useContext(MessageContext);
    const dispatch = useDispatch();

    const renderReply = () => {
        switch (replyData.type) {
            case 0:
                return <TextReply message={replyData} className={"text-xs"}/>;
            case 2:
                return <FileReply message={replyData} className={"text-xs"}/>;
            case 1:
                return <ImageReply message={replyData} className={"text-xs"}/>;
        }
    }

    if (!replyData) return null;

    return (
        <div className={"flex w-full pt-[10px]"}>
            <button
                onClick={() => {
                    dispatch(removeReplyMessage({conversationId: currentChat}))
                }}
                className={"w-[46px] items-center justify-center flex"}>
                <Close/>
            </button>
            <div className={"flex-1 px-[10px]"}>
                {renderReply()}
            </div>
        </div>
    )
}

export default ReplyChat;