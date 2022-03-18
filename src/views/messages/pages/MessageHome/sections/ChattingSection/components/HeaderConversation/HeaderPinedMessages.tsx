import React, {FC, useEffect, useContext, useCallback, useState} from "react";
import {UseConversation} from "services/hooks/messages/useConversation";
import {MessageContext} from "../../../../index";
import {map as _map} from "lodash";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {TextPinned, FilePinned, ImagePinned, DeletedPinned} from "../PinContent";
import Close from "assets/icons/Close";
import {ListPinnedMessage} from "./ListPinnedMessage";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
    clearListMessage,
    setShouldStartListenEvent
} from "redux/reducer/messages/SearchMessage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

type Props = {
    listPinnedMessage: ItemMessage[]
}
export const HeaderPinedMessages:FC<Props> = ({listPinnedMessage}) => {
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    const {currentChat, socketRef} = useContext(MessageContext);
    const socket = socketRef.current;
    const {getListPinMessage, updatePinMessage} = UseConversation();
    const [indexPinnedMessage, setIndexPinnedMessage] = useState(0);
    const dispatch = useDispatch();
    const {goToMessagePosition} = UseConversation();
    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);
    const {hasPermission} = UseMessageHelper();

    useEffect(() => {
        getListPinMessage({conversationID: currentChat})
        setIndexPinnedMessage(0)
    }, [currentChat]);

    useEffect(() => {
        setIndexPinnedMessage(0)
    }, [listPinnedMessage])

    const isDeleted = useCallback((pinnedMessage: ItemMessage) => {
        if (!pinnedMessage) return false;
        if (pinnedMessage.usersDelete&&pinnedMessage.usersDelete.includes(profileId)) {
            return true
        }
        return (pinnedMessage.files??[]).some(file => file.usersDelete && file.usersDelete.includes(profileId));
    }, [indexPinnedMessage])

    const renderPinned = (pinnedMessage: ItemMessage) => {
        if (!pinnedMessage) return null;
        if (isDeleted(pinnedMessage)) {
            return <DeletedPinned message={pinnedMessage}/>;
        }
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
            moveDots(0)
            handleGoToMessage(listPinnedMessage[0]["_id"])
        } else {
            setIndexPinnedMessage(indexPinnedMessage+1)
            moveDots(indexPinnedMessage)
            handleGoToMessage(listPinnedMessage[indexPinnedMessage+1]["_id"])
        }
    }

    const handleGoToMessage = (_id: string) => {
        dispatch(clearListMessage({conversationId: currentChat}));
        goToMessagePosition({conversationID: currentChat, messageID: _id}).then(data => {
            setTimeout(() => {
                document.getElementById(`message-${_id}`)?.scrollIntoView({block: "center", behavior: "smooth"});
                document.getElementById(`message-${_id}`)?.classList.add("found-message");
                dispatch(setShouldStartListenEvent({data: true, conversationId: currentChat}));
                setTimeout(() => {
                    document.getElementById(`message-${_id}`)?.classList.remove("found-message");
                }, 2000)
            }, 500)
        })
    }

    const doUpdatePinMessage = (_id: string) => {
        updatePinMessage({conversationID: currentChat, messageID: _id, isPin: false}).then((data) => {
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage);
        });
    }

    const moveDots = (index: number) => {
        const dotHeight = document.getElementsByClassName('dot-pin')[0].clientHeight;
        const dots = document.querySelectorAll<HTMLElement>('.dot-pin');
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.transform = `translateY(${dotHeight*index}px)`
        }
    }
    if (!listPinnedMessage||listPinnedMessage.length<=0) return null;

    return (
        <div className={"items-center flex pinned-list-header"}>
            <Carousel
                showArrows={false}
                showStatus={false}
                className={"h-[55px]"}
                axis={'vertical'}
                autoPlay={false}
                renderIndicator={(clickHandler, isSelected,index, label) => (
                    <div
                        onClick={() => setIndexPinnedMessage(index)}
                        className={"w-[2px] dot-pin flex-1 mb-[2px] transition cursor-pointer " + (isSelected?"bg-primary":"bg-gray-200")}/>
                )}
                width={200}
                onChange={setIndexPinnedMessage}
                selectedItem={indexPinnedMessage}
            >
                {
                    _map([...listPinnedMessage], message => (
                        <div
                            onClick={() => viewPinMessage()}
                            key={message._id} style={{ height: 55 }} className={"items-center flex-1 flex ml-[5px] cursor-pointer min-w-[220px]"}>
                            {renderPinned(message)}
                        </div>
                    ))
                }
            </Carousel>
            {
                hasPermission(chat, profileId, "configPinMessage")&&
                <button
                    onClick={() => doUpdatePinMessage(listPinnedMessage[indexPinnedMessage]["_id"])}
                    className={"flex items-center justify-center ml-[20px]"}>
                    <Close/>
                </button>
            }
            <ListPinnedMessage listPinnedMessage={listPinnedMessage}/>
        </div>
    )
}