import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {ListChatItem} from "views/messages/pages/MessageHome/sections/MessageList";
import {map as _map} from "lodash";
import {Link} from "react-router-dom";
import {openChatBox} from "redux/reducer/messages/MiniChat";

export const MiniListConversation:FC = () => {
    const {isListConversationVisible} = useSelector((state: RootState) => state.miniChat.data);
    const mapData = useSelector((state: RootState) => state.listConversation);
    const {listConversation, totalRecord} = mapData.data;
    const dispatch = useDispatch();

    if (!isListConversationVisible) return null;

    return (
        <div className="t-mini-list-conversation text-[15px] ml-3 bg-primary-light border border-primary-border w-[402px]">
            <div className={"min-h-[370px] max-h-[370px] overflow-auto "}>
                {
                    _map(Object.values(listConversation)
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
                        .slice(0, 5), conversation => (
                        <ListChatItem
                            customOnClick={chat => dispatch(openChatBox({conversation: chat}))}
                            customLink={""}
                            key={conversation._id} chat={conversation}/>
                    ))
                }
            </div>
            {
                totalRecord>5&&
                <div className={"flex items-center justify-center py-2"}>
                    <Link
                        to={"/messages"}
                        className={"text-white text-center bg-primary w-full rounded-md h-[38px] w-[243px] flex items-center justify-center"}
                    >
                        <span>Xem tất cả tin nhắn</span>
                    </Link>
                </div>
            }
        </div>
    )
}