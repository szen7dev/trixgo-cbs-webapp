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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

type Props = {
    listPinnedMessage: ItemMessage[]
}
const HeaderPinedMessages:FC<Props> = ({listPinnedMessage}) => {
    const {currentChat} = useContext(MessageContext)
    const {getListPinMessage} = UseConversation();
    const [indexPinnedMessage, setIndexPinnedMessage] = useState(0);
    useEffect(() => {
        getListPinMessage({conversationID: currentChat})
        setIndexPinnedMessage(0)
    }, [currentChat]);
    const renderPinned = (pinnedMessage: ItemMessage) => {
        if (!pinnedMessage) return null;
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
        } else {
            setIndexPinnedMessage(indexPinnedMessage+1)
            moveDots(indexPinnedMessage)
        }
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
            <button className={"flex items-center justify-center ml-[20px]"}>
                <Close/>
            </button>
            <ListPinnedMessage listPinnedMessage={listPinnedMessage}/>
        </div>
    )
}

export default HeaderPinedMessages;