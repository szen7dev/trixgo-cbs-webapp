import React, {FC, useEffect} from "react";
import NotificationCenter from "./NotificationCenter";
import OthersMessage from "./OthersMessage";
import MyMessage from "./MyMessage";
import SampleAvatar from "assets/images/sample_avt.svg";
import {map as _map} from "lodash";
import SampleImage from 'assets/images/photo1640398643.png';
import {UseConversation} from "services/hooks/messages/useConversation";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducer";

type Props = {
    chat: ItemListConversation
}

const MainChatContent:FC<Props> = ({chat}) => {
    const {getListMessage} = UseConversation();
    const currentUser = localStorage.getItem("currentUser")??"";
    const profileId = JSON.parse(currentUser)?._id;

    useEffect(() => {
        getListMessage({conversationID: chat._id})
    },[])
    const messagesData = useSelector((state: RootState) => state.listMessage.data.listMessage[chat._id]);

    const renderMessage = (message: any) => {
        if (message.sender._id === profileId) {
            return <MyMessage key={message._id} message={message}/>
        } else {
            return <OthersMessage key={message._id} message={message}/>
        }
        // switch (type) {
            // case "noti":
            //     return <NotificationCenter key={message._id} content={message.content.content}/>
            // case "other":
            //     return <OthersMessage key={message._id} message={message.content}/>
            // case "my":
            //     return <MyMessage key={message._id} message={message}/>
        // }
    }
    return (
        <div className={"flex-1 h-full items-center flex flex-col relative overflow-auto transition duration-150"}>
            <div className={"w-full max-w-[645px] pt-[20px] px-[20px]"}>
                {
                    messagesData?
                    _map(Object.values(messagesData), message => renderMessage(message)):
                    null
                }
            </div>
        </div>
    )
}

export default MainChatContent;
