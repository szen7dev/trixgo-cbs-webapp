import React, {FC, useCallback, useEffect} from "react";
import chatIcon from "assets/images/icons8-create-48.png";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
import {openChatBox, openCreateNewChatMini, openListConversation} from "redux/reducer/messages/MiniChat";
import {AvatarGroupChat} from "views/messages/pages/MessageHome/sections/MessageList/components/ListCoversation";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

export const MiniChatGroup:FC = () => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();

    const {getListConversation} = UseListConversation();
    const {getNameConversation,getAvatarMembers} = UseMessageHelper()

    const mapData = useSelector((state: RootState) => state.listConversation);
    const {listConversation, amountMissMessage} = mapData.data;

    const imageClassMap = {
        "group_1": {
            imgWidth: "w-full h-full",
            groupPosition: [""]
        },
        "group_2": {
            imgWidth: "w-8 h-8 min-w-8 min-h-8 absolute",
            groupPosition: [
                "bottom-0 left-0 z-2",
                "top-0 right-0 z-1",
            ]
        },
        "group_3": {
            imgWidth: "w-6 h-6 min-w-6 min-h-6 absolute",
            groupPosition: [
                "bottom-0 left-12px z-3",
                "top-0 left-0 z-2",
                "top-0 right-0 z-1",
            ]
        },
        "group_4": {
            imgWidth: "w-5 h-5 min-w-5 min-h-5 absolute",
            groupPosition: [
                "bottom-0 left-0 z-4",
                "top-0 left-0 z-3",
                "top-0 right-0 z-2",
                "bottom-0 right-0 z-1"
            ]
        }
    };

    useEffect(() => {
        listConversation&&getListConversation({});
    },[]);

    const userUnreadMessage = useCallback((chat: ItemListConversation) => {
        const userUnread = chat?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [listConversation])

    const renderListConversation = useCallback(() => {
        return _map(Object.values(listConversation)
                // .sort((a,b) => b.isSaved ? 1 : -1)
                .filter(item => !item.isSaved)
                .sort((a,b) => {
                    if (b.position > a.position) {
                        return 1
                    } else {
                        if (b.isPin&&!a.isPin) {
                            return 1
                        } else if (b.isPin&&a.isPin) {
                            if (b.position > a.position) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                    }
                    return -1
                })
                .slice(0,4)
            ,(chat) => (
                <button
                    title={getNameConversation(chat, profileId)}
                    onClick={() => dispatch(openChatBox({conversation: chat}))}
                    key={chat._id} className="block ml-auto mr-auto relative mb-4 relative">
                    {
                        chat.avatar?
                            <img  className={"w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden"} src={`${process.env.REACT_APP_URL_S3}/${chat?.avatar?.path}`} alt={chat._id}/>:
                            <AvatarGroupChat
                                avatars={getAvatarMembers(chat, profileId)}
                                imageClass={"w-10 h-10 min-w-10 min-h-10"}
                                classesMap={imageClassMap}
                            />
                    }
                    {
                        userUnreadMessage(chat) > 0 &&
                        <div
                            className={"absolute bg-negative flex items-center justify-center text-white text-xxs w-4 h-4 rounded-full text-center z-51 border border-white"}
                            style={{right: -5, top: -5}}>
                            <span>{userUnreadMessage(chat)}</span>
                        </div>
                    }
                </button>
            )
        )
    },[listConversation]);

    return (
        <div className="absolute left-0 bottom-16 w-full">
            <div className="text-center">
                {
                    amountMissMessage > 0 &&
                    <button
                    onClick={() => dispatch(openListConversation())}
                    className="block ml-auto mr-auto relative mb-4 relative bg-gray-100 w-10 h-10 min-w-10 min-h-10 rounded-full">
                        <span
                            className={"bg-negative rounded-full px-2 py-1 text-white text-xxs"}>{amountMissMessage}</span>
                    </button>
                }
                {renderListConversation()}
            </div>
            <button
                onClick={() => dispatch(openCreateNewChatMini())}
                className="block ml-auto mr-auto tm-right-sidebar-chat-btn w-10 h-10 rounded-full"
            >
                <img
                    className="w-6 block ml-auto mr-auto"
                    src={chatIcon}
                    alt="Chat"
                />
            </button>
        </div>
    )
}