import React, {FC} from "react"
import {ItemListConversation} from "typings/apis/messages/listConversation";
import iconChevronDown from "assets/images/icon-chevron-down.png";
import {dismissChatBox} from "redux/reducer/messages/MiniChat";
import iconClose from "assets/images/icons8-close-30.png";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {useDispatch} from "react-redux";
import MiniChatBoxDetail from "./MiniChatBoxDetail";
import {MiniChatContext} from "../../ChatsOnRightSideBar";
import ChattingInput from "views/messages/chattingSection/components/chatInput/ChattingInput";
import AvatarGroupChat from "views/messages/list/components/AvatarGroupChat";

type Props = {
    chat: ItemListConversation
}
const MiniChatSection:FC<Props> = ({chat}) => {
    const dispatch = useDispatch();
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const imageClassMap = {
        "group_1": {
            imgWidth: "w-full h-full",
            groupPosition: [""]
        },
        "group_2": {
            imgWidth: "w-6 h-6 min-w-6 min-h-6 absolute",
            groupPosition: [
                "bottom-0 left-0 z-2",
                "top-0 right-0 z-1",
            ]
        },
        "group_3": {
            imgWidth: "w-5 h-5 min-w-5 min-h-5 absolute",
            groupPosition: [
                "bottom-0 left-12px z-3",
                "top-0 left-0 z-2",
                "top-0 right-0 z-1",
            ]
        },
        "group_4": {
            imgWidth: "w-4 h-4 min-w-4 min-h-4 absolute",
            groupPosition: [
                "bottom-0 left-0 z-4",
                "top-0 left-0 z-3",
                "top-0 right-0 z-2",
                "bottom-0 right-0 z-1"
            ]
        }
    };

    const {getNameConversation, getAvatarMembers} = UseMessageHelper()

    return (
        <div className="t-mini-chat bg-primary-light border border-primary-border">
            <div className="t-mini-chat-header p-2 flex items-center bg-primary text-primary-light">
                {
                    chat.avatar?
                        <img  className={"w-8 h-8 min-w-8 min-h-8 rounded-full overflow-hidden"} src={`${process.env.REACT_APP_URL_S3}/${chat?.avatar?.path}`} alt={chat._id}/>:
                        <AvatarGroupChat
                            avatars={getAvatarMembers(chat, profileId)}
                            imageClass={"w-8 h-8 min-w-8 min-h-8"}
                            classesMap={imageClassMap}
                        />
                }
                <button className="text-[14px] flex items-center ml-2">
                    <span className="truncate">{getNameConversation(chat, profileId)}</span>
                    <img src={iconChevronDown} alt="Dropdown" className="w-4 h-4 object-contain ml-2 filter-white" />
                </button>
                <button
                    className="ml-auto" onClick={() => dispatch(dismissChatBox())}>
                    <img src={iconClose} alt="Close" className="w-4 h-4 object-contain filter-white" />
                </button>
            </div>
            <MiniChatBoxDetail chat={chat}/>
            <ChattingInput chat={chat} context={MiniChatContext}/>
        </div>
    )
}
export default MiniChatSection