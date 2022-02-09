import React, {FC, useEffect, useContext, useCallback, useState} from "react";
import {UseConversation} from "services/hooks/messages/useConversation";
import {MessageContext} from "../../home/index_v2";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {map as _map} from "lodash";
import {ItemMessage} from "typings/apis/messages/listMessage";
import TextPinned from "./pinContent/textPinned";
import FilePinned from "./pinContent/filePinned";
import ImagePinned from "./pinContent/imagePinned";
import Close from "assets/icons/Close";
import ListPinnedMessage from "./ListPinnedMessage";

const HeaderPinedMessages:FC = () => {
    const {currentChat} = useContext(MessageContext)
    const {getListPinMessage} = UseConversation();
    useEffect(() => {
        getListPinMessage({conversationID: currentChat})
    }, [currentChat]);
    const listPinnedMessage = useSelector((state: RootState) => state.listMessage.data.listMessagePinned[currentChat]);
    const [indexPinnedMessage, setIndexPinnedMessage] = useState(0);

    const renderDots = useCallback(() => {
        if (!listPinnedMessage) return null;
        return _map(listPinnedMessage, (message, index) => {
            return <div key={message._id} className={"w-[2px] flex-1 mb-[2px] transition " + ((indexPinnedMessage === index)?"bg-primary":"bg-gray-200")}/>
        })
    },[listPinnedMessage, indexPinnedMessage])

    const renderPinned = (pinnedMessage: ItemMessage) => {
        switch (pinnedMessage.type) {
            case 0:
                return <TextPinned message={pinnedMessage}/>;
            case 2:
                return <FilePinned message={pinnedMessage}/>;
            case 1:
                return <ImagePinned message={pinnedMessage}/>;
        }
    }

    const viewPinMessage = () => {
        if (indexPinnedMessage+1 === listPinnedMessage.length) {
            setIndexPinnedMessage(0)
        } else {
            setIndexPinnedMessage(indexPinnedMessage+1)
        }
    }
    if (!listPinnedMessage) return null;
    return (
        <div className={"items-center flex"}>
            <div className={"indicator-pinned flex flex-col-reverse h-full"}>
                {renderDots()}
            </div>
            <div className={"items-center flex-1 flex ml-[5px] cursor-pointer min-w-[220px]"}
                 onClick={() => viewPinMessage()}
            >
                {renderPinned(listPinnedMessage[indexPinnedMessage])}
                <button className={"flex items-center justify-center ml-[20px]"}>
                    <Close/>
                </button>
            </div>
            <ListPinnedMessage listPinnedMessage={listPinnedMessage}/>
        </div>
    )
}

export default HeaderPinedMessages;