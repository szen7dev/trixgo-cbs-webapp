import React, {FC, useCallback, useContext} from "react";
import MainChatOptions from "./MainChatOptions";
import SearchIcon from "assets/images/icons8-search-120.png";
import AvatarGroupChat from "../../list/components/AvatarGroupChat";
import {MessageContext} from "../../home";
import HeaderPinedMessages from "./HeaderPinedMessages";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

type Props = {
    chat: ItemListConversation
}

const MainChatHeading:FC<Props> = ({chat}) => {
    const {setShowMenu, showMenu, showSearch, setShowSearch, currentChat} = useContext(MessageContext)
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const listPinnedMessage = useSelector((state: RootState) => state.listMessage.data.listMessagePinned[currentChat]);

    const {getNameConversation, getAvatarMembers} = UseMessageHelper();

    const getPresentGroupName = (name: string) => {
        return name.split('').slice(0, 1).map((text: string) => {
            return text.charAt(0)
        });
    }

    return (
        <div className={"sticky top-0 bg-white h-[56px] flex px-4 py-1 z-50"}>
            <div
                onClick={() => setShowMenu(!showMenu)}
                className={"avatar-chat flex items-center justify-center cursor-pointer"}>
                {
                    chat.avatar?
                        <img  className={"w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full overflow-hidden"} src={`${process.env.REACT_APP_URL_S3}/${chat?.avatar?.path}`} alt={getNameConversation(chat, profileId)}/>:
                        (
                            getAvatarMembers(chat, profileId).length === 0 ?
                                <div className={"w-[40px] h-[40px] rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px] min-h-[56px]"} style={{background: "#8DD4D6"}}>
                                    {getPresentGroupName(getNameConversation(chat, profileId))}
                                </div> :
                                <AvatarGroupChat
                                    avatars={getAvatarMembers(chat, profileId)}
                                    imageClass={"w-[40px] h-[40px]"}
                                    classesMap={{
                                        "group_1": {
                                            imgWidth: "w-full h-full",
                                            groupPosition: [""]
                                        },
                                        "group_2": {
                                            imgWidth: "w-[26px] h-[26px] absolute",
                                            groupPosition: [
                                                "bottom-0 left-0 z-2",
                                                "top-0 right-0 z-1",
                                            ]
                                        },
                                        "group_3": {
                                            imgWidth: "w-[22px] h-[22px] absolute",
                                            groupPosition: [
                                                "bottom-0 left-9px z-3",
                                                "top-0 left-0 z-2",
                                                "top-0 right-0 z-1",
                                            ]
                                        },
                                        "group_4": {
                                            imgWidth: "w-[20px] h-[20px] absolute",
                                            groupPosition: [
                                                "bottom-0 left-0 z-4",
                                                "top-0 left-0 z-3",
                                                "top-0 right-0 z-2",
                                                "bottom-0 right-0 z-1"
                                            ]
                                        }
                                    }}
                                />
                        )
                }
            </div>
            <div className={"flex flex-col justify-center mx-[10px] " + ((showMenu&&listPinnedMessage&&listPinnedMessage.length>0)?"chat-basic-infor":"")}>
                <div onClick={() => {
                    setShowMenu(!showMenu)
                    if (showMenu) setShowSearch(false)
                }} className={"cursor-pointer truncate"}>{getNameConversation(chat, profileId)}</div>
                <div className={"text-xs text-gray-300"}>{chat.members.length} thành viên</div>
            </div>
            <div className={"flex items-center flex-1 justify-end"}>
                <HeaderPinedMessages listPinnedMessage={listPinnedMessage}/>
                <div className={"action-section flex items-center justify-end ml-[10px]"}>
                    <button
                        onClick={() => {
                            setShowSearch(!showSearch)
                            if (!showMenu) setShowMenu(true)
                        }}
                        className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                        <img  src={SearchIcon} alt={"search icon"}/>
                    </button>
                    <MainChatOptions/>
                </div>
            </div>
        </div>
    )
}

export default MainChatHeading;
